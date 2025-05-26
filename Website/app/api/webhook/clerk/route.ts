// app/api/webhook/clerk/route.ts
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid"; 
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is missing");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Extract Svix headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers", { svix_id, svix_timestamp, svix_signature });
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  // Read and verify webhook payload
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Bypass verification in development
  if (process.env.NODE_ENV === "development") {
    console.warn("Bypassing webhook verification in development");
    evt = payload as WebhookEvent;
  } else {
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
    }
  }

  const eventType = evt.type;
  console.log("Received webhook event:", eventType, "Payload:", payload);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      console.error("No email found in user.created event", evt.data);
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    const name = [first_name, last_name].filter(Boolean).join(" ") || "Anonymous User";

    try {
      // Ensure idempotency
      const existingUser = await prisma.user.findUnique({ where: { clerkId: id } });
      if (existingUser) {
        console.log(`User with clerkId ${id} already exists`);
        return NextResponse.json({ message: "User already exists" }, { status: 200 });
      }

      const user = await prisma.user.create({
        data: {
          id: uuidv4(), // Generate unique ID
          clerkId: id,
          email,
          name,
          role: "BUSINESS_OWNER",
          websiteURLs: [], // Required field
          updatedAt: new Date(), // Required field
          Business: {
            create: {
              id: uuidv4(), // Generate Business ID
              name: `${name}'s Business`,
              category: "BOUTIQUE",
              updatedAt: new Date(), // Required for Business
            },
          },
        },
      });

      // Log to AuditLog
      await prisma.auditLog.create({
        data: {
          id: uuidv4(), // Generate AuditLog ID
          action: "USER_CREATED",
          userId: id,
          businessId: user.businessId || "N/A",
          timestamp: new Date(),
        },
      });

      console.log(`User created: ${id}, ${email}`);
      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      console.error("No email found in user.updated event", evt.data);
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    const name = [first_name, last_name].filter(Boolean).join(" ") || "Anonymous User";

    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email,
          name,
          updatedAt: new Date(), // Required for updates
        },
      });
      console.log(`User updated: ${id}, ${email}`);
      return NextResponse.json({ message: "User updated" }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await prisma.user.delete({
        where: { clerkId: id },
      });
      console.log(`User deleted: ${id}`);
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
  }

  console.log(`Unhandled event type: ${eventType}`);
  return NextResponse.json({ message: "Webhook received but not processed" }, { status: 200 });
}

// Cleanup Prisma on server shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
});
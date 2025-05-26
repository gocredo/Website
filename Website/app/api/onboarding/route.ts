// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient, BusinessCategory } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../lib/prisma";


// Input validation schema
const onboardingSchema = z.object({
  businessName: z.string().min(1, "Business name is required").max(100, "Business name too long"),
  category: z.enum([
    "RESTAURANT",
    "SALON",
    "BOUTIQUE",
    "TIFFIN",
    "GYM",
    "EVENT_PLANNER",
    "COACHING",
    "INTERIOR",
    "PHOTOGRAPHER",
    "REPAIR_SERVICE",
    "REAL_ESTATE",
    "PET_SERVICE",
    "HANDICRAFT",
    "FLORIST",
    "CLINIC",
    "TRAVEL",
    "FREELANCER",
    "BAKER",
    "NGO",
    "JEWELLERY",
  ], { message: "Invalid business category" }),
  description: z.string().max(1000, "Description too long").optional(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate input
    const body = await req.json();
    const parsed = onboardingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { businessName, category, description } = parsed.data;

    // Check user exists and has correct role
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }

    if (user.role !== "BUSINESS_OWNER") {
      return NextResponse.json({ error: "Only business owners can create businesses" }, { status: 403 });
    }

    // Check if user already has a business
    if (user.businessId) {
      return NextResponse.json({ error: "User already associated with a business" }, { status: 400 });
    }

    // Create business and update user in a transaction
    const business = await prisma.$transaction(async (tx) => {
      const newBusiness = await tx.business.create({
        data: {
          id: crypto.randomUUID(), // Manual UUID
          name: businessName,
          category: category as BusinessCategory,
          description: description || null,
          updatedAt: new Date(),
          BusinessSettings: {
            create: {
              id: crypto.randomUUID(),
              currency: "USD",
            },
          },
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          businessId: newBusiness.id,
          updatedAt: new Date(),
        },
      });

      return newBusiness;
    });

    console.log(`Business created: ${business.id} for user: ${userId}`);
    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
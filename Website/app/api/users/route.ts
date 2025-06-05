import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList();
    const users = response.data.map((user) => ({
      id: user.id,
      emailAddresses: user.emailAddresses,
      firstName: user.firstName,
      lastName: user.lastName,
      publicMetadata: user.publicMetadata || { role: "user" },
    }));
    return NextResponse.json(users);
  } catch (error) {
    console.error("[API/Users] Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
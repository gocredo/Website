import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, role } = await request.json();
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API/Users/Update] Error:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
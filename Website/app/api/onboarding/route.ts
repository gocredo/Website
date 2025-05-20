import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { businessName, category, description } = await req.json();
    if (!businessName || !category) {
      return NextResponse.json(
        { error: "Business name and category are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }
    const business = await prisma.business.create({
      data: {
        name: businessName,
        category: category as any, // Cast to the enum type
        description: description || null,
        users: {
          connect: {
            id: user.id,
          },
        },
        businessSetting: {
          create: {
            currency: "USD",
          },
        },
      },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        businessId: business.id,
      },
    });
    
    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

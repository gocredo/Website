import { NextRequest, NextResponse } from "next/server";
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }
    const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
  const eventType = evt.type;
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const emailObject = email_addresses?.[0];
    const email = emailObject?.email_address;
    if (!email) {
      return new Response('No email found', { status: 400 });
    }
    const name = [first_name, last_name].filter(Boolean).join(' ');
    
    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email,
          name: name || 'Anonymous User',
          role: 'BUSINESS_OWNER', // Default role
        },
      });
      
      return new Response('User created', { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }
  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const emailObject = email_addresses?.[0];
    const email = emailObject?.email_address;

    if (!email) {
      return new Response('No email found', { status: 400 });
    }

    const name = [first_name, last_name].filter(Boolean).join(' ');
    
    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email,
          name: name || 'Anonymous User',
        },
      });

      return new Response('User updated', { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }
  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    
    try {
      await prisma.user.delete({
        where: { clerkId: id },
      });
      
      return new Response('User deleted', { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }
  return new Response('Webhook received', { status: 200 });
}

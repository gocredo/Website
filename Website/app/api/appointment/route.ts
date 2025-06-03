import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/mailer/bravomail";

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  dateTime: string;
  reason: string;
}

export async function POST(request: Request) {
  try {
    const body: AppointmentFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.dateTime || !body.reason) {
      return NextResponse.json(
        { error: "Name, email, phone, dateTime, and reason are required" },
        { status: 400 }
      );
    }

    // Prepare data for sendContactEmail (reusing ContactFormData interface)
    const formData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.reason, // Map reason to service
      message: `Appointment booked for ${body.dateTime}`,
    };

    // Send email
    await sendContactEmail(formData);

    return NextResponse.json({ message: "Appointment booked successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
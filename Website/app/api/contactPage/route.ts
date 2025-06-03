import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/mailer/bravomail";
import { ContactFormData } from "../../../components/home/contact-form";

// Define the expected shape of the form data
interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Prepare form data for the email function
    const formData: ContactFormData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
    };

    // Send email using BravoMail
    await sendContactEmail(formData);

    // Return success response
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
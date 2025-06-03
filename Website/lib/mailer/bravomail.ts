// lib/mailer/bravomail.ts
import { ContactFormData } from "../../components/home/contact-form";

export async function sendContactEmail(data: ContactFormData) {
  const BRAVO_MAIL_API_URL = process.env.BRAVO_MAIL_API_URL!;
  const BRAVO_MAIL_API_KEY = process.env.BRAVO_MAIL_API_KEY!;

  const response = await fetch(BRAVO_MAIL_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${BRAVO_MAIL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      subject: `New Contact Submission - ${data.service || "General"}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone || "N/A"}
        Service: ${data.service || "Not specified"}
        Message:
        ${data.message}
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${await response.text()}`);
  }

  return true;
}
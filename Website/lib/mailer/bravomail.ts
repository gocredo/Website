import { ContactFormData } from "../../components/home/contact-form";

export async function sendContactEmail(data: ContactFormData) {
  const BRAVO_MAIL_API_URL = process.env.BRAVO_MAIL_API_URL!;
  const BRAVO_MAIL_API_KEY = process.env.BRAVO_MAIL_API_KEY!;
  const MAIL_FROM = process.env.MAIL_FROM!;
  const MAIL_TO = process.env.MAIL_TO!;

  // Log environment variables for debugging
  console.log("API URL:", BRAVO_MAIL_API_URL);
  console.log("API Key:", BRAVO_MAIL_API_KEY);
  console.log("From Email:", MAIL_FROM);
  console.log("To Email:", MAIL_TO);



  const payload = {
    sender: {
      name: "GoCredo",
      email: MAIL_FROM,
    },
    to: [
      {
        email: MAIL_TO,
      },
    ],
    subject: `New Contact Submission - ${data.service || "General"}`,
    htmlContent: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  };

  // Log payload for debugging
  console.log("Request Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(BRAVO_MAIL_API_URL, {
      method: "POST",
      headers: {
        "api-key": BRAVO_MAIL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API Error:", errorText, "Status:", response.status);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("sendContactEmail Error:", error);
    throw error;
  }
}
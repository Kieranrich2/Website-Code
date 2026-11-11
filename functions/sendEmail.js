import { sendEnquiryEmail } from "../server/emailService.js";

export async function onRequestPost({ request, env }) {
    const { email, service, subService, message } = await request.json();

    if (!email || !service || !message) {
        return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    try {
        await sendEnquiryEmail({
            apiKey: env.RESEND_API_KEY,
            to: env.EMAIL_TO,
            email,
            service,
            subService,
            message,
        });
        return Response.json({ message: "Enquiry sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ error: "Failed to send enquiry. Please try again later." }, { status: 500 });
    }
}

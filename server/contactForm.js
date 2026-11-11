import { sendEnquiryEmail } from "./emailService.js";

export const sendContactFormEmail = async (req, res) => {
    const { email, service, message, subService } = req.body;
    // Check all fields are provided
    if (!email || !service || !message ) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Send the email
    try {
        await sendEnquiryEmail({
            apiKey: process.env.RESEND_API_KEY,
            to: process.env.EMAIL_TO,
            email,
            service,
            subService,
            message,
        });
        res.status(200).json({ message: "Enquiry sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send enquiry. Please try again later." });
    }
};

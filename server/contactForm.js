import nodemailer from "nodemailer";

export const sendContactFormEmail = async (req, res) => {
    const { email, service, message, subService } = req.body;
    // Check all fields are provided
    if (!email || !service || !message ) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Connection to the email provider
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // Retrive from .env file
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            ciphers: "SSLv3",     // Secure connection
        }
    });

    // Email layout and details
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New service enquiry: ${service} - ${subService}`,
        text: `Email: ${email}\nService: ${service} - ${subService}\nMessage: ${message}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Enquiry sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send enquiry. Please try again later." });
    }
};
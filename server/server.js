import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

const app = express();
const PORT = 5000; 

// Setup for ES Modules to find the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables 
dotenv.config({ path: path.join(__dirname, "../.env") });

// This tells Express how to find the public folder
app.use(express.static(path.join(__dirname, "../public"), { extensions: ["html"] }));
app.use(express.json());

// Email Contact Form 
// User can send 5 emails every 15 minutes to prevent spam
const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // User Email limit
    message:{ error: "You have sent too many enquiries, please try again in 15 minutes to prevent spam." }
});

// Send the email 
app.post("/sendEmail", contactFormLimiter, async (req, res) => {
    const { sendContactFormEmail } = await import("./contactForm.js");
    return sendContactFormEmail(req, res);
});

// End of Email Contact Form

app.get("/", (req, res) => {
    res.redirect("/homepage.html");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

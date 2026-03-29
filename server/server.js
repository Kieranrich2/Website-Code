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

// Fetch Google Reviews 

app.get("/api/reviews", async (req, res) => {
    const placeId = "ChIJYZ587-At30cRDmFp82xBGlM";
    const apiKey = process.env.GOOGLE_API_KEY; // Fetch the API key
    // Fetch reviews from Google Places API
    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}`,
            {
                headers: {
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': 'reviews'
                }
            }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Reviews fetch error:", error);
        res.status(500).json({ error: "Failed to load reviews" });
    }
});
// End of Fetch Google Reviews

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

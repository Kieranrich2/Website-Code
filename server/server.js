import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

// Setup for ES Modules to find the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables 
dotenv.config({ path: path.join(__dirname, "../.env") });

// This tells Express how to find the public folder
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.json());

// Must be before express.static to prevent /services directory redirect
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/services.html"));
});

app.use(express.static(path.join(__dirname, "../public"), { extensions: ["html"] }));

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
                    'X-Goog-Api-Key': apiKey, // google identifies the key and allows access to the API
                    'X-Goog-FieldMask': 'reviews' // google will only return the reviews
                }
            }
        );
        const data = await response.json();
        res.json(data); // Sends the reviews back to the frontend
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
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;  // For testing 
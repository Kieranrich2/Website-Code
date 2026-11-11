import { expect, test, vi } from "vitest";
import request from "supertest";

// Fake email service for testing
vi.mock("../server/emailService.js", () => ({
    sendEnquiryEmail: vi.fn().mockResolvedValue(undefined)
}));

import app from "../server/server.js";

// Contact Form Tests

// Test if email is missing the email fails to send 
test("Test if email is missing the email fails to send", async () => {
    const response = await request(app)
        .post("/sendEmail")
        .send({ service: "Hay Making", subService: "Hay Making", message: "Test message" });
    expect(response.status).toBe(400);
});

// Test if Service is missing
test("Test if service is missing, email fails to send", async () => {
    const response = await request(app)
        .post("/sendEmail")
        .send({ email: "test@test.com", service: "", subService: "Hay Making", message: "Test message" });
    expect(response.status).toBe(400);
});

// Test if message is missing
test("Test if message is missing, email fails to send ", async () => {
    const response = await request(app)
        .post("/sendEmail")
        .send({ email: "test@test.com", service: "Hay Making", subService: "Hay Making", message: "" });
    expect(response.status).toBe(400);
});

// Email sends when all fields are valid
test("Test email sends when all fields are valid", async () => {
    const response = await request(app)
        .post("/sendEmail")
        .send({ email: "test@test.com", service: "Hay Making", subService: "Hay Making", message: "Test message" });
    expect(response.status).toBe(200);
});

// Test email sends when "Other" is selected with no sub service
test("Test email sends when Other is selected with no sub service", async () => {
    const response = await request(app)
        .post("/sendEmail")
        .send({ email: "test@test.com", service: "Other", subService: "", message: "Test message" });
    expect(response.status).toBe(200);
});

// Test rate limiter blocks after 5 emails
test("Test rate limiter blocks after 5 emails", async () => {
    for (let i = 0; i < 5; i++) {
        await request(app)
            .post("/sendEmail")
            .send({ email: "test@test.com", service: "Hay Making", subService: "Hay Making", message: "Test message" });
    }
    const response = await request(app)
        .post("/sendEmail")
        .set("X-Forwarded-For", "1.2.3.4") // Fake IP so other tests don't affect this one
        .send({ email: "test@test.com", service: "Hay Making", subService: "Hay Making", message: "Test message" });
    expect(response.status).toBe(429);
});

// End of Contact Form Tests

// User is directed to homeoage when clicking the URL
test("Test user is directed to homepage when clicking the URL", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/homepage.html");
});

// Google Reviews API Tests

// Fake Google Revoews API 
global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({
        reviews: [
            { author_name: "Paolo Di Canio", rating: 5, text: "Lovely Hay" },
            { author_name: "Mark Nobel", rating: 4, text: "Great Service" },
            { author_name: "Jared Bowen", rating: 5, text: "Excellent Quality" },
            { author_name: "Thomas Soucek", rating: 4, text: "Very Satisfied" },
            { author_name: "Michail Antonio", rating: 5, text: "Highly Recommend" }

        ]  
    })
});

//

// Test Google Reviews API returns all reviews 
test("Test Google Reviews API returns reviews", async () => {
    const response = await request(app).get("/api/reviews");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
            reviews: [
                 { author_name: "Paolo Di Canio", rating: 5, text: "Lovely Hay" },
                 { author_name: "Mark Nobel", rating: 4, text: "Great Service" },
                 { author_name: "Jared Bowen", rating: 5, text: "Excellent Quality" },
                 { author_name: "Thomas Soucek", rating: 4, text: "Very Satisfied" },
                 { author_name: "Michail Antonio", rating: 5, text: "Highly Recommend" }
            ]
    });
});





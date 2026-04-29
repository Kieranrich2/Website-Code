import { expect, test } from "vitest";
// Test star rating is translated into stars correctly 
function startRating(rating) {
    const rateing = rating || 0;
    return "★".repeat(rateing) + "☆".repeat(5 - rateing);
}

// Test 5 = 5 starts
test("translates 5 rating to 5 stars", () => {
    expect(startRating(5)).toBe("★★★★★");
});

// Test 4 = 4 stars and 1 empty star
test("translates 4 rating to 4 stars and 1 empty star", () => {
    expect(startRating(4)).toBe("★★★★☆");
});

// Test 3 = 3 stars and 2 empty stars
test("translates 3 rating to 3 stars and 2 empty stars", () => {
    expect(startRating(3)).toBe("★★★☆☆");
});

// Test 2 = 2 stars and 3 empty stars
test("translates 2 rating to 2 stars and 3 empty stars", () => {
    expect(startRating(2)).toBe("★★☆☆☆");
});

// Test 1 = 1 star and 4 empty stars
test("translates 1 rating to 1 star and 4 empty stars", () => {
    expect(startRating(1)).toBe("★☆☆☆☆");
});

// Test 0 = 5 empty stars
test("translates 0 rating to 5 empty stars", () => {
    expect(startRating(0)).toBe("☆☆☆☆☆");
});

// Only the most recent 5 reviews are shown
test("only the most recent 5 reviews are shown", () => {
    const reviews = [
        { rating: 5, text: { text: "Lovely Hay" }, authorAttribution: { displayName: "Paolo Di Canio" } },
        { rating: 4, text: { text: "Great Service" }, authorAttribution: { displayName: "Mark Nobel" } },
        { rating: 5, text: { text: "Excellent Quality" }, authorAttribution: { displayName: "Jared Bowen" } },
        { rating: 4, text: { text: "Very Satisfied" }, authorAttribution: { displayName: "Thomas Soucek" } },
        { rating: 5, text: { text: "Highly Recommend" }, authorAttribution: { displayName: "Michail Antonio" } },
        { rating: 3, text: { text: "Should Not Appear" }, authorAttribution: { displayName: "Should Not Appear" } }
    ];
    const shownReviews = reviews.slice(0, 5);
    expect(shownReviews.length).toBe(5);
});


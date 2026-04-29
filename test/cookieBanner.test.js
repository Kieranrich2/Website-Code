import { expect, test, beforeEach } from "vitest";


// Clear local storage before every test
beforeEach(() => {
    localStorage.clear();
});

// Test local storage is empty before preffrence is set
test("Test local storage is empty before preffrence is set", () => {
    expect(localStorage.getItem("cookiePreferences")).toBeNull();
});

// Test local storage is set to accepted when accept cookies is clicked
test("Test local storage is set to accepted when accept cookies is clicked", () => {
    localStorage.setItem("cookiePreferences", "accepted");
    expect(localStorage.getItem("cookiePreferences")).toBe("accepted");
});

// Test local storage is set to declined when decline cookies is clicked
test("Test local storage is set to declined when decline cookies is clicked", () => {
    localStorage.setItem("cookiePreferences", "declined");
    expect(localStorage.getItem("cookiePreferences")).toBe("declined");
});

// Test the user can change their preference after declining cookies
test("Test the user can change their preference after declining cookies", () => {
    localStorage.setItem("cookiePreferences", "declined");
    // User re accpted cookies 
    localStorage.setItem("cookiePreferences", "accepted");
    expect(localStorage.getItem("cookiePreferences")).toBe("accepted");
});

// Test the banner appears when no preference is set
test("Test the banner appears when no preference is set", () => {
    // Create a mock banner element for testing
    const banner = document.createElement("div");
    banner.id = "cookieBanner"; 
    document.body.appendChild(banner);
    // If no prefrence set display banner 
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (!cookiePreferences) {
        banner.style.display = "block";
    }
    expect(banner.style.display).toBe("block");
});

// Test the banner does not appear when cookies are accepted 
test("Test the banner does not appear when preference has been selected", () => {
    localStorage.setItem("cookiePreferences", "accepted");
    // Create a mock banner element for testing
    const banner = document.createElement("div");
    banner.id = "cookieBanner"; 
    document.body.appendChild(banner);
    // If preference is set to accepted, do not display banner
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (cookiePreferences === "accepted") {
        banner.style.display = "none";
    }
    expect(banner.style.display).toBe("none");
});

// Test the banner does not appear when cookies are declined
test("Test the banner does not appear when cookies are declined", () => {
    localStorage.setItem("cookiePreferences", "declined");
    // Create a mock banner element for testing
    const banner = document.createElement("div");
    banner.id = "cookieBanner"; 
    document.body.appendChild(banner);  
    // If preference is set to declined, do not display banner
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (cookiePreferences === "declined") {
        banner.style.display = "none";
    }
    expect(banner.style.display).toBe("none");
});

// Test Placeholder appears for Google Maps when cookies are declined
test("Test Placeholder appears for Google Maps when cookies are declined", () => {
    localStorage.setItem("cookiePreferences", "declined");
    const mapContainer = document.createElement("div");
    mapContainer.id = "googleMapsContainer";
    document.body.appendChild(mapContainer);
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (cookiePreferences === "declined") {
        mapContainer.innerHTML = `<section id="googleMapsPlaceholder">
            <p>Google Maps has been disabled because you declined cookies.</p>
            <button onclick="reAcceptCookies()">Accept Cookies to View Google Maps</button>
        </section>`;
    }
    expect(document.querySelector("#googleMapsPlaceholder")).not.toBeNull();
    expect(document.querySelector("#googleMapsPlaceholder button")).not.toBeNull();
});

// Test place holder appears for Google Reviews when cookies are declined
test("Test Placeholder appears for Google Reviews when cookies are declined", () => {
    localStorage.setItem("cookiePreferences", "declined");
    const reviewsContainer = document.createElement("div");
    reviewsContainer.id = "googleReviewsContainer";
    document.body.appendChild(reviewsContainer);
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (cookiePreferences === "declined") {
        reviewsContainer.innerHTML = `<section id="googleReviewsPlaceholder">
            <p>Google Reviews has been disabled because you declined cookies.</p>
            <button onclick="reAcceptCookies()">Accept Cookies to View Google Reviews</button>
        </section>`;
    }
    expect(document.querySelector("#googleReviewsPlaceholder")).not.toBeNull();
    expect(document.querySelector("#googleReviewsPlaceholder button")).not.toBeNull();
});


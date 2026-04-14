"use strict";


function initCookieBanner(){
    const cookieBanner = document.querySelector("#cookieBanner");
    const acceptBtn = document.querySelector("#acceptCookies");
    const declineBtn = document.querySelector("#declineCookies");

    // Check if the user has already made a choice
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (cookiePreferences == "accepted") {
        // User accepted cookies
        loadGoogleMaps();
        loadGoogleReviews();
    } else if (cookiePreferences == "declined") {
        // User declined cookies do show placeholders 
        showGoogleMapPlaceholder();
        showGoogleReviewsPlaceholder();
    } else {
        // show the banner if a prefrence has not been selected 
        cookieBanner.style.display="block";
    }
    // accept button 
    acceptBtn.addEventListener("click", () => {
        // Store awnser
        localStorage.setItem("cookiePreferences", "accepted");
        // hide the banner
        cookieBanner.style.display="none";
        loadGoogleMaps();
        loadGoogleReviews();
    });

    // decline button
    declineBtn.addEventListener("click", () => {
        // Store awnser
        localStorage.setItem("cookiePreferences", "declined");
        // hide the banner
        cookieBanner.style.display="none";
        // Show placeholders
        showGoogleMapPlaceholder();
        showGoogleReviewsPlaceholder();
    });
}

// load google maps if cookies are accepted
function loadGoogleMaps() {
    const mapContainer = document.querySelector("#googleMapsContainer");
    // Only run on the page if the map container exists 
    if (!mapContainer) return;
    mapContainer.innerHTML = `
        <section class="sectionBox">
            <h3>Where to Find Us:</h3>
            <section class="googleMaps">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70890.41191513698!2d0.5555767655122363!3d51.341132767061026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df2de0ef7c9e61%3A0x531a416cf369610e!2sLittle%20Place%20Farm!5e0!3m2!1sen!2suk!4v1770050837514!5m2!1sen!2suk"
                    style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </section>`;
}

// Show a placeholder for Google maps if cookies are not accepted
function showGoogleMapPlaceholder(){
    const mapContainer = document.querySelector("#googleMapsContainer");
    if(!mapContainer) return;
    mapContainer.innerHTML = `
    <section id="googleMapsPlaceholder">
    <p>Google Maps has been disabled because you declined cookies. </p>
    <p>We are located at Little Place Farm, Yaugher Lane, Hartlip, Sittingbourne, Kent, ME9 7XE. </P>
    <button onclick="reAcceptCookies()"> Accept Cookies to View Google Maps </button>
    </section>`;

}

// Load Google Reviews if Cookies are accepted 
function loadGoogleReviews() {
    const googleReviewsContainer = document.querySelector("#googleReviewsContainer");
    // Only run on page if the container exists
    if (!googleReviewsContainer) return;
    // call initReviews from googleReviews.js
    if (typeof initReviews === "function"){
        initReviews();
    }
}

// Show Google Reviews Placeholder if cookies declined
function showGoogleReviewsPlaceholder(){
    const googleReviewsContainer = document.querySelector("#googleReviewsContainer");
    // Only run on page if container exists
    if (!googleReviewsContainer) return;
    googleReviewsContainer.innerHTML = `
    <section id="googleReviewsPlaceholder">
    <p>Google Reviews are unavilible because you declined cookies</p>
    <button onclick="reAcceptCookies()"> Accept Cookies to View Google Reviews </button>
    </section>`;
}

// Allow users to accept cookies from placeholder after they have declined
window.reAcceptCookies = function (){
    localStorage.setItem("cookiePreferences", "accepted");
    loadGoogleMaps();
    loadGoogleReviews();
}

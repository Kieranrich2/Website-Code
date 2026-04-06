async function initReviews() {
    const container = document.querySelector("#reviewsContainer");
    // Fetch reviews from google
    try {
        const response = await fetch('/api/reviews'); // Requests data from sever.js
        const data = await response.json();

        if (data.reviews && data.reviews.length > 0) {
            container.innerHTML = ""; // Clears loading message 
            // Limit to 5 reviews 
            data.reviews.slice(0, 5).forEach(review => {
                const rating = review.rating || 0; // Gets the rating, 0 if not available
                const starRating = "★".repeat(rating) + "☆".repeat(5 - rating); // Transfers number rating into stars
                const reviewDiv = document.createElement("div"); // Creates a new div for each review
                reviewDiv.classList.add("review");
                reviewDiv.innerHTML = ` 
                    <p><strong>${review.authorAttribution.displayName}</strong></p>
                    <p>Rating: ${starRating}</p>
                    <p>${review.text?.text || ""}</p>
                `; // Adds the review data to the new div
                container.appendChild(reviewDiv); // Adds the new div to the container on the page
            });
        } else {
            // Appears if google didnt return ant reviews 
            container.innerHTML = "<p>Reviews unavailable, please check Google directly.</p>";
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        container.innerHTML = "<p>Reviews unavailable, please check Google directly.</p>";
    }
}

initReviews();
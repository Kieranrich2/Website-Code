async function initReviews() {
    const container = document.querySelector("#reviewsContainer");
    // Fetch reviews from google
    try {
        const response = await fetch('/api/reviews');
        const data = await response.json();

        if (data.reviews && data.reviews.length > 0) {
            container.innerHTML = "";
            // Limit to 5 reviews 
            data.reviews.slice(0, 5).forEach(review => {
                const rating = review.rating || 0;
                const starRating = "★".repeat(rating) + "☆".repeat(5 - rating);
                const reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review");
                reviewDiv.innerHTML = `
                    <p><strong>${review.authorAttribution.displayName}</strong></p>
                    <p>Rating: ${starRating}</p>
                    <p>${review.text?.text || ""}</p>
                `;
                container.appendChild(reviewDiv);
            });
        } else {
            // No reviews found
            container.innerHTML = "<p>Reviews unavailable, please check Google directly.</p>";
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        container.innerHTML = "<p>Reviews unavailable, please check Google directly.</p>";
    }
}

initReviews();
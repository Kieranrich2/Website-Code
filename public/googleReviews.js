function initReviews(){
    const placeId = "ChIJYZ587-At30cRDmFp82xBGlM"; // Google PLace ID for CR&SJ Bearup LTD
    const container = document.getElementById("reviewsContainer");
    
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    // Fetch the reviews from google
    service.getDetails({ placeId: placeId, fields: ['reviews'] }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            container.innerHTML = ""; 

        // Limit to 5 reviews at once
            place.reviews.slice(0, 5).forEach(review => { 
                const reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review");
                const starRating = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
                reviewDiv.innerHTML = `
                    <p><strong>${review.author_name}</strong></p>
                    <p>Rating: ${starRating}</p>
                    <p>${review.text}</p>
                `;
                container.appendChild(reviewDiv);
            });
        } else {
            container.innerHTML = "<p>Reviews are unavailable at the moment, please check out Google Reviews.</p>";
            console.error("Error fetching reviews:", status);
        }
    });
}


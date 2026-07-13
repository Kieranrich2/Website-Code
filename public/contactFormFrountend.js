"use strict";

// Contact Form

// Attach all event listerners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("#contactForm");
    const serviceSelect = document.querySelector("#service");
    const subServiceGroup = document.querySelector("#subServiceGroup");
    const subServiceSelect = document.querySelector("#subService");
    const status = document.querySelector("#formStatus");

    // Availible options
    const serviceMap = {
        "Hay Making and Bailing": [
            "Hay Making", 
            "Straw Bailing", 
            "Haylage Making", 
            "Silage Making"
        ],
        "Soil Preparation": [
            "Harrowing",
            "Ploughing",
            "Ring Rolling",
            "Ripping",
            "Seeding"
        ],
        "Pasture Maintenance": [
            "Spraying",
            "Flail Mowing",
            "Fertilising",
            "Flat Rolling"
        ],
        "Forage Sales": [
            "Hay Sales",
            "Straw Sales",
            "Haylage Sales"
        ],
        "Manure": [
            "Manure Removal",
            "Manure Spreading"
        ],
        "Trees and Hedges": [
            "Digger & Sheers",
            "Chainsaw Operator",
            "Hedge Cutting"
        ],
        "Groundwork & Arena Construction": [
            "Arena Construction",
            "Groundworks"
        ]
    };

    // Additional options for Groundworks
    const groundworksSubServices = ["Fencing", "Water Pipe Installation", "Footings", "Ground Levelling", "Bin Pads", "Farm Access Tracks"];
    

    // Show 2nd Options based on service selection
    // Listens for change on the 1st dropdown (A service being selected) 
    serviceSelect.addEventListener("change", function() {
        // Gets the selected service
        const selectedValue = this.value;
        // Gets the next options based on the selected service from the serviceMap 
        const subOptions = serviceMap[selectedValue];

        if (subOptions) {
            // 2nd deopdown placeholder 
            subServiceSelect.innerHTML = '<option value="" disabled selected>Select a Service...</option>';
            // Add each option to the 2nd drop down
            subOptions.forEach(option => {
                const el = document.createElement("option"); // Create options elemtent for new options
                el.value = option; 
                el.textContent = option;
                subServiceSelect.appendChild(el); // Add it to the new dropdown
            });
            subServiceGroup.style.display = "block"; // Display the 2nd drop down
        } else {
            // Stay hidden for "other"
            subServiceGroup.style.display = "none";
        }
    });

    // If groundworks is selected show groundwork options
    // Listen for change on the 2nd dropdown (A sub service being selected)
    subServiceSelect.addEventListener("change", function() {
        // Check if its groundworks and replace the dropdown with the groudworks sub catagories 
        if (this.value === "Groundworks") {
            subServiceSelect.innerHTML = '<option value="" disabled selected>Select a Groundwork Service...</option>';
            groundworksSubServices.forEach(option => {
                const el = document.createElement("option");
                el.value = option;
                el.textContent = option;
                subServiceSelect.appendChild(el);
            });
        }
    });

    // Submit to server
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = document.querySelector("#submitBtn");
        submitBtn.disabled = true; // Prevent multiple clicks 
        submitBtn.innerText = "Sending..."; // Visual fedbakc to the user
        
        // All data in JSON object
        const formData = {
            email: document.querySelector("#email").value,
            service: serviceSelect.value,
            subService: subServiceSelect.value,
            message: document.querySelector("#message").value
        };

        const setStatus = (text) => {
            const p = document.createElement("p");
            p.textContent = text;
            status.replaceChildren(p);
        };

            // Send the data to the /sendEmail route in server.js
        try {
            const response = await fetch("/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Tell the server A JSON object is being sent
                body: JSON.stringify(formData) // Convert to JSON string
            });

            const result = await response.json();

            if (response.ok) {
                setStatus(result.message);
                contactForm.reset(); // Clear the email contact form
                subServiceGroup.style.display = "none"; // Hide the 2nd dropdown
            } else {
                setStatus(result.error || "Error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("Could not connect to server.");
        } finally {
            // Enable the submit button again and reset text
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Enquiry";
        }
    });
});
// End of Contact Form
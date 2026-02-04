'use strict';

// Fetch the header.html file
// Checks if in the services folder
const isSub = window.location.pathname.includes('/services/');
// If it is in the services folder, must go up a level to find the header
const headerPath = isSub ? '../header.html' : 'header.html';

fetch(headerPath)
    .then(response => response.text())
    .then(data => {
        document.querySelector('#headerPlaceholder').innerHTML = data;

        // Get the correct title and subtitle from the current page
        const pageTitle = document.body.getAttribute('title');
        const pageSubtitle = document.body.getAttribute('subtitle');
        document.title = pageTitle + ' | CR & SJ Bearup LTD';
        document.querySelector('#subtitle').textContent = pageSubtitle;

        // If in the services folder, point back to the root folder
        if (isSub) {
            // Find each link in the new nav if in services folder
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const currentHref = link.getAttribute('href');
                link.setAttribute('href', '../' + currentHref);
            });
        }
    })
    .catch(error => console.error('Error loading header:', error));

// End of fetch header.html file

// Load service navigation
// Get the services navigation file path from data attribute
const servicesNavFile = document.body.getAttribute('data-servicesNav');
// Find the placeholder for the services navigation
const placeholder = document.querySelector('#servicesNavPlaceHolder');
if (servicesNavFile && placeholder) {
  fetch(servicesNavFile)
    .then(response => {
        if (!response.ok) throw new Error('file not found');
        return response.text();
    })
    .then(data => {
        placeholder.innerHTML = data;
    })
    .catch(error => console.error('Error loading services navigation:', error));
}
// End of load service navigation

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contactForm');
    const serviceSelect = document.querySelector('#service');
    const subServiceGroup = document.querySelector('#subServiceGroup');
    const subServiceSelect = document.querySelector('#subService');
    const status = document.querySelector('#formStatus');

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
            "Fertilizing",
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
    const groundworksSubServices = ["Fenceing", "Water Pipe Installation", "Footings", "Ground Leveling", "Bin Pads", "Farm Access Tracks"];
    

    // Show 2nd Options based on service selection
    serviceSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        const subOptions = serviceMap[selectedValue];

        if (subOptions) {
            subServiceSelect.innerHTML = ''; 
            subOptions.forEach(option => {
                const el = document.createElement('option');
                el.value = option;
                el.textContent = option;
                subServiceSelect.appendChild(el);
            });
            subServiceGroup.style.display = 'block';
        } else {
            subServiceGroup.style.display = 'none';
        }
    });

    // If groundworks is selected show groundwork options
    subServiceSelect.addEventListener('change', function() {
        if (this.value === 'Groundworks') {
            subServiceSelect.innerHTML = '<option value="" disabled selected>Select a Groundwork Service...</option>';
            groundworksSubServices.forEach(option => {
                const el = document.createElement('option');
                el.value = option;
                el.textContent = option;
                subServiceSelect.appendChild(el);
            });
        }
    });

    // Submit to server
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.querySelector('#submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        
        // All data in JSON object
        const formData = {
            email: document.querySelector('#email').value,
            service: serviceSelect.value,
            subService: subServiceSelect.value, 
            message: document.querySelector('#message').value
        };

            // Send the data to the /sendEmail route in server.js
        try {
            const response = await fetch('/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                status.innerHTML = `<p>${result.message}</p>`;
                contactForm.reset();
                subServiceGroup.style.display = 'none';
            } else {
                status.innerHTML = `<p>${result.error || 'Error'}</p>`;
            }
        } catch (error) {
            status.innerHTML = `<p>Could not connect to server.</p>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Submit Enquiry';
        }
    });
});
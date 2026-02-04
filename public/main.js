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
        const pageTitle = document.body.getAttribute('data-title');
        const pageSubtitle = document.body.getAttribute('data-subtitle');
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


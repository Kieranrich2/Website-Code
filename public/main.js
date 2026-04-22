'use strict';

// Fetch the header.html file
// Checks if in the services folder
const isSub = window.location.pathname.includes("/services/");
// If it is in the services folder, must go up a level to find the header
const headerPath = isSub ? "../header.html" : "header.html";

fetch(headerPath)
    .then(response => response.text())
    .then(data => {
        document.querySelector("#headerPlaceholder").innerHTML = data;

        // Call search bar after the header has loaded
        if (typeof initSearchBar === "function") {
            initSearchBar();
        }

        // Back Button 
        // Hide if on homepage 
        if (window.location.pathname.includes("homepage.html")) {
            document.querySelector("#backBtn").style.display = "none";
        }

        // Get the correct title and subtitle from the current page
        const pageTitle = document.body.getAttribute("data-title");
        const pageSubtitle = document.body.getAttribute("data-subtitle");
        document.title = pageTitle + " | CR & SJ Bearup LTD";
        document.querySelector("#subtitle").textContent = pageSubtitle;



        // If in the services folder, point back to the root folder
        if (isSub) {
            // Find each link in the new nav if in services folder
            const navLinks = document.querySelectorAll("nav a");
            navLinks.forEach(link => {
                const currentHref = link.getAttribute("href");
                link.setAttribute("href", "../" + currentHref);
            });
        }
        // Load cookie banner 
        fetch("/cookieBanner.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("#cookieBannerPlaceholder").innerHTML = data;
                // initize the cookier banner after it has loaded
                if (typeof initCookieBanner === "function") {
                    initCookieBanner();
                }
            })
            .catch(error => console.error("Error loading cookie banner:", error));

        // End of load cookie banner 
    })
    .catch(error => console.error("Error loading header:", error));

// End of fetch header.html file

// Set Tab Image (Favicon)
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/x-icon";
favicon.href = "/favicon.ico";
document.head.appendChild(favicon);
// End if Set Tab Image (Favicon)



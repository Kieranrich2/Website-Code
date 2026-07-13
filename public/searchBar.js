
// Options 
const predictiveSearchOptions = [
    "Home",
    "Services",
    "Contact Us",
    "Hay Making and Bailing",
    "Soil Preporation",
    "Pasture Maintainace",
    "Forage Sales",
    "Manure",
    "Trees & Hedges",
    "Groundworks",
    "Arena Construction",
    "Hay Making",
    "Straw Bailing",
    "Haylage Making",
    "Silage Making",
    "Harrowing",
    "Ploughing",
    "Ring Rolling",
    "Ripping",
    "Seeding",
    "Spraying",
    "Flail Mowing",
    "Fertilizing",
    "Flat Rolling",
    "Hay Sales",
    "Straw Sales",
    "Haylage Sales",
    "Manure removal",
    "Manure Spreading",
    "Digger & Sheers",
    "Chainsaw Operator",
    "Hedge Cutting",
    "Fencing",
    "Water Pipe Installation",
    "Footings",
    "Ground Levelling",
    "Bin Pads",
    "Farm Accses Tracks",
];

// Wait for header to load then call function
function initSearchBar() {
    const searchText = document.querySelector("#searchText");
    // Check the header is loaded
    if (!searchText) return;

    // Search button click
    const searchBtn = document.querySelector("#searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => selectOption({ textContent: searchText.value }));
    }

    // Event delegation for predictive result clicks
    const predictiveResultsDiv = document.querySelector(".predictiveResults");
    if (predictiveResultsDiv) {
        predictiveResultsDiv.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (li) selectOption(li);
        });
    }

    let currentSelection = -1; // Highlighted search option
    // Filter key words between user input and options
    searchText.onkeyup = function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") return;
        currentSelection = -1;
        let result = [];
        let input = searchText.value;
        if (input.length) { // Checks the input field isnt empty
            result = predictiveSearchOptions.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            })
                .slice(0, 5); // Only show 5 options
        }
        displayResults(result);
    };

    // Search on enter key and navigate with arrows
    searchText.onkeydown = function (e) {
        const items = document.querySelectorAll(".predictiveResults li");

        // Arrow down 
        if (e.key === "ArrowDown") {
            e.preventDefault();
            currentSelection = Math.min(currentSelection + 1, items.length - 1);
            items.forEach(item => item.classList.remove("highlighted"));
            if (items[currentSelection]) {
                items[currentSelection].classList.add("highlighted");
            }
            // Arrow up
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            currentSelection = Math.max(currentSelection - 1, -1);
            items.forEach(item => item.classList.remove("highlighted"));
            if (items[currentSelection]) {
                items[currentSelection].classList.add("highlighted");
            }
            // Enter selects the option
        } else if (e.key === "Enter") {
            const highlighted = document.querySelector(".predictiveResults li.highlighted");
            const selected = highlighted || document.querySelector(".predictiveResults li");
            if (selected) {
                selectOption(selected);
            }
        }
    };

    // hide options if somewhere else is clicked
    document.addEventListener("click", (e) => {
        const resultsDiv = document.querySelector(".predictiveResults");
        if (e.target.id !== "searchText" && resultsDiv) {
            resultsDiv.innerHTML = "";
        }
    });
}

// Displaying the results 
function displayResults(result) {
    const predictiveResults = document.querySelector(".predictiveResults");
    // Check predictive results exist 
    if (!predictiveResults) return;
    // No results to show
    if (!result.length) {
        predictiveResults.innerHTML = "";
        return;
    }

    // Make results/options clickable
    const content = result.map((list) => {
        return `<li>${list}</li>`;
    });
    predictiveResults.innerHTML = `<ul> ${content.join("")}</ul>`;
}

function selectOption(list) {
    const searchText = document.querySelector("#searchText");
    const predictiveResults = document.querySelector(".predictiveResults");

    // Gets the selected option 
    const selectedOption = list.textContent || list.value || "";
    if (!selectedOption) return;
    // shows the users selected option within the input field
    if (searchText) searchText.value = selectedOption;
    // Removes the drop down list from the screen
    if (predictiveResults) predictiveResults.innerHTML = "";

    // Directs users to there desired page
    if (selectedOption === "Home") {
        window.location.href = "/homepage.html";
    } else if (selectedOption === "Services") {
        window.location.href = "/services.html";
    } else if (selectedOption === "Contact Us") {
        window.location.href = "/contactUs.html";
    } else {
        const fileName = selectedOption
            .replace(/ &/g, "And") // Replace "&" with And
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase(); // Puts in camel case
            })
            .replace(/\s+/g, "");

        window.location.href = `/services/${fileName}.html`;
    }
}
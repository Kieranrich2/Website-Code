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
    "Ground Leveling",
    "Bin Pads",
    "Farm Accses Tracks",
];


// Wait for header to load then call function
function initSearchBar() {
    const searchText = document.querySelector("#searchText");
    // Check the header is loaded
    if (!searchText) return;

    // Filter key words between user input and options 
    searchText.onkeyup = function () {
        let result = [];
        let input = searchText.value;
        if (input.length) {
            result = predictiveSearchOptions.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
        }
        displayResults(result);
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
        return `<li onclick="selectOption(this)">${list}</li>`;
    });
    predictiveResults.innerHTML = `<ul> ${content.join("")}</ul>`;
}

function selectOption(list) {
    const searchText = document.querySelector("#searchText");
    const predictiveResults = document.querySelector(".predictiveResults");
    
    // Get text regardless of if it's from a list item or a manual object
    const selectedOption = list.textContent || list.value || "";
    if (!selectedOption) return;

    if (searchText) searchText.value = selectedOption;
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
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");

        window.location.href = `/services/${fileName}.html`;
    }
}
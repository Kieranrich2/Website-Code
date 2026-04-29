import { expect, test } from "vitest";
// Test file names are translated to camel case and "&" is replaced

function convertToCamelCase(selectedOption) {
    return selectedOption
        .replace(/ &/g, "And")
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
}

// Two word service name transaltes to camel case
test("translates multiple word service name to camel case", () => {
    expect(convertToCamelCase("Hay Making")).toBe("hayMaking");
});

// Test that "&" is replaced with "And"
test("replaces '&' with 'And'", () => {
    expect(convertToCamelCase("Trees & Hedges")).toBe("treesAndHedges");
});

// Single word translation
test("single word translation", () => {
    expect(convertToCamelCase("Manure")).toBe("manure");
});

// Test case sensitivity 
test("handles case sensitivity", () => {
    const options = ["Hay Making", "Hay Sales", "Haylage Making", "Haylage Sales"];
    const LowerCase = options.filter(keyword => keyword.toLowerCase().includes("hay"));
    const UpperCase = options.filter(keyword => keyword.toUpperCase().includes("HAY"));
    expect(LowerCase).toEqual(options);
    expect(UpperCase).toEqual(options);
});

// Test only 5 predictions appear 
test("only 5 predictions appear", () => {
    const options = ["Hay Making", "Hay Sales", "Haylage Making", "Haylage Sales", "Harrowing", "Hedge Cutting", "Homepage"];
    const predictiveResults = options.filter(keyword => keyword.toLowerCase().includes("h")).slice(0, 5);
    expect(predictiveResults.length).toBeLessThanOrEqual(5);
});

// Test the search returns relevant results
test("Test the search returns relevant results", () => {
    const options = [
        "Hay Making", "Hay Sales", "Haylage Making", 
        "Harrowing", "Hedge Cutting", "Manure Removal"
    ];
    
    const result = options.filter(keyword =>
        keyword.toLowerCase().includes("hay".toLowerCase())
    );

    // All results should contain "hay"
    result.forEach(option => {
        expect(option.toLowerCase()).toContain("hay");
    });
    
    // Results that don't contain "hay" should not appear
    expect(result).not.toContain("Harrowing");
    expect(result).not.toContain("Hedge Cutting");
    expect(result).not.toContain("Manure Removal");
});


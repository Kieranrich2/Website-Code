import { expect, test } from "vitest";
// Services and sub services contin the correct options
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

    // Test Services options contains 7 Categories
test("service options contains 7 categories", () => {
    expect(Object.keys(serviceMap)).toEqual([
        "Hay Making and Bailing",
        "Soil Preparation",
        "Pasture Maintenance",
        "Forage Sales",
        "Manure",
        "Trees and Hedges",
        "Groundwork & Arena Construction"
    ]);
});

// Test that "other" dosnt show the 2nd dropdown menu 
test("other service option do not show sub services", () => {
    expect(serviceMap["Other"]).toBeUndefined();
});

// Test Hay Making and Bailing contains the correct sub services
test("Hay Making and Bailing contains correct sub services", () => {
    expect(serviceMap["Hay Making and Bailing"]).toEqual([
        "Hay Making", 
        "Straw Bailing", 
        "Haylage Making", 
        "Silage Making"
    ]);
});

// Test Soil Preparation contains the correct sub services
test("Soil Preparation contains correct sub services", () => {
    expect(serviceMap["Soil Preparation"]).toEqual([
        "Harrowing",
        "Ploughing",
        "Ring Rolling",
        "Ripping",
        "Seeding"
    ]);
});

// Test Pasture Maintenance contains the correct sub services
test("Pasture Maintenance contains correct sub services", () => {
    expect(serviceMap["Pasture Maintenance"]).toEqual([
        "Spraying",
        "Flail Mowing",
        "Fertilizing",
        "Flat Rolling"
    ]);
});

// Test Forage Sales contains the correct sub services
test("Forage Sales contains correct sub services", () => {
    expect(serviceMap["Forage Sales"]).toEqual([
        "Hay Sales",
        "Straw Sales",
        "Haylage Sales"
    ]);
});

// Test Manure contains the correct sub services
test("Manure contains correct sub services", () => {
    expect(serviceMap["Manure"]).toEqual([
        "Manure Removal",
        "Manure Spreading"
    ]);
});

// Test Trees and Hedges contains the correct sub services
test("Trees and Hedges contains correct sub services", () => {
    expect(serviceMap["Trees and Hedges"]).toEqual([
        "Digger & Sheers",
        "Chainsaw Operator",
        "Hedge Cutting"
    ]);
});

// Test Groundwork & Arena Construction contains the correct sub services
test("Groundwork & Arena Construction contains correct sub services", () => {
    expect(serviceMap["Groundwork & Arena Construction"]).toEqual([ 
        "Arena Construction",
        "Groundworks"
    ]);
});

// Test Groundworks sub services contains the correct options
test("Groundworks sub services contains correct options", () => {
    expect(groundworksSubServices).toEqual([
        "Fenceing",
        "Water Pipe Installation",
        "Footings",
        "Ground Leveling",
        "Bin Pads",
        "Farm Access Tracks"
    ]);
});



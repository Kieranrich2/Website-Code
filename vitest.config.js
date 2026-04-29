// Runs test in simulated browser 
// For local storage tests
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom'
    }
});
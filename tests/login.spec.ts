// Import the necessary modules from Playwright
import { test, expect } from '@playwright/test';

// Define the type for test data
interface TestCase {
    description: string;
    navigationPath: string;
    task: string;
    column: string;
    tags: string[];
}

// Global credentials
const credentials = {
    email: 'admin',
    password: 'password123'
};

// Test data in JSON format
const testData: TestCase[] = [
    {
        description: 'Test Case 1: Verify "Implement user authentication" in To Do with correct tags',
        navigationPath: 'Web Application',
        task: 'Implement user authentication',
        column: 'To Do',
        tags: ['Feature', 'High Priority']
    },
    {
        description: 'Test Case 2: Verify "Fix navigation bug" in To Do with correct tags',
        navigationPath: 'Web Application',
        task: 'Fix navigation bug',
        column: 'To Do',
        tags: ['Bug']
    },
    {
        description: 'Test Case 3: Verify "Design system updates" in In Progress with correct tags',
        navigationPath: 'Web Application',
        task: 'Design system updates',
        column: 'In Progress',
        tags: ['Design']
    },
    {
        description: 'Test Case 4: Verify "Push notification system" in To Do with correct tags',
        navigationPath: 'Mobile Application',
        task: 'Push notification system',
        column: 'To Do',
        tags: ['Feature']
    },
    {
        description: 'Test Case 5: Verify "Offline mode" in In Progress with correct tags',
        navigationPath: 'Mobile Application',
        task: 'Offline mode',
        column: 'In Progress',
        tags: ['Feature', 'High Priority']
    },
    {
        description: 'Test Case 6: Verify "App icon design" in Done with correct tags',
        navigationPath: 'Mobile Application',
        task: 'App icon design',
        column: 'Done',
        tags: ['Design']
    }
];

test.describe('Asana Login and Task Verification Automation', () => {
    testData.forEach(({ description, navigationPath, task, column, tags }) => {
        test(description, async ({ page }) => {
            // Navigate to the demo app
            await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

            // Login
            await page.fill('#username', credentials.email);
            await page.fill('#password', credentials.password);
            await page.click('button[type="submit"]');

            // Navigate to the specified application section
            await page.click(`text=${navigationPath}`);

            // Verify the task is in the correct column
            const columnLocator = page.locator(`div.flex:has-text("${column}")`);
            const taskLocator = columnLocator.locator(`div.bg-white:has-text("${task}")`);
            await expect(taskLocator).toBeVisible();

            // Verify the tags are correct
            for (const tag of tags) {
                const tagLocator = taskLocator.locator(`span.px-2:has-text("${tag}")`);
                await expect(tagLocator).toBeVisible();
            }
        });
    });
});

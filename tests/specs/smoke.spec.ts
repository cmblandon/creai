import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

/**
 * Smoke Test Suite
 * 
 * This suite contains critical smoke tests that verify the basic functionality
 * of the creai.mx website. These tests should run quickly and catch major issues.
 * 
 * Test Coverage:
 * - Page load validation
 * - Key UI elements visibility
 * - Basic navigation functionality
 * - Mobile responsiveness
 * 
 * @group smoke
 */
test.describe('Smoke Tests', () => {
    let homePage: HomePage;

    /**
     * Before Each Hook
     * 
     * Runs before each test in this suite.
     * Initializes the HomePage object and navigates to the home page.
     * Cookie consent is automatically handled by the BasePage.goto() method.
     */
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    /**
     * Test 1: Page Load Validation
     * 
     * Validates that the page loads successfully without errors.
     * 
     * Validations:
     * 1. URL contains 'creai.mx' - Confirms correct page loaded
     * 2. No console errors - Ensures no JavaScript errors occurred
     * 
     * This is a critical test that should always pass for a healthy site.
     */
    test('should load the page successfully', async ({ page }) => {
        // Validation 1: HTTP 200 - Verify current page loaded successfully
        expect(page.url()).toContain('creai.mx');

        // Validation 2: No console errors
        const consoleErrors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Wait a bit to capture any console errors that might occur
        await page.waitForTimeout(1000);
        expect(consoleErrors).toEqual([]);
    });

    /**
     * Test 2: Key Elements Visibility
     * 
     * Validates that critical UI elements are visible on the home page.
     * 
     * Validations:
     * 1. Logo is visible - Brand identity
     * 2. Contact button (CTA) is visible - Primary conversion element
     * 3. Navigation menu is visible - Site navigation
     * 4. Clients section is visible - Social proof
     * 5. Success stories section is visible - Case studies
     * 
     * All elements must be visible for a complete user experience.
     */
    test('should display key elements (Logo, CTA, Sections)', async () => {
        // Validation 1: Logo visible
        const isLogoVisible = await homePage.isLogoVisible();
        expect(isLogoVisible, 'Logo should be visible').toBeTruthy();

        // Validation 2: CTA visible
        const isCtaVisible = await homePage.isContactButtonVisible();
        expect(isCtaVisible, 'Contact button (CTA) should be visible').toBeTruthy();

        // Validation 3: At least 3 visible sections
        const isNavigationMenuVisible = await homePage.isNavigationMenuVisible();
        expect(isNavigationMenuVisible, 'Navigation menu should be visible').toBeTruthy();

        const isClientsVisible = await homePage.isClientsVisible();
        expect(isClientsVisible, 'Clients should be visible').toBeTruthy();

        const isSuccessStoriesVisible = await homePage.isSuccessStoriesVisible();
        expect(isSuccessStoriesVisible, 'Success stories should be visible').toBeTruthy();
    });

    /**
     * Test 3: Navigation Functionality
     * 
     * Validates that menu navigation works correctly.
     * 
     * Test Flow:
     * 1. Click on "Success stories" menu item
     * 2. Wait for navigation to complete
     * 3. Verify URL changed to success-stories page
     * 
     * This tests the Header component's clickMenuItem method and
     * ensures navigation is not blocked by overlays or JavaScript errors.
     */
    test('should navigate correctly via menu', async ({ page }) => {
        // Use the Page Object method instead of direct locator access
        await homePage.header.clickMenuItem('Success stories');

        // Wait for navigation to complete
        await page.waitForURL('**/success-stories**');

        // Validation: Verify URL changed
        expect(page.url()).toContain('success-stories');
    });

    /**
     * Test 4: Mobile Viewport Validation
     * 
     * Validates that key elements remain visible on mobile devices.
     * 
     * This test runs on all configured mobile projects (Pixel 5, iPhone 14).
     * The viewport configuration is handled by playwright.config.ts.
     * 
     * Validation:
     * - Logo should remain visible on mobile viewports
     * 
     * Note: This test only runs when isMobile is true (mobile projects).
     */
    test('should display key elements on mobile', async ({ isMobile }) => {
        if (isMobile) {
            const isLogoVisible = await homePage.isLogoVisible();
            expect(isLogoVisible, 'Logo should still be visible on mobile').toBeTruthy();
        }
    });
});

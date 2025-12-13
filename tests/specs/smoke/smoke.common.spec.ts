import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';

/**
 * Common Smoke Tests
 * Validations that apply to ALL platforms/viewports.
 */
test.describe('Common Checks', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('should load the page successfully', async ({ page }) => {
        await test.step('Validate URL', async () => {
            expect(page.url()).toContain('creai.mx');
        });

        await test.step('Check for Console Errors', async () => {
            const consoleErrors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') consoleErrors.push(msg.text());
            });

            // Allow network settle
            await page.waitForLoadState('domcontentloaded');
            if (consoleErrors.length > 0) {
                console.warn('Console Errors detected:', consoleErrors);
            }
            expect(consoleErrors, `Found ${consoleErrors.length} console errors`).toEqual([]);
        });
    });
});

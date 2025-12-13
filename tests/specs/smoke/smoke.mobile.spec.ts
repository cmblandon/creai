import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';

/**
 * Mobile Smoke Tests
 * Run only on Mobile viewports.
 * @group smoke
 */
test.describe('Mobile Experience', { tag: '@mobile' }, () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    // Skip entire block if NOT running in mobile mode
    test.skip(({ isMobile }) => !isMobile, 'Skipping Mobile tests on Desktop viewport');

    test('should display mobile specific elements', async () => {
        await test.step('Verify Mobile Header', async () => {
            await expect(homePage.logo.first(), 'Logo should be visible').toBeVisible();
            await expect(homePage.menuButton, 'Hamburger Menu should be visible').toBeVisible();
            // Check if CTA is visible (might be hidden on some mobile views, but we expect it per requirements)
            await expect(homePage.contactButton.first(), 'CTA should be visible').toBeVisible();
        });
    });

    test('should navigate via mobile menu', async ({ page }) => {
        await test.step('Open Mobile Menu and Navigate', async () => {
            // clickMenuItem handles opening the menu internally for mobile if needed
            await homePage.header.clickMenuItem('Success stories');
        });

        await test.step('Verify URL Change', async () => {
            await page.waitForURL('**/success-stories**');
            expect(page.url()).toContain('success-stories');
        });
    });
});

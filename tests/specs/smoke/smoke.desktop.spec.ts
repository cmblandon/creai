import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';

/**
 * Desktop Smoke Tests
 * Run only on Desktop viewports.
 * @group smoke
 */
test.describe('Desktop Experience', { tag: '@desktop' }, () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    // Skip entire block if running in mobile mode
    test.skip(({ isMobile }) => isMobile, 'Skipping Desktop tests on Mobile viewport');

    test('should display all key desktop sections', async () => {
        await test.step('Verify Navigation Elements', async () => {
            await expect(homePage.logo.first(), 'Logo').toBeVisible();
            await expect(homePage.navigationMenu.first(), 'Nav Menu').toBeVisible();
            await expect(homePage.contactButton.first(), 'CTA').toBeVisible();
        });

        await test.step('Verify Content Sections', async () => {
            await expect(homePage.clients.first(), 'Clients Section').toBeVisible();
            await expect(homePage.successStories.first(), 'Success Stories').toBeVisible();
            await expect(homePage.knowledgeHub.first(), 'Knowledge Hub').toBeVisible();
        });
    });

    test('should navigate via desktop menu', async ({ page }) => {
        await test.step('Navigate to Success Stories', async () => {
            await homePage.header.clickMenuItem('Success stories');
        });

        await test.step('Verify URL Change', async () => {
            await page.waitForURL('**/success-stories**');
            expect(page.url()).toContain('success-stories');
        });
    });
});

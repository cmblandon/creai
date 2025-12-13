import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

/**
 * Smoke Test Suite
 * 
 * Critical path tests for creai.mx
 * Verifies core functionality across Viewports (Desktop & Mobile)
 * 
 * @group smoke
 */
test.describe('Smoke Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    /**
     * Shared Validations
     * Checks that apply to ALL viewports/devices
     */
    test.describe('Common Checks', () => {
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

    /**
     * Desktop Specific Tests
     * Run only when !isMobile
     */
    test.describe('Desktop Experience', { tag: '@desktop' }, () => {
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

    /**
     * Mobile Specific Tests
     * Run only when isMobile
     */
    test.describe('Mobile Experience', { tag: '@mobile' }, () => {
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
});

import { Page } from '@playwright/test';
import { HomePageSelectors } from './selectors/HomePageSelectors';

/**
 * Abstract BasePage class following the Single Responsibility Principle (SOLID).
 * 
 * This class serves as the foundation for all Page Objects in the framework.
 * It encapsulates common page interactions and ensures consistency across all pages.
 * 
 * Key Responsibilities:
 * - Page navigation with automatic cookie consent handling
 * - Common page utilities (title, load state)
 * - Shared page configuration
 * 
 * @abstract
 * @class BasePage
 */
export abstract class BasePage {
    /** Playwright Page instance for browser interactions */
    protected page: Page;

    /** Relative URL path for this page (e.g., '/', '/about-us') */
    readonly url: string;

    /**
     * Creates an instance of BasePage.
     * 
     * @param {Page} page - Playwright Page instance
     * @param {string} [url='/'] - Relative URL path for the page
     */
    constructor(page: Page, url: string = '/') {
        this.page = page;
        this.url = url;
    }

    /**
     * Navigates to the page URL and handles cookie consent modal.
     * 
     * This method:
     * 1. Navigates to the configured URL
     * 2. Waits for DOM content to load
     * 3. Automatically accepts cookie consent if modal appears
     * 
     * @async
     * @returns {Promise<void>}
     * 
     * @example
     * const homePage = new HomePage(page);
     * await homePage.goto();
     */
    async goto(): Promise<void> {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('domcontentloaded');

        // Handle cookie consent modal if it appears
        const cookieButton = this.page.locator(HomePageSelectors.COOKIE_ACCEPT_BUTTON);
        try {
            await cookieButton.isVisible();
            await cookieButton.click();
        } catch {
            // Cookie modal didn't appear or was already dismissed
            console.log('Cookie consent modal not found or already dismissed');
        }
    }

    /**
     * Retrieves the page title.
     * 
     * @async
     * @returns {Promise<string>} The page title
     * 
     * @example
     * const title = await homePage.getTitle();
     * expect(title).toContain('Creai');
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Waits for the page to reach a specific load state.
     * 
     * Load states:
     * - 'load': Page load event fired
     * - 'domcontentloaded': DOMContentLoaded event fired
     * - 'networkidle': No network connections for at least 500ms
     * 
     * @async
     * @param {('load'|'domcontentloaded'|'networkidle')} [state='load'] - Target load state
     * @returns {Promise<void>}
     * 
     * @example
     * await homePage.waitForLoadState('networkidle');
     */
    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
    }
}

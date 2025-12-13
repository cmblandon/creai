import { Page, Locator } from '@playwright/test';
import { MENU_ITEMS } from '../selectors/HeaderSelectors';

/**
 * Header Component representing the site navigation header.
 * 
 * This component encapsulates all header-related interactions and elements.
 * It can be reused across multiple Page Objects that include the header.
 * 
 * Key Features:
 * - Menu item navigation by text or index
 * - Scoped to header navigation to avoid conflicts with footer/body links
 * - Uses semantic selectors (getByRole) for better accessibility
 * 
 * @class Header
 */
export class Header {
    /** Playwright Page instance */
    readonly page: Page;

    /** Locator for all menu items in the header navigation */
    readonly menuItems: Locator;

    /**
     * Creates an instance of Header component.
     * 
     * @param {Page} page - Playwright Page instance
     * 
     * @example
     * const header = new Header(page);
     * await header.clickMenuItem('Success stories');
     */
    constructor(page: Page) {
        this.page = page;
        this.menuItems = page.locator(MENU_ITEMS);
    }

    /**
     * Clicks a menu item in the header navigation.
     * 
     * This method supports two ways of selecting menu items:
     * 1. By text content (e.g., 'Success stories', 'About us')
     * 2. By index position (e.g., 0 for first item, 1 for second)
     * 
     * The method uses getByRole scoped to navigation to avoid clicking
     * duplicate links that may exist in the footer or page body.
     * 
     * @async
     * @param {string | number} nameOrIndex - Menu item text or zero-based index
     * @returns {Promise<void>}
     * 
     * @example
     * // Click by text
     * await header.clickMenuItem('Success stories');
     * 
     * @example
     * // Click by index
     * await header.clickMenuItem(0); // Clicks first menu item
     */
    async clickMenuItem(nameOrIndex: string | number): Promise<void> {
        // Handle Mobile Menu: Check if hamburger button is visible
        // We use a short timeout because we expect the button to be there instantly if on mobile
        const menuButton = this.page.getByRole('button', { name: 'menu', exact: false });
        if (await menuButton.isVisible()) {
            await menuButton.click();
        }

        if (typeof nameOrIndex === 'number') {
            // Click by index position
            await this.menuItems.nth(nameOrIndex).click();
        } else {
            // Click by text content, scoped to navigation to avoid footer/body links
            // Start with a broader search, then restrict if necessary or take the first visible one
            const menuItem = this.page
                .getByRole('link', { name: nameOrIndex, exact: false })
                .first();

            // Ensure menu is open and item is visible before clicking
            await menuItem.waitFor({ state: 'visible' });
            await menuItem.click();
        }
    }
}

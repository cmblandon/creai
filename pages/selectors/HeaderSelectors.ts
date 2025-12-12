/**
 * Header Component Selectors
 * 
 * This file contains all CSS selectors used by the Header component.
 * Centralizing selectors here makes them easier to maintain and update
 * when the website structure changes.
 * 
 * @module HeaderSelectors
 */

/**
 * CSS selector for all navigation links in the header.
 * 
 * This selector targets anchor tags within the header's navigation element.
 * It's used as a base locator that can be filtered by text or index.
 * 
 * @constant {string}
 * 
 * @example
 * // Usage in Header component
 * this.menuItems = page.locator(MENU_ITEMS);
 */
export const MENU_ITEMS = 'header nav a';

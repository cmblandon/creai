/**
 * HomePage Selectors
 * 
 * This file contains all CSS selectors used by the HomePage Page Object.
 * Selectors are organized as a constant object for easy access and maintenance.
 * 
 * Best Practices:
 * - Use specific class names when available
 * - Combine multiple selectors with commas for fallback options
 * - Keep selectors as simple as possible while remaining unique
 * 
 * @module HomePageSelectors
 */

export const HomePageSelectors = {
    /**
     * Selector for the company logo in the navigation bar.
     * Targets the navbar container element.
     */
    LOGO: '.navbar11_container',

    /**
     * Selector for the contact button (Call-to-Action).
     * Uses multiple selectors for flexibility:
     * - Direct href match for /contact
     * - Trigger attribute for CTA tracking
     */
    // CONTACT_BUTTON: 'a[href="/contact"], a[trigger="contact_cta"]',
    CONTACT_BUTTON: {
        role: 'link' as const,
        name: 'Contact',
        exact: true
    },

    /**
     * Selector for the main navigation menu container.
     * Contains all primary navigation links.
     */
    NAVIGATION_MENU: '.navbar11_menu-elements',

    /**
     * Selector for the clients/partners logo section.
     * Displays logos of companies that use the service.
     */
    CLIENTS: '.logo3_component',

    /**
     * Selector for the success stories carousel/list.
     * Uses role attribute and Swiper library classes.
     */
    SUCCESS_STORIES: 'div[role="list"].swiper-wrapper.w-dyn-items',

    /**
     * Selector for the cookie consent dialog accept button.
     * Targets the CookieBot "Accept All" button by its specific ID.
     */
    COOKIE_ACCEPT_BUTTON: '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',

    /**
     * Selector for the about us section.
     * Targets the about us container element.
     */
    ABOUT_US: 'a[href="/about-us"]',

    /**
     * Selector for the knowledge hub section.
     * Targets the knowledge hub container element.
     */
    KNOWLEDGE_HUB: 'a[href="/knowledge-hub"]',

    /**
     * Selector for the menu button.
     * Targets the menu button element.
     */
    MENU_BUTTON: {
        role: 'button' as const,
        name: 'menu',
        exact: true
    },
} as const;

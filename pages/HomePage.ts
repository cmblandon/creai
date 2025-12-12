import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './components/Header';
import { HomePageSelectors } from './selectors/HomePageSelectors';

/**
 * HomePage Page Object representing the main landing page (creai.mx).
 * 
 * This class encapsulates all elements and interactions specific to the home page.
 * It extends BasePage to inherit common page functionality and follows the
 * Page Object Model (POM) design pattern.
 * 
 * Key Features:
 * - Header component integration
 * - Key element visibility checks
 * - Locator definitions for main page elements
 * 
 * @class HomePage
 * @extends {BasePage}
 */
export class HomePage extends BasePage {
    /** Header component for navigation interactions */
    readonly header: Header;

    /** Logo element locator */
    readonly logo: Locator;

    /** Contact button (CTA) locator */
    readonly contactButton: Locator;

    /** Navigation menu locator */
    readonly navigationMenu: Locator;

    /** Clients section locator */
    readonly clients: Locator;

    /** Success stories section locator */
    readonly successStories: Locator;

    /**
     * Creates an instance of HomePage.
     * 
     * Initializes all page elements and the Header component.
     * 
     * @param {Page} page - Playwright Page instance
     * 
     * @example
     * const homePage = new HomePage(page);
     * await homePage.goto();
     */
    constructor(page: Page) {
        super(page, '/');
        this.header = new Header(page);

        this.logo = page.locator(HomePageSelectors.LOGO);
        this.contactButton = page.locator(HomePageSelectors.CONTACT_BUTTON).first();
        this.navigationMenu = page.locator(HomePageSelectors.NAVIGATION_MENU);
        this.clients = page.locator(HomePageSelectors.CLIENTS);
        this.successStories = page.locator(HomePageSelectors.SUCCESS_STORIES);
    }

    /**
     * Checks if the logo is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if logo is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isLogoVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isLogoVisible(): Promise<boolean> {
        return await this.logo.first().isVisible();
    }

    /**
     * Checks if the contact button (CTA) is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if contact button is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isContactButtonVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isContactButtonVisible(): Promise<boolean> {
        return await this.contactButton.first().isVisible();
    }

    /**
     * Checks if the navigation menu is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if navigation menu is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isNavigationMenuVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isNavigationMenuVisible(): Promise<boolean> {
        return await this.navigationMenu.first().isVisible();
    }

    /**
     * Checks if the clients section is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if clients section is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isClientsVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isClientsVisible(): Promise<boolean> {
        return await this.clients.first().isVisible();
    }

    /**
     * Checks if the success stories section is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if success stories section is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isSuccessStoriesVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isSuccessStoriesVisible(): Promise<boolean> {
        return await this.successStories.first().isVisible();
    }
}

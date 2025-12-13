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

    /** Navigation menu locator */
    readonly navigationMenu: Locator;

    /** Clients section locator */
    readonly clients: Locator;

    /** Success stories section locator */
    readonly successStories: Locator;

    /** About us section locator */
    readonly aboutUs: Locator;

    /** Knowledge hub section locator */
    readonly knowledgeHub: Locator;

    /** Contact button (CTA) locator */
    readonly contactButton: Locator;

    /** Menu button locator */
    readonly menuButton: Locator;


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
        //this.contactButton = page.locator(HomePageSelectors.CONTACT_BUTTON).first();
        this.contactButton = page.getByRole(
            HomePageSelectors.CONTACT_BUTTON.role,
            {
                name: HomePageSelectors.CONTACT_BUTTON.name,
                exact: HomePageSelectors.CONTACT_BUTTON.exact
            }
        );
        this.navigationMenu = page.locator(HomePageSelectors.NAVIGATION_MENU);
        this.clients = page.locator(HomePageSelectors.CLIENTS);
        this.successStories = page.locator(HomePageSelectors.SUCCESS_STORIES);
        this.aboutUs = page.locator(HomePageSelectors.ABOUT_US);
        this.knowledgeHub = page.locator(HomePageSelectors.KNOWLEDGE_HUB);

        this.menuButton = page.getByRole(
            HomePageSelectors.MENU_BUTTON.role,
            {
                name: HomePageSelectors.MENU_BUTTON.name,
                exact: HomePageSelectors.MENU_BUTTON.exact
            }
        );
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

    /**
     * Checks if the knowledge hub section is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if knowledge hub section is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isKnowledgeHubVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isKnowledgeHubVisible(): Promise<boolean> {
        return await this.knowledgeHub.first().isVisible();
    }

    /**
     * Checks if the about us section is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if about us section is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isAboutUsVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isAboutUsVisible(): Promise<boolean> {
        return await this.aboutUs.first().isVisible();
    }

    /**
     * Checks if the menu button is visible on the page.
     * 
     * @async
     * @returns {Promise<boolean>} True if menu button is visible, false otherwise
     * 
     * @example
     * const isVisible = await homePage.isMenuButtonVisible();
     * expect(isVisible).toBeTruthy();
     */
    async isMenuButtonVisible(): Promise<boolean> {
        await this.menuButton.isVisible();
        return await this.menuButton.isVisible();
    }
}

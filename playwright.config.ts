import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * 
 * This file configures Playwright test runner settings, including:
 * - Test directory and execution settings
 * - Browser and device configurations
 * - CI/CD specific settings
 * - Reporting options
 * 
 * For more information, see: https://playwright.dev/docs/test-configuration
 */

/**
 * Environment Variables (Optional)
 * 
 * Uncomment the following lines to load environment variables from a .env file:
 * 
 * import dotenv from 'dotenv';
 * import path from 'path';
 * dotenv.config({ path: path.resolve(__dirname, '.env') });
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  /** Directory containing test files */
  testDir: './tests',

  /** Run tests in files in parallel for faster execution */
  fullyParallel: true,

  /** 
   * Fail the build on CI if test.only is accidentally left in source code.
   * This prevents incomplete test suites from passing in CI.
   */
  forbidOnly: !!process.env.CI,

  /** 
   * Retry failed tests on CI only.
   * - CI: Retry up to 2 times to handle flaky tests
   * - Local: No retries (0) for faster feedback
   */
  retries: process.env.CI ? 2 : 0,

  /** 
   * Number of parallel workers.
   * - CI: 1 worker (sequential) for stability and resource management
   * - Local: undefined (uses CPU cores) for faster execution
   */
  workers: process.env.CI ? 1 : undefined,

  /** 
   * Test reporter configuration.
   * Uses HTML reporter for detailed, interactive test results.
   * Report can be viewed with: npx playwright show-report
   */
  reporter: 'html',

  /** 
   * Shared settings applied to all projects.
   * Individual projects can override these settings.
   */
  use: {
    /** 
     * Base URL for navigation.
     * Can be overridden with BASE_URL environment variable.
     * Allows using relative paths in tests: await page.goto('/')
     */
    baseURL: process.env.BASE_URL || 'https://www.creai.mx',

    /** 
     * Collect trace on first retry only.
     * Traces are useful for debugging but consume disk space.
     * View traces with: npx playwright show-trace trace.zip
     */
    trace: 'on-first-retry',

    // Note: viewport is NOT set globally to allow each project to define its own
  },

  /** 
   * Project Configurations
   * 
   * Each project represents a different browser/device combination.
   * Tests run on all enabled projects unless filtered with --project flag.
   */
  projects: [
    /**
     * Desktop Chrome (Chromium) - Maximized Window
     * 
     * Configuration:
     * - headless: false - Shows browser window for visual debugging
     * - viewport: null - Uses full window size
     * - launchOptions: Starts browser maximized
     * 
     * Usage: npx playwright test --project=chromium
     */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    },

    // Commented out browsers - Uncomment to enable testing on Firefox and Safari
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /**
     * Mobile Chrome (Pixel 5)
     * 
     * Tests mobile responsiveness using Pixel 5 device emulation.
     * Includes touch support and mobile user agent.
     * 
     * Usage: npx playwright test --project="Mobile Chrome"
     */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        headless: false
      },
    },

    /**
     * iPhone 14 Pro Max
     * 
     * Custom configuration for iPhone 14 testing.
     * 
     * Configuration:
     * - viewport: 430x932 (iPhone 14 Pro Max screen size)
     * - deviceScaleFactor: 3 (Retina display)
     * - isMobile: true
     * - hasTouch: true
     * 
     * Usage: npx playwright test --project="iPhone 14"
     */
    {
      name: 'iPhone 14',
      use: {
        ...devices['iPhone 14 Pro Max'], // Base configuration (user agent, touch, etc.)
        viewport: { width: 430, height: 932 }, // iPhone 14 specific viewport
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        headless: false
      },
    },

    // Commented out mobile Safari - Uncomment to test on iPhone 12
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /**
     * Branded Browsers (Commented Out)
     * 
     * Uncomment to test on actual browser installations:
     * - Microsoft Edge: Requires Edge browser installed
     * - Google Chrome: Requires Chrome browser installed
     * 
     * Note: These use the actual browser binaries, not Chromium.
     */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /**
   * Web Server Configuration (Commented Out)
   * 
   * Uncomment to automatically start a local dev server before tests.
   * Useful for testing local applications.
   * 
   * Example:
   * webServer: {
   *   command: 'npm run start',
   *   url: 'http://localhost:3000',
   *   reuseExistingServer: !process.env.CI,
   * }
   */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

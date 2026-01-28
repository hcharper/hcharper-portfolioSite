/**
 * Selenium E2E Test Setup
 * Configuration and utilities for end-to-end testing
 */

const { Builder, Browser, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Base URL for the application
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

// Timeout for waiting for elements
const DEFAULT_TIMEOUT = 10000;

/**
 * Create a new WebDriver instance
 * @returns {Promise<WebDriver>} - WebDriver instance
 */
const createDriver = async () => {
  const options = new chrome.Options();
  
  // Required flags for WSL/headless environments
  options.addArguments('--headless=new');
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-software-rasterizer');
  options.addArguments('--disable-extensions');
  options.addArguments('--window-size=1920,1080');
  options.addArguments('--remote-debugging-port=9222');

  // Set ChromeDriver path
  const chromedriver = require('chromedriver');
  const service = new chrome.ServiceBuilder(chromedriver.path);

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  return driver;
};

/**
 * Wait for an element to be visible
 * @param {WebDriver} driver - WebDriver instance
 * @param {By} locator - Element locator
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<WebElement>} - The element
 */
const waitForElement = async (driver, locator, timeout = DEFAULT_TIMEOUT) => {
  return driver.wait(until.elementLocated(locator), timeout);
};

/**
 * Wait for an element to be clickable
 * @param {WebDriver} driver - WebDriver instance
 * @param {By} locator - Element locator
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<WebElement>} - The element
 */
const waitForClickable = async (driver, locator, timeout = DEFAULT_TIMEOUT) => {
  const element = await waitForElement(driver, locator, timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await driver.wait(until.elementIsEnabled(element), timeout);
  return element;
};

/**
 * Clear localStorage
 * @param {WebDriver} driver - WebDriver instance
 */
const clearLocalStorage = async (driver) => {
  await driver.executeScript('localStorage.clear();');
};

/**
 * Set localStorage item
 * @param {WebDriver} driver - WebDriver instance
 * @param {string} key - Storage key
 * @param {any} value - Storage value
 */
const setLocalStorage = async (driver, key, value) => {
  const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
  await driver.executeScript(`localStorage.setItem('${key}', '${serializedValue}');`);
};

/**
 * Take a screenshot
 * @param {WebDriver} driver - WebDriver instance
 * @param {string} name - Screenshot name
 */
const takeScreenshot = async (driver, name) => {
  const fs = require('fs');
  const path = require('path');
  
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  const screenshot = await driver.takeScreenshot();
  const filename = path.join(screenshotsDir, `${name}-${Date.now()}.png`);
  fs.writeFileSync(filename, screenshot, 'base64');
  console.log(`Screenshot saved: ${filename}`);
};

module.exports = {
  BASE_URL,
  DEFAULT_TIMEOUT,
  createDriver,
  waitForElement,
  waitForClickable,
  clearLocalStorage,
  setLocalStorage,
  takeScreenshot,
  By,
  until
};

// Global setup for Jest
beforeAll(() => {
  // Set longer timeout for E2E tests
  jest.setTimeout(60000);
});

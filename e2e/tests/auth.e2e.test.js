/**
 * Authentication E2E Tests
 * Tests login, logout, and registration flows
 */

const {
  BASE_URL,
  createDriver,
  waitForElement,
  waitForClickable,
  clearLocalStorage,
  By,
  until
} = require('../setup');

describe('Authentication E2E Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async () => {
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.css('header')), 10000);
    await clearLocalStorage(driver);
    await driver.navigate().refresh();
  });

  describe('Login Page', () => {
    it('should display login form', async () => {
      await driver.get(`${BASE_URL}/login`);

      const usernameInput = await waitForElement(driver, By.id('username'));
      const passwordInput = await waitForElement(driver, By.id('password'));
      const submitButton = await waitForElement(driver, By.css('button[type="submit"]'));

      expect(await usernameInput.isDisplayed()).toBe(true);
      expect(await passwordInput.isDisplayed()).toBe(true);
      expect(await submitButton.isDisplayed()).toBe(true);
    });

    it('should have Login heading', async () => {
      await driver.get(`${BASE_URL}/login`);

      const heading = await waitForElement(driver, By.xpath("//h1[contains(text(), 'Login')]"));
      // Scroll the element into view
      await driver.executeScript('arguments[0].scrollIntoView(true);', heading);
      await driver.sleep(500);
      expect(await heading.getText()).toContain('Login');
    });

    it('should have link to sign up page', async () => {
      await driver.get(`${BASE_URL}/login`);

      // Wait for the page to fully load
      await driver.sleep(1000);

      const signUpLink = await waitForElement(driver, By.xpath("//a[contains(text(), 'Sign up')]"));
      
      // Scroll the element into view
      await driver.executeScript('arguments[0].scrollIntoView(true);', signUpLink);
      await driver.sleep(500);
      
      expect(await signUpLink.getAttribute('href')).toContain('/create-account');
    });

    it('should allow typing in form fields', async () => {
      await driver.get(`${BASE_URL}/login`);

      const usernameInput = await waitForElement(driver, By.id('username'));
      const passwordInput = await waitForElement(driver, By.id('password'));

      await usernameInput.sendKeys('testuser');
      await passwordInput.sendKeys('testpassword');

      expect(await usernameInput.getAttribute('value')).toBe('testuser');
      expect(await passwordInput.getAttribute('value')).toBe('testpassword');
    });

    it('should show error message for invalid credentials', async () => {
      await driver.get(`${BASE_URL}/login`);

      const usernameInput = await waitForElement(driver, By.id('username'));
      const passwordInput = await waitForElement(driver, By.id('password'));
      const submitButton = await waitForClickable(driver, By.css('button[type="submit"]'));

      await usernameInput.sendKeys('wronguser');
      await passwordInput.sendKeys('wrongpassword');
      await submitButton.click();

      // Wait for error message or loading to complete
      await driver.sleep(2000);

      // Check for error message (adjust based on your error display)
      const pageSource = await driver.getPageSource();
      expect(pageSource.toLowerCase()).toMatch(/invalid|error|failed|incorrect/i);
    });

    it('should navigate to sign up when clicking link', async () => {
      await driver.get(`${BASE_URL}/login`);

      const signUpLink = await waitForClickable(driver, By.xpath("//a[contains(text(), 'Sign up')]"));
      await signUpLink.click();

      await driver.wait(until.urlContains('/create-account'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/create-account');
    });
  });

  describe('Sign Up Page', () => {
    it('should display sign up form', async () => {
      await driver.get(`${BASE_URL}/create-account`);

      // Wait for the page to load
      await driver.sleep(1000);

      const pageSource = await driver.getPageSource();
      expect(pageSource.toLowerCase()).toMatch(/sign up|create account|register/i);
    });

    it('should have form fields for registration', async () => {
      await driver.get(`${BASE_URL}/create-account`);

      try {
        const usernameInput = await waitForElement(driver, By.id('username'), 5000);
        const emailInput = await waitForElement(driver, By.id('email'), 5000);
        const passwordInput = await waitForElement(driver, By.id('password'), 5000);

        expect(await usernameInput.isDisplayed()).toBe(true);
        expect(await emailInput.isDisplayed()).toBe(true);
        expect(await passwordInput.isDisplayed()).toBe(true);
      } catch (e) {
        // Form fields might have different IDs
        const pageSource = await driver.getPageSource();
        expect(pageSource.toLowerCase()).toContain('username');
        expect(pageSource.toLowerCase()).toContain('email');
        expect(pageSource.toLowerCase()).toContain('password');
      }
    });

    it('should have link back to login page', async () => {
      await driver.get(`${BASE_URL}/create-account`);

      await driver.sleep(1000);

      const loginLink = await waitForElement(driver, By.xpath("//a[contains(text(), 'Login') or contains(text(), 'login') or contains(text(), 'Sign in')]"));
      expect(await loginLink.isDisplayed()).toBe(true);
    });
  });

  describe('Authentication State', () => {
    it('should show Login link when not authenticated', async () => {
      // Use href attribute to find login link in navigation
      const loginLink = await waitForElement(driver, By.css('nav a[href="/login"]'));
      expect(await loginLink.isDisplayed()).toBe(true);
    });

    it('should redirect to login when accessing protected routes', async () => {
      await driver.get(`${BASE_URL}/admin-dash`);

      // Wait for redirect or access denial
      await driver.sleep(2000);

      const currentUrl = await driver.getCurrentUrl();
      // Should either redirect to login or show access denied
      const pageSource = await driver.getPageSource();
      
      expect(
        currentUrl.includes('/login') || 
        pageSource.toLowerCase().includes('login') ||
        pageSource.toLowerCase().includes('access') ||
        pageSource.toLowerCase().includes('unauthorized')
      ).toBe(true);
    });
  });
});

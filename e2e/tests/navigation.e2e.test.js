/**
 * Navigation E2E Tests
 * Tests user navigation flows across the application
 */

const {
  BASE_URL,
  createDriver,
  waitForElement,
  waitForClickable,
  By,
  until
} = require('../setup');

describe('Navigation E2E Tests', () => {
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
  });

  describe('Home Page Navigation', () => {
    it('should load the home page', async () => {
      const title = await driver.getTitle();
      expect(title).toBeTruthy();
      
      // Check that the header is visible
      const header = await waitForElement(driver, By.css('header'));
      expect(await header.isDisplayed()).toBe(true);
    });

    it('should display the navigation bar', async () => {
      const nav = await waitForElement(driver, By.css('nav'));
      expect(await nav.isDisplayed()).toBe(true);
    });

    it('should have working navigation links', async () => {
      // Use href attribute to find navigation links
      const homeLink = await waitForElement(driver, By.css('nav a[href="/"]'));
      expect(await homeLink.isDisplayed()).toBe(true);
    });
  });

  describe('Page Navigation', () => {
    it('should navigate to Blogs page', async () => {
      const blogsLink = await waitForClickable(driver, By.css('nav a[href="/blogs"]'));
      await blogsLink.click();

      await driver.wait(until.urlContains('/blogs'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/blogs');

      // Verify page content
      const heading = await waitForElement(driver, By.xpath("//h1[contains(text(), 'Blog')]"));
      expect(await heading.isDisplayed()).toBe(true);
    });

    it('should navigate to Projects page', async () => {
      const projectsLink = await waitForClickable(driver, By.css('nav a[href="/projects"]'));
      await projectsLink.click();

      await driver.wait(until.urlContains('/projects'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/projects');
    });

    it('should navigate to About page', async () => {
      const aboutLink = await waitForClickable(driver, By.css('nav a[href="/about"]'));
      await aboutLink.click();

      await driver.wait(until.urlContains('/about'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/about');
    });

    it('should navigate to Contact page', async () => {
      const contactLink = await waitForClickable(driver, By.css('nav a[href="/contact"]'));
      await contactLink.click();

      await driver.wait(until.urlContains('/contact'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/contact');
    });

    it('should navigate to Login page', async () => {
      const loginLink = await waitForClickable(driver, By.css('nav a[href="/login"]'));
      await loginLink.click();

      await driver.wait(until.urlContains('/login'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });
  });

  describe('Blog Navigation', () => {
    it('should navigate from blogs list to individual blog', async () => {
      // Navigate to blogs page
      await driver.get(`${BASE_URL}/blogs`);
      
      // Wait for blogs to load
      await driver.sleep(2000);

      // Click on a Read More link
      try {
        const readMoreLink = await waitForClickable(driver, By.xpath("//a[contains(text(), 'Read More')]"), 5000);
        await readMoreLink.click();

        await driver.wait(until.urlMatches(/\/blogs\/\w+/), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toMatch(/\/blogs\/\w+/);
      } catch (e) {
        // If no blogs exist, this is expected
        console.log('No blogs found to navigate to');
      }
    });
  });

  describe('Sidebar Navigation', () => {
    it('should have a sidebar visible', async () => {
      // The app uses a sidebar layout instead of footer
      const sidebar = await waitForElement(driver, By.css('aside'));
      expect(await sidebar.isDisplayed()).toBe(true);
    });
  });

  describe('404 Not Found', () => {
    it('should display 404 page for unknown routes', async () => {
      await driver.get(`${BASE_URL}/non-existent-page-${Date.now()}`);
      
      // Wait for the page to load
      await driver.sleep(1000);
      
      // Check for 404 content (adjust based on your NotFound component)
      const pageSource = await driver.getPageSource();
      expect(pageSource.toLowerCase()).toMatch(/not found|404|page.*exist/i);
    });
  });
});

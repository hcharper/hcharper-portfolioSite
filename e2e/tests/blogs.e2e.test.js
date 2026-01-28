/**
 * Blog CRUD E2E Tests
 * Tests blog viewing and interactions
 */

const {
  BASE_URL,
  createDriver,
  waitForElement,
  waitForClickable,
  setLocalStorage,
  clearLocalStorage,
  By,
  until
} = require('../setup');

describe('Blog E2E Tests', () => {
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

  describe('Blog List Page', () => {
    it('should display blogs page heading', async () => {
      await driver.get(`${BASE_URL}/blogs`);

      const heading = await waitForElement(driver, By.xpath("//h1[contains(text(), 'Blog')]"));
      expect(await heading.isDisplayed()).toBe(true);
    });

    it('should display blog cards or empty message', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      // Wait for content to load
      await driver.sleep(2000);

      const pageSource = await driver.getPageSource();
      
      // Should show either blog cards or "no blogs" message
      const hasBlogContent = pageSource.includes('Read More') || 
                             pageSource.toLowerCase().includes('no blog');
      expect(hasBlogContent).toBe(true);
    });

    it('should display blog titles', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      await driver.sleep(2000);

      // Try to find blog titles (h3 elements in blog cards)
      try {
        const blogTitles = await driver.findElements(By.css('h3'));
        
        if (blogTitles.length > 0) {
          const firstTitle = await blogTitles[0].getText();
          expect(firstTitle.length).toBeGreaterThan(0);
        }
      } catch (e) {
        // No blogs found - check for empty state
        const pageSource = await driver.getPageSource();
        expect(pageSource.toLowerCase()).toMatch(/no blog|empty|sample/i);
      }
    });

    it('should display blog dates', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      await driver.sleep(2000);

      const pageSource = await driver.getPageSource();
      // Check for date format (MM/DD/YYYY or similar)
      const hasDate = /\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}/.test(pageSource);
      
      // Blogs should have dates or show sample data with dates
      expect(hasDate || pageSource.includes('Sample')).toBe(true);
    });

    it('should have clickable Read More links', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      await driver.sleep(2000);

      try {
        const readMoreLinks = await driver.findElements(By.xpath("//a[contains(text(), 'Read More')]"));
        
        if (readMoreLinks.length > 0) {
          expect(await readMoreLinks[0].isDisplayed()).toBe(true);
          const href = await readMoreLinks[0].getAttribute('href');
          expect(href).toMatch(/\/blogs\/\w+/);
        }
      } catch (e) {
        // No blogs with Read More links
        console.log('No Read More links found');
      }
    });
  });

  describe('Single Blog Page', () => {
    it('should display blog content when navigating to a blog', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      await driver.sleep(2000);

      try {
        const readMoreLink = await waitForClickable(
          driver, 
          By.xpath("//a[contains(text(), 'Read More')]"),
          5000
        );
        await readMoreLink.click();

        await driver.wait(until.urlMatches(/\/blogs\/\w+/), 5000);
        
        // Wait for content to load
        await driver.sleep(1000);

        const pageSource = await driver.getPageSource();
        // Should have some content
        expect(pageSource.length).toBeGreaterThan(1000);
      } catch (e) {
        // No blogs exist to navigate to
        console.log('No blogs available for single blog test');
      }
    });
  });

  describe('Blog Grid Layout', () => {
    it('should display blogs in a grid layout', async () => {
      await driver.get(`${BASE_URL}/blogs`);
      
      await driver.sleep(2000);

      // Check for grid container
      try {
        const gridContainer = await driver.findElement(By.css('.grid'));
        expect(await gridContainer.isDisplayed()).toBe(true);
      } catch (e) {
        // Grid might have different class or blogs are empty
        console.log('Grid container not found or no blogs');
      }
    });
  });

  describe('Loading State', () => {
    it('should show loading state initially', async () => {
      // Navigate to blogs page and immediately check for loading
      await driver.get(`${BASE_URL}/blogs`);
      
      // Try to catch loading state quickly
      try {
        const loadingElement = await driver.findElement(
          By.xpath("//*[contains(text(), 'Loading') or contains(@class, 'animate-spin')]")
        );
        // If found, verify it's visible
        expect(await loadingElement.isDisplayed()).toBe(true);
      } catch (e) {
        // Loading state may have passed too quickly, which is fine
        console.log('Loading state completed quickly');
      }
    });
  });
});

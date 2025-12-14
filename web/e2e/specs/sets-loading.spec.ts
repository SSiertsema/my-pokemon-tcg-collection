import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Pokemon Sets Loading', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display the page correctly on initial load', async () => {
    await expect(homePage.pageTitle).toHaveText(
      'Welcome to Pokemon Collection App'
    );
    await expect(homePage.loadSetsButton).toBeVisible();
    await expect(homePage.loadSetsButton).toBeEnabled();
    await expect(homePage.loadSetsButton).toHaveText('Load Sets');
  });

  test('should show loading state when button is clicked', async () => {
    await homePage.clickLoadSets();

    await expect(homePage.loadSetsButton).toHaveText('Loading...');
    await expect(homePage.loadSetsButton).toBeDisabled();
  });

  test('should load and display Pokemon sets from API', async () => {
    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    const setCount = await homePage.getSetCount();
    expect(setCount).toBeGreaterThan(0);
    expect(setCount).toBeLessThanOrEqual(12);
  });

  test('should display set card with correct content structure', async () => {
    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    const firstSetDetails = await homePage.getSetCardDetails(0);

    expect(firstSetDetails.hasLogo).toBe(true);
    expect(firstSetDetails.name).toBeTruthy();
    expect(firstSetDetails.series).toBeTruthy();
    expect(firstSetDetails.cardCount).toMatch(/\d+ cards/);
  });

  test('should limit displayed sets to maximum of 12', async () => {
    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    const setCount = await homePage.getSetCount();
    expect(setCount).toBeLessThanOrEqual(12);
  });

  test('should re-enable button after loading completes', async () => {
    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    await expect(homePage.loadSetsButton).toBeEnabled();
    await expect(homePage.loadSetsButton).toHaveText('Load Sets');
  });

  test('should display multiple sets with unique data', async () => {
    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    const setCount = await homePage.getSetCount();
    if (setCount >= 2) {
      const firstSet = await homePage.getSetCardDetails(0);
      const secondSet = await homePage.getSetCardDetails(1);

      expect(firstSet.name).not.toBe(secondSet.name);
    }
  });
});

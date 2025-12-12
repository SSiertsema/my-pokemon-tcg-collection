import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Error Handling', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should not display error initially', async () => {
    await expect(homePage.errorMessage).not.toBeVisible();
  });

  test('should display error message on network failure', async ({ page }) => {
    await page.route('**/api.pokemontcg.io/**', (route) => route.abort());

    await homePage.clickLoadSets();

    await expect(homePage.errorMessage).toBeVisible({ timeout: 15000 });
    await expect(homePage.errorMessage).toContainText('Error:');
  });

  test('should clear error on successful retry', async ({ page }) => {
    await page.route('**/api.pokemontcg.io/**', (route) => route.abort());
    await homePage.clickLoadSets();
    await expect(homePage.errorMessage).toBeVisible({ timeout: 15000 });

    await page.unroute('**/api.pokemontcg.io/**');

    await homePage.clickLoadSets();
    await homePage.waitForSetsToLoad();

    await expect(homePage.errorMessage).not.toBeVisible();
  });
});

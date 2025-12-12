import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly loadSetsButton: Locator;
  readonly errorMessage: Locator;
  readonly setsGrid: Locator;
  readonly setCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1');
    this.loadSetsButton = page.getByRole('button', { name: /Load Sets|Loading/ });
    this.errorMessage = page.locator('.error');
    this.setsGrid = page.locator('.sets-grid');
    this.setCards = page.locator('.set-card');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickLoadSets() {
    await this.loadSetsButton.click();
  }

  async waitForSetsToLoad() {
    await expect(this.setsGrid).toBeVisible({ timeout: 60000 });
  }

  async isLoading(): Promise<boolean> {
    const buttonText = await this.loadSetsButton.textContent();
    return buttonText?.includes('Loading') ?? false;
  }

  async getSetCount(): Promise<number> {
    return await this.setCards.count();
  }

  async getSetCardDetails(index: number) {
    const card = this.setCards.nth(index);
    return {
      name: await card.locator('h3').textContent(),
      series: await card.locator('p').first().textContent(),
      cardCount: await card.locator('.set-info').textContent(),
      hasLogo: await card.locator('.set-logo').isVisible(),
    };
  }
}

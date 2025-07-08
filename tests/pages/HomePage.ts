import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async gotoLogin() {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(this.page).toHaveURL(/login/);
  }

  async verifyScreenshot() {
    await expect(this.page).toHaveScreenshot('01-homepage.png', {
      mask: [
        this.page.locator('#slider-carousel'),
        this.page.locator('iframe'),
      ],
      maxDiffPixelRatio: 0.01,
    });
  }
}

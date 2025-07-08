import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async fillSignup(user: any) {
    await this.page.getByPlaceholder('Name').fill(user.name);
    await this.page.getByPlaceholder('Email Address').nth(1).fill(user.email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
    await expect(this.page).toHaveURL(/signup/);
  }

  async verifyScreenshot() {
    await expect(this.page).toHaveScreenshot('02-login.png', {
      maxDiffPixelRatio: 0.01,
    });
  }
}

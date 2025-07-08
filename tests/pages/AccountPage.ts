import { Page, expect } from '@playwright/test';

export class AccountPage {
  constructor(private page: Page) {}

  async verifyAccountCreated() {
    await expect(this.page).toHaveScreenshot('05-account-created.png', {
      maxDiffPixelRatio: 0.01,
    });
    await expect(this.page.getByText('Account Created!')).toBeVisible();
    await this.page.click('a:has-text("Continue")');
  }

  async verifyLoggedInAs(name: string) {
    const text = await this.page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
    expect(text).toContain(name);

    await expect(this.page).toHaveScreenshot('06-logged-in.png', {
      mask: [
        this.page.locator('#slider-carousel'),
        this.page.locator('iframe'),
      ],
      maxDiffPixelRatio: 0.01,
    });
  }
  async deleteAccount() {
    await this.page.click('a:has-text("Delete Account")');
    await expect(this.page).toHaveURL(/delete_account/);
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();

    await expect(this.page).toHaveScreenshot('07-account-deleted.png', {
        maxDiffPixelRatio: 0.01,
    });

    await this.page.click('a:has-text("Continue")');
    }
}

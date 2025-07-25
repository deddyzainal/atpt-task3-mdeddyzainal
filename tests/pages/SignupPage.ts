import { Page, expect } from '@playwright/test';
import { SharedController } from '../shared/shared.controller';

export class SignupPage {
  constructor(private page: Page) {}

  async fillAccountDetails(user: any) {
    const shareController = new SharedController(this.page);

    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.fill('#password', user.password);
    await this.page.selectOption('#days', '10');
    await this.page.selectOption('#months', '5');
    await this.page.selectOption('#years', '1995');
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();
    await this.page.fill('#first_name', user.firstName);
    await this.page.fill('#last_name', user.lastName);
    await this.page.fill('#address1', user.address);
    await this.page.selectOption('#country', user.country);
    await this.page.fill('#state', user.state);
    await this.page.fill('#city', user.city);
    await this.page.fill('#zipcode', user.zipcode);
    await this.page.fill('#mobile_number', user.mobile);
  }

  async submitAccountForm() {
    await this.page.click('button:has-text("Create Account")');
    await expect(this.page).toHaveURL(/account_created/);
  }
}

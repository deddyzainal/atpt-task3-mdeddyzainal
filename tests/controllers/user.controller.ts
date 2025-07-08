import { Page, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';

export class UserController {
  private page: Page;
  private homePage: HomePage;
  private loginPage: LoginPage;
  private signupPage: SignupPage;
  private accountPage: AccountPage;

  private userData = {
    name: 'Test User',
    email: `user${Date.now()}@example.com`,
    password: 'Test@1234',
    firstName: 'Test',
    lastName: 'User',
    address: 'Jl Automation 123',
    country: 'India',
    state: 'TestState',
    city: 'TestCity',
    zipcode: '12345',
    mobile: '08123456789',
  };

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.signupPage = new SignupPage(page);
    this.accountPage = new AccountPage(page);
  }

  async gotoHomePage() {
    await this.homePage.navigate();
  }

  async gotoLoginPage() {
    await this.homePage.gotoLogin();
  }

  async fillSignupForm() {
    await this.loginPage.fillSignup(this.userData);  
}

  async fillAccountDetailsAndSubmit() {
    await this.signupPage.fillAccountDetails(this.userData);
    await this.signupPage.submitAccountForm();
  }

  async verifyAccountCreation() {
    await this.accountPage.verifyAccountCreated();
    await this.accountPage.verifyLoggedInAs(this.userData.name.split(' ')[0]);
  }

  async deleteAccount() {
    await this.accountPage.deleteAccount();
  }
}

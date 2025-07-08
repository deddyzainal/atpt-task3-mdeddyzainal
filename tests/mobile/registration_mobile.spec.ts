import { test, expect, devices } from '@playwright/test';
import { UserController } from '../controllers/user.controller';

test.use({ ...devices['Galaxy Tab S4'] });

test.describe.serial('User Registration Flow', () => {
  let userController: UserController;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    userController = new UserController(page);
    await userController.gotoHomePage();
  });

  test('1. Go to Signup/Login', async () => {
    await userController.gotoLoginPage();
  });

  test('2. Fill Signup Form with Unique Email', async () => {
    await userController.fillSignupForm();
  });

  test('3. Fill Account Info and Create Account', async () => {
    await userController.fillAccountDetailsAndSubmit();
  });

  test('4. Verify Account Creation and Logged-in User', async () => {
    await userController.verifyAccountCreation();
  });
});

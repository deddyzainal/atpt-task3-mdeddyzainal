import { test, devices, type Locator } from '@playwright/test';
import { UserController } from '../controllers/user.controller';
import { SharedController } from '../shared/shared.controller';

test.use({ ...devices['Galaxy Tab S4'] });

test.describe.serial('User Registration Flow', () => {
  let userController: UserController;
  let shareController: SharedController;
  let maskLocators: Locator[]; 

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    userController = new UserController(page);
    shareController = new SharedController(page);

    maskLocators = [
      page.locator('#slider-carousel'),
      page.locator('iframe')
    ];

    await userController.gotoHomePage();
    await shareController.visualRegression('01-homepage.png', maskLocators);
  });

  test('1. Go to Signup/Login', async () => {
    await userController.gotoLoginPage();
    await shareController.visualRegression('02-login.png');
  });

  test('2. Fill Signup Form with Unique Email', async () => {
    await userController.fillSignupForm();
    await shareController.visualRegression('03-signup-form.png');
  });

  test('3. Fill Account Info and Create Account', async () => {
    await userController.fillAccountDetailsAndSubmit();
    await shareController.visualRegression('04-before-create-account.png');
  });

  test('4. Verify Account Creation and Logged-in User', async () => {
    await shareController.visualRegression('05-account-created.png');
    await userController.verifyAccountCreation();
    await shareController.visualRegression('06-logged-in.png', maskLocators);
  });
});

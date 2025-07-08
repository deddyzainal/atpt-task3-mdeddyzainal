import { test, devices } from '@playwright/test';
import { UserController } from '../controllers/user.controller';
import { SharedController } from '../shared/shared.controller';

test.use({ ...devices['Galaxy Tab S4'] });

test.describe.serial('User Deletion Flow', () => {
  let userController: UserController;
  let shareController: SharedController;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    userController = new UserController(page);
    shareController = new SharedController(page);
    await userController.gotoHomePage();
    await userController.gotoLoginPage();
    await userController.fillSignupForm();
    await userController.fillAccountDetailsAndSubmit();
    await userController.verifyAccountCreation();
  });

  test('Delete the newly created account', async () => {
    await userController.deleteAccount();
    await shareController.visualRegression('01-account-deleted.png');
  });
});

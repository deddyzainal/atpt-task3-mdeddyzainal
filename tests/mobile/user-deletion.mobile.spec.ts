import { test, devices } from '@playwright/test';
import { UserController } from '../controllers/user.controller';

test.use({ ...devices['Galaxy Tab S4'] });

test.describe.serial('User Deletion Flow', () => {
  let userController: UserController;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    userController = new UserController(page);
    await userController.gotoHomePage();
    await userController.gotoLoginPage();
    await userController.fillSignupForm();
    await userController.fillAccountDetailsAndSubmit();
    await userController.verifyAccountCreation();
  });

  test('Delete the newly created account', async () => {
    await userController.deleteAccount();
  });
});

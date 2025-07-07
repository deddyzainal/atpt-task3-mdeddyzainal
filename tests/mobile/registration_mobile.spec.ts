import { test, expect, devices, Page } from '@playwright/test';

let page: Page;

test.use({ ...devices['Galaxy Tab S4'] });

const userData = {
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

const homepageMask = (page) => [
  page.locator('#slider-carousel'),
  page.locator('iframe'),
];

test.describe.serial('User Registration Flow', () => {
    test.beforeAll(async ({ browser }) => {
        const contex = await browser.newContext();
        page = await contex.newPage();
        await page.goto('https://automationexercise.com/');
        await expect(page).toHaveTitle(/Automation Exercise/);
        
        await expect(page).toHaveScreenshot('01-homepage.png', {
            mask: homepageMask(page),
            maxDiffPixelRatio: 0.01,
        });
  });

    test('1. Go to Signup/Login', async () => {
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page).toHaveURL(/login/);
        
        await expect(page).toHaveScreenshot('02-login.png', {
            maxDiffPixelRatio: 0.01,
        });
    });

    test('2. Fill Signup Form with Unique Email', async () => {
        await page.getByPlaceholder('Name').fill(userData.name);
        await page.getByPlaceholder('Email Address').nth(1).fill(userData.email);
        await page.getByRole('button', { name: 'Signup' }).click();

        await expect(page).toHaveURL(/signup/);

        await expect(page).toHaveScreenshot('03-signup-form.png', {
            maxDiffPixelRatio: 0.01,
        });
    });

    test('3. Fill Account Info and Create Account', async () => {
        await page.getByRole('radio', { name: 'Mr.' }).check();
        await page.fill('#password', userData.password);
        await page.selectOption('#days', '10');
        await page.selectOption('#months', '5');
        await page.selectOption('#years', '1995');

        await page.locator('#newsletter').check();
        await page.locator('#optin').check();

        await page.fill('#first_name', userData.firstName);
        await page.fill('#last_name', userData.lastName);
        await page.fill('#address1', userData.address);
        await page.selectOption('#country', userData.country);
        await page.fill('#state', userData.state);
        await page.fill('#city', userData.city);
        await page.fill('#zipcode', userData.zipcode);
        await page.fill('#mobile_number', userData.mobile);

        await expect(page).toHaveScreenshot('04-before-create-account.png', {
            maxDiffPixelRatio: 0.01,
        });
        
        await page.click('button:has-text("Create Account")');
        await expect(page).toHaveURL(/account_created/);
    });

    test('4. Verify Account Creation and Logged-in User', async () => {
        await expect(page).toHaveScreenshot('05-account-created.png', {
            maxDiffPixelRatio: 0.01,
        });

        await expect(page.getByText('Account Created!')).toBeVisible();

        await page.click('a:has-text("Continue")');
        const loggedInText = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(loggedInText).toContain(userData.name.split(' ')[0]);
        
        await expect(page).toHaveScreenshot('06-logged-in.png', {
            mask: homepageMask(page),
            maxDiffPixelRatio: 0.01,
        });
    });
});
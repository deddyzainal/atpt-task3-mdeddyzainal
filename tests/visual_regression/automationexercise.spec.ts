import test, { expect } from "@playwright/test";

test.describe('Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/');
    })

    test('Take snapshot', async ({ page }) => {
        expect(await page.screenshot()).toMatchSnapshot('take_snapshot.png');
    })
    
    test('Take screenshot', async ({ page }) => {
        expect(page).toHaveScreenshot('take_screenshot.png',{
            mask: [
                page.locator('//div[@id="slider-carousel"]'),
            ]
        });
    })
})
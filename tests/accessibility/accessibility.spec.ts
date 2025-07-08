import { expect, test } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import { SharedController } from '../shared/shared.controller'

let shareController: SharedController;

test.describe('Accessibility test', () => {
    test.beforeEach(async ({ page }) => {
        shareController = new SharedController(page);
        await page.goto('https://automationexercise.com/')
    })
    
    test('Check accessibility entire page', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page }).analyze()

        expect(results.violations).toEqual([]);
        await shareController.accessibilityErrorCheck(results, testInfo);
    })

    test('Check accessibility with tags', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

        expect(results.violations).toEqual([]);
        await shareController.accessibilityErrorCheck(results, testInfo);
    })
})

import { expect, test } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('Accessibility test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationexercise.com/')
    })
    
    test('Check accessibility entire page', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page }).analyze()

        expect(results.violations).toEqual([]);

        await testInfo.attach('accessibility report', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json'
        })
    })

    test('Check accessibility with tags', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

        expect(results.violations).toEqual([]);
    })
    
    
})

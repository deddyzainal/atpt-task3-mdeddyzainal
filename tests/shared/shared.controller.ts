import { Page } from "playwright";
import { expect, Locator, TestInfo } from "playwright/test";
import { AxeResults } from 'axe-core'

export class SharedController {
    constructor(private page: Page) {}

    async visualRegression(fileName: string, mask?: Locator[]): Promise<void> {
        const screenshotOptions = {
            maxDiffPixelRatio: 0.02,
            ...(mask ? { mask } : {})
        };

        expect(await this.page.screenshot(screenshotOptions)).toMatchSnapshot(fileName);
    }

    async attachAccessibilityReport(testInfo: TestInfo, results: AxeResults) {
        await testInfo.attach('accessibility report', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json'
        });
    }
}

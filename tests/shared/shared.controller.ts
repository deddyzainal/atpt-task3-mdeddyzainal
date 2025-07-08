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

    async accessibilityErrorCheck(results: AxeResults, testInfo?: TestInfo): Promise<void> {

        if (results.violations.length > 0) {
            console.log(`🔴 ${results.violations.length} accessibility violations found:`);
        
            results.violations.forEach((violation, index) => {
              console.log(`\n${index + 1}. ❌ ${violation.id} - ${violation.description}`);
              console.log(`   Help: ${violation.help}`);
              console.log(`   Impact: ${violation.impact}\n`);
        
              violation.nodes.forEach((node, i) => {
                console.log(`   [Node ${i + 1}] Target: ${node.target.join(', ')}`);
                console.log(`   Failure Summary: ${node.failureSummary}\n`);
              });
            });
          } else {
            console.log('✅ No accessibility violations found.');
          }

          if (testInfo) {
            await testInfo.attach('accessibility-report', {
              body: JSON.stringify(results, null, 2),
              contentType: 'application/json',
            });
          }
    }
}

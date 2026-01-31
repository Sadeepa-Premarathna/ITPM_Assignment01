const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

// Load Excel Data
const excelPath = path.resolve(__dirname, '../ITPM_A01 New.xlsx');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

test.describe('SwiftTranslator Excel Automation', () => {
    test.describe.configure({ mode: 'parallel' });

    // Run all Data
    const debugData = data;

    for (const row of debugData) {
        const tcId = row['TC ID'];
        const inputDerived = row['Input'];
        const expectedOutput = row['Expected output'];

        if (!tcId || !inputDerived) continue;

        test(`Test Case ${tcId} (#${data.indexOf(row) + 1})`, async ({ page }) => {
            test.setTimeout(60000);
            console.log(`Running ${tcId} (#${data.indexOf(row) + 1}): Input="${inputDerived}"`);

            try {
                await page.goto('https://www.swifttranslator.com/');

                // Debug: print title
                console.log('Page Title:', await page.title());

                const inputSelector = 'textarea[placeholder*="Input Your Singlish Text"]';
                await page.waitForSelector(inputSelector, { timeout: 10000 });
                await page.fill(inputSelector, inputDerived.toString());

                // Try clicking the button
                const btnSelector = 'button:has-text("Translate")';
                // Check if button exists
                if (await page.locator(btnSelector).count() > 0) {
                    await page.click(btnSelector);
                } else {
                    console.log('Translate button not found by text, trying generic .btn');
                    // Fallback or just wait, maybe it's auto-translate?
                    // Some singlish wrappers are real-time.
                    // Let's assume real-time if button missing.
                }

                await page.waitForTimeout(5000); // Wait for processing

                const content = await page.content();
                // Screenshot for verification
                await page.screenshot({ path: `tests/results/${tcId}.png` });

                if (expectedOutput) {
                    const found = content.includes(expectedOutput);
                    console.log(`Expected: "${expectedOutput}" - Found: ${found}`);
                    expect(content).toContain(expectedOutput);
                } else {
                    console.log('No expected output provided.');
                }

            } catch (error) {
                console.error(`Failed ${tcId}:`, error);
                await page.screenshot({ path: `tests/results/${tcId}_error.png` });
                throw error;
            }
        });
    }
});

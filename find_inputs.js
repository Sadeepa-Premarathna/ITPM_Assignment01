const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.swifttranslator.com/');

    const textareas = await page.$$('textarea');
    console.log('--- TEXTAREAS ---');
    for (const [i, el] of textareas.entries()) {
        const id = await el.getAttribute('id');
        const placeholder = await el.getAttribute('placeholder');
        console.log(`Index ${i}: id="${id}" placeholder="${placeholder}"`);
    }
    console.log('--- END TEXTAREAS ---');

    // Also check for contenteditable divs just in case
    const divs = await page.$$('div[contenteditable="true"]');
    for (const [i, el] of divs.entries()) {
        console.log(`ContentEditable Div ${i}: class="${await el.getAttribute('class')}"`);
    }

    await browser.close();
})();

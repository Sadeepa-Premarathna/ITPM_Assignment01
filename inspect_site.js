const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to https://www.swifttranslator.com/...');
    await page.goto('https://www.swifttranslator.com/');

    console.log('Page Title:', await page.title());

    // Find textareas
    const textareas = await page.$$('textarea');
    console.log(`\nFound ${textareas.length} textareas:`);
    for (const [i, el] of textareas.entries()) {
        const id = await el.getAttribute('id');
        const name = await el.getAttribute('name');
        const placeholder = await el.getAttribute('placeholder');
        const cls = await el.getAttribute('class');
        console.log(`  ${i}: id="${id}", name="${name}", placeholder="${placeholder}", class="${cls}"`);
    }

    // Find buttons
    const buttons = await page.$$('button');
    console.log(`\nFound ${buttons.length} buttons:`);
    for (const [i, el] of buttons.entries()) {
        const text = await el.textContent();
        const id = await el.getAttribute('id');
        const cls = await el.getAttribute('class');
        // Only print if text suggests translation
        if (text && (text.toLowerCase().includes('translate') || text.toLowerCase().includes('convert') || i < 5)) {
            console.log(`  ${i}: Text="${text.trim()}", id="${id}", class="${cls}"`);
        }
    }

    await browser.close();
})();

import {test, expect, chromium} from '@playwright/test';

test('navigate', async () =>{
    test.setTimeout(6000000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});
    await page.waitForTimeout(35000);
    await context.storageState({ path: 'auth.json' });
    await browser.close();    
});

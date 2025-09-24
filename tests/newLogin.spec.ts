//To get around single sign on for other tests, this case is used to generate an auth (cookie) file called auth.json.
//If other cases are blocked because a sign-on is required, run this case and sign in manually with the browser. Wait til the window closes and the cookies will be saved in ~/auth.json.

import {test, expect, chromium} from '@playwright/test';

test('navigate', async () =>{
    test.setTimeout(6000000); //Need to manually set timeout to give enough time to manually log in
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});
    await page.waitForTimeout(35000); //35 seconds to enter email, password, and do 2FA

    await context.storageState({ path: 'auth.json' }); //Save cookies to auth.json
    await browser.close();    
});

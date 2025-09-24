import {test, expect, chromium} from '@playwright/test'
//TC C5759
test('navigate', async () =>{
    test.setTimeout(6000000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({storageState: 'auth.json'});

    const page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});
    await page.waitForTimeout(1000);

    await page.getByRole('heading', { name: '2025-0325_271195' }).click();
    await page.waitForTimeout(15000);
    await page.getByText('Slot 2').first().click();
    await page.waitForTimeout(1000);
    await page.getByText('SAVE UP TO  $130 ').click();
    await page.waitForTimeout(1000);
    const numBox = page.getByRole('textbox');
    await numBox.click();
    await numBox.fill('200');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Save' }).click();
    const element = page.locator('[data-cy="heroSaveStory-value-2"]');
    await expect(element).toContainText("SAVE UP TO  $200 ");


    await page.waitForTimeout(10000); 
});

test.afterAll('Restore original state', async ()=>{
    test.setTimeout(70000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({storageState: 'auth.json'});

    const page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});
    await page.waitForTimeout(1000);

    await page.getByRole('heading', { name: '2025-0325_271195' }).click();
    await page.waitForTimeout(15000);
    await page.getByText('Slot 2').first().click();
    await page.waitForTimeout(1000);
    await page.getByText('SAVE UP TO  $200 ').click();
    await page.waitForTimeout(1000);
    const numBox = page.getByRole('textbox');
    await numBox.click();
    await numBox.fill('130');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Save' }).click();
    const element = page.locator('[data-cy="heroSaveStory-value-2"]');
    await expect(element).toContainText("SAVE UP TO  $130 ");
    await browser.close();


});
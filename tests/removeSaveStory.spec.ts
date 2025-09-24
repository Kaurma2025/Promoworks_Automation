import {test, expect, chromium} from '@playwright/test';
//TC C5760
test ('navigate', async () => {
    test.setTimeout(70000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({storageState: 'auth.json'});
    const page = await context.newPage();

    await page.goto('https://qaflyerworksui.azurewebsites.net/',{waitUntil: 'networkidle'});

    await page.getByRole('heading', { name: '2025-0325_271195' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Slot 2').first().click();
    const cell = page.getByRole('table').first().getByRole('table').first().getByRole('row').getByRole('cell').nth(6);
    //await page.getByRole('cell', { name: '1 76-5136-8 - 15 x 13´' });
    await cell.click();
    await page.waitForTimeout(2000);
    
    await page.getByRole('table').first().getByRole('table').first().getByRole('row').getByRole('cell').nth(6).locator('div[role="combobox"][aria-haspopup="listbox"]').click();
    await page.waitForTimeout(2000);
    await page.getByText('No save story').click();
    await page.waitForTimeout(4000);

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(cell).toHaveText('-');
});

test.afterAll('Restore original state', async ()=>{
    test.setTimeout(70000);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({storageState: 'auth.json'});

    const page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});
    await page.waitForTimeout(1000);

    await page.getByRole('heading', { name: '2025-0325_271195' }).click();
    await page.getByText('Slot 2').first().click();
    const cell = page.getByRole('table').first().getByRole('table').first().getByRole('row').getByRole('cell').nth(6);
    await cell.click();

    await page.getByRole('table').first().getByRole('table').first().getByRole('row').getByRole('cell').nth(6).locator('div[role="combobox"][aria-haspopup="listbox"]').click();
    await page.waitForTimeout(2000);
    await page.getByText('Save [$]').click();
    const numBox = page.getByRole('textbox');
    await numBox.click();
    await numBox.fill('130');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Save' }).click();
    const element = page.locator('[data-cy="heroSaveStory-value-2"]');
    await expect(element).toContainText("SAVE UP TO  $130 ");
    await page.waitForTimeout(1000);
    await browser.close();


});
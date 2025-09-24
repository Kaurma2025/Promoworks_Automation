//Simulates C5759 - Update save slot story
import {test, expect, chromium, type Browser, type Page, type BrowserContext} from '@playwright/test'

let browser : Browser;
let page: Page;
let context: BrowserContext;

//test2

test.describe('Change and reset value', ()=>{
    test('navigate', async () =>{
    //test.setTimeout(6000000); 

    //Launch new Chrome browser with cookies from auth.json
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({storageState: 'auth.json'});

    //Navigate to PromoBuilder QA
    page = await context.newPage();
    await page.goto("https://qaflyerworksui.azurewebsites.net/",{waitUntil: 'networkidle'});


    await page.getByRole('heading', { name: '2025-0325_271195' }).click(); //Click on deal D0325
    await page.waitForLoadState('networkidle'); //Wait for all the $h!t to load
    await page.getByText('Slot 2').first().click(); //Click on slot 2
    await page.waitForTimeout(1000);

    //Replace $130 save with $200
    const row = page.locator('tr').locator('[data-cy="group-row-76-5136-8"]');
    const saveStory = row.locator('[data-cy="save-story-value"]');
    await saveStory.getByText('SAVE UP TO $130').first().click();
    await page.waitForTimeout(1000);
    const numBox = page.getByRole('textbox');
    await numBox.click();
    await numBox.fill('200');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Save' }).click();

    //Confirm the text now displays $200
    const element = page.locator('[data-cy="heroSaveStory-value-2"]');
    await expect(element).toContainText("SAVE UP TO  $200 ");


    //await page.waitForTimeout(10000); //10 sec wait at the end for debug purposes only
});

    test.afterEach('Restore original state', async ()=>{
        //await page.getByRole('heading', { name: '2025-0325_271195' }).click();

        //Cleanup section for consistency : slot 2 item 1 should always return to save story "Save up to $130"
        const row = page.locator('tr').locator('[data-cy="group-row-76-5136-8"]');
        const saveStory = row.locator('[data-cy="save-story-value"]');
        await saveStory.getByText('SAVE UP TO $200').first().click();
        //await page.locator('div.MuiStack-root.css-43ziog').getByText('SAVE UP TO  $200 ').click();
        await page.waitForTimeout(1000);
        const numBox = page.getByRole('textbox');
        await numBox.click();
        await numBox.fill('130');
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(saveStory).toContainText("SAVE UP TO  $130 ");
        await browser.close();

    });
});


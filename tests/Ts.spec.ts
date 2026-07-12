import{test, expect} from '@playwright/test'
test('test_01_first_trial', async ({page}) => 
{
    await page.goto('https://www.youtube.com/');
    await page.locator('a[id="endpoint"]').getByText('Home', { exact: true }).first().click();
})


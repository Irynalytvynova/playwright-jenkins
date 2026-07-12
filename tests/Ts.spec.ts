import{test, expect} from '@playwright/test'
test('test_01_first_trial', async ({page}) => 
{
    await page.goto('https://www.youtube.com/');
    await page.locator('a[id="endpoint"]').getByText('e', { exact: true }).first().click();
})


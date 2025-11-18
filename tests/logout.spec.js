const { test, expect } = require('@playwright/test');

test.describe('Logout Tests', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('https://librarika.com/users/login');
        await page.fill('input[id="UserUsername"]', "shakyash12@gmail.com");
        await page.fill('input[id="UserPassword"]', "shrEy@9823");
        await page.click('input[type="submit"]');
        await expect(page).toHaveURL("https://librarika.com/users/myLibraries");
        await expect(
          page.locator("text=Access all the libraries you have participated in")
        ).toBeVisible();
    });

    test('successful logout', async ({ page }) => {
        await page.click('a[data-toggle="dropdown"]');
        await page.click('a[href="/users/logout"]');
        await expect(page).toHaveURL('https://librarika.com/');
        await expect(page.locator("text=Create Library")).toBeVisible();
    });
});
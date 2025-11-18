const { test, expect } = require("@playwright/test");

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://librarika.com/users/login");
  });

  test("successful login with valid credentials", async ({ page }) => {
    await page.fill('input[id="UserUsername"]', "shakyash12@gmail.com");
    await page.fill('input[id="UserPassword"]', "shrEy@9823");
    await page.click('input[type="submit"]');
    await expect(page).toHaveURL("https://librarika.com/users/myLibraries");
    await expect(
      page.locator("text=Access all the libraries you have participated in")
    ).toBeVisible();
  });

  test("validation errors for empty fields", async ({ page }) => {
    await page.fill('input[id="UserUsername"]', "shakyash12@gmail.com");
    await page.click('input[type="submit"]');
    await expect(
      page.locator("text=Invalid username or password, try again.")
    ).toBeVisible();
  });

  test("failed login with invalid credentials", async ({ page }) => {
    await page.fill('input[id="UserUsername"]', "shreya@gmail.com");
    await page.fill('input[id="UserPassword"]', "wrongpassword");
    await page.click('input[type="submit"]');
    await expect(page.locator(".error-message")).toBeVisible();
    await expect(page.locator(".error-message")).toContainText(
      "Invalid username or password, try again."
    );
  });

  test("show error for invalid email format", async ({ page }) => {
    await page.fill('input[id="UserUsername"]', "shakyash");
    await page.fill('input[id="UserPassword"]', "somepassword");
    await page.click('input[type="submit"]');
    await expect(
      page.locator("text=Invalid username or password, try again.")
    ).toBeVisible();
  });
});

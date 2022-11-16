import { test, expect } from "@playwright/test"

// Useful debugging tool: await page.waitForTimeout(10000)

test("signs up the user using the form", async ({ page }) => {
  await page.route("**/api/user", (route) => {
    route.fulfill({
      body: JSON.stringify({ success: "HAHA!" }),
    })
  })

  await page.goto("http://localhost:3000/")

  await page.getByLabel("email").fill("foo@bar.baz")

  await page.screenshot({
    path: "./results/signup-form.png",
    fullPage: true,
  })

  await page.getByRole("button", { name: "Zarejestruj się" }).click()

  await expect(page.getByTestId("success-message")).toHaveText("HAHA!")
  await page
    .getByTestId("success-message")
    .screenshot({ path: "./results/haha.png" })
})

test("displays custom error message", async ({ page }) => {
  await page.route("**/api/user", (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: "Mocked error message" }),
    })
  })

  await page.goto("http://localhost:3000/")

  await page.getByRole("button", { name: "Zarejestruj się" }).click()

  await expect(page.getByTestId("error-message")).toHaveText(
    "Mocked error message"
  )
})

test("displays email validation error", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  await page.getByLabel("email").fill("invalid@email")
  await page.getByRole("button", { name: "Zarejestruj się" }).click()

  await expect(page.getByTestId("error-message")).toHaveText(
    "Nieprawidłowy adres email"
  )
})

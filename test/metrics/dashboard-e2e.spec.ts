import { test, expect } from "@playwright/test";

test("Display day orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("20", { exact: true })).toBeVisible();
  expect(page.getByText("-5% em relação a ontem")).toBeVisible();
});

test("Display month orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("200")).toBeVisible();
  expect(page.getByText("+16% em relação ao mês passado")).toBeVisible();
});

test("Display month canceled orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("5", { exact: true })).toBeVisible();
  expect(page.getByText("-10% em relação ao mês passado")).toBeVisible();
});

test("Display month revenue orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("R$ 100,00")).toBeVisible();
  expect(page.getByText("+10% em relação ao mês passado")).toBeVisible();
});

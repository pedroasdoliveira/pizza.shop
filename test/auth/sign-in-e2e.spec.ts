import { test, expect } from "@playwright/test";

test("Sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByLabel("Seu e-mail").fill("johndoe@example.com");
  await page.getByRole("button", { name: "Acessar Painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autentificação para seu e-mail...",
  );

  expect(toast).toBeVisible();

  await page.waitForTimeout(1200);
});

test("Sign in with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByLabel("Seu e-mail").fill("abcde@example");
  await page.getByRole("button", { name: "Acessar Painel" }).click();

  const toast = page.getByText("Credenciais inválidas");

  await expect(toast).toBeVisible();

  await page.waitForTimeout(1200);
});

test("Navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByRole("link", { name: "Novo estabelecimento" }).click();

  expect(page.url()).toContain("/sign-up");
});

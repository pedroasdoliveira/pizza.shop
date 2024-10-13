import { test, expect } from "@playwright/test";

test("Sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByLabel("Nome do estabelecimento").fill("Pizza Shop");
  await page.getByLabel("Nome do gerente").fill("Pedro Oliveira");
  await page.getByLabel("Seu e-mail").fill("pedro@gmail.com");
  await page.getByLabel("Telefone / Celular").fill("(11) 99484-5248");

  await page.getByRole("button", { name: "Fazer Cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso!");

  await expect(toast).toBeVisible();
});

test("Sign up with wrong credentials", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByLabel("Nome do estabelecimento").fill("__");
  await page.getByLabel("Nome do gerente").fill("Pedro Oliveira");
  await page.getByLabel("Seu e-mail").fill("pedro@gmail.com");
  await page.getByLabel("Telefone / Celular").fill("(11) 99484-5248");

  await page.getByRole("button", { name: "Fazer Cadastro" }).click();

  const toast = page.getByText("Error ao cadastrar restaurante.");

  await expect(toast).toBeVisible();
});

test("Navigate to new login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Vai para url escolhida e espera todas as requisições da página carregarem

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});

import { test, expect } from "@playwright/test";

test("List orders", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Pedidos" }).click();

  // Aguarda qualquer tipo de requisição sendo feita após um evento
  await page.waitForLoadState("networkidle");

  expect(page.getByRole("heading", { name: "Pedidos" })).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});

test("Paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();

  // Next page
  await page.getByRole("button", { name: "Próxima página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 20", exact: true }),
  ).toBeVisible();

  // Last page
  await page.getByRole("button", { name: "Última página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 51", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 60", exact: true }),
  ).toBeVisible();

  // Previous page
  await page.getByRole("button", { name: "Página anterior" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 41", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 50", exact: true }),
  ).toBeVisible();

  // First page
  await page.getByRole("button", { name: "Primeira página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});

test("Filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("ID do pedido").fill("order-11");

  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  expect(page.getByRole("cell", { name: "order-11" })).toBeVisible();
});

test("Filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Nome do cliente").fill("Customer 20");

  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  expect(page.getByRole("cell", { name: "Customer 20" })).toBeVisible();
});

test("Filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByLabel("Pendente").click();

  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  expect(page.locator("td:nth-child(4)").first()).toBeVisible();

  // Buscar todas as células com a regra (role) descrita
  const tableRows = await page.getByRole("cell", { name: "Pendente" }).all();

  expect(tableRows).toHaveLength(10);
});

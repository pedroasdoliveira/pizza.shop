import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "../Pagination";

const onPageChangeCallback = vi.fn(); // spie function

describe("Pagination component", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear(); // Limpar a chamada de cada spie após um teste ser executado
  });

  it("should display right amount of pages and results", () => {
    const { getByText, debug } = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //debug();

    expect(getByText("Página 1 de 20")).toBeInTheDocument();
    expect(getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    const user = userEvent.setup();

    const { getByText, debug, getByRole } = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //debug();

    const nextPageButton = getByRole("button", {
      name: "Próxima página",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate to the previous page", async () => {
    const user = userEvent.setup();

    const { getByText, debug, getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //debug();

    const nextPageButton = getByRole("button", {
      name: "Página anterior",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("should be able to navigate to the first page", async () => {
    const user = userEvent.setup();

    const { getByText, debug, getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //debug();

    const nextPageButton = getByRole("button", {
      name: "Primeira página",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("should be able to navigate to the last page", async () => {
    const user = userEvent.setup();

    const { getByText, debug, getByRole } = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //debug();

    const nextPageButton = getByRole("button", {
      name: "Última página",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});

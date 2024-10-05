import { render } from "@testing-library/react";
import OrderStatus from "../order-status";

describe("Order status", () => {
  it("should display the right text when order status is Pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    //wrapper.debug();

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    //console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text when order status is Canceled", () => {
    const wrapper = render(<OrderStatus status="canceled" />);

    //wrapper.debug();

    const statusText = wrapper.getByText("Cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    //console.log(badgeElement.outerHTML);

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should display the right text when order status is Delivering", () => {
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText("Em Entrega");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-sky-500");
  });

  it("should display the right text when order status is Processing", () => {
    const wrapper = render(<OrderStatus status="processing" />);

    const statusText = wrapper.getByText("Em Preparo");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });

  it("should display the right text when order status is Delivered", () => {
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});

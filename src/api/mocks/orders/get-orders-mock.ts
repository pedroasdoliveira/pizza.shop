import { http, HttpResponse } from "msw";

import type { IGetOrdersResponse } from "@/api/orders/get-orders";

type Orders = IGetOrdersResponse["orders"];
type OrderStatus = IGetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "canceled",
  "delivered",
  "delivering",
  "pending",
  "processing",
];

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % 5],
  };
});

export const getOrdersMock = http.get<never, never, IGetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get("pageIndex")
      ? Number(searchParams.get("pageIndex"))
      : 0;

    const customererName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    let filteredOrders = orders;

    if (customererName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customererName),
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  },
);

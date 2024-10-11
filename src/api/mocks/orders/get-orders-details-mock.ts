import {
  IGetOrderDetailsResponse,
  IGetOrderDetailsParams,
} from "@/api/orders/get-order-details";
import { http, HttpResponse } from "msw";

export const getOrdersDetailsMock = http.get<
  IGetOrderDetailsParams,
  never,
  IGetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "84454645454",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: {
          name: "Pizza Pepperoni",
        },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 1300,
        product: {
          name: "Pizza Portuguesa",
        },
        quantity: 2,
      },
    ],
    totalInCents: 3600,
  });
});

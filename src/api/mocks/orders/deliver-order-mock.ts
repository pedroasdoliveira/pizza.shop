import { IDeliverOrderParams } from "@/api/orders/deliver-order";
import { http, HttpResponse } from "msw";

export const deliverOrderMock = http.patch<IDeliverOrderParams, never, never>(
  "/orders/:orderId/deliver",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);

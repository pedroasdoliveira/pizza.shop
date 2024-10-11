import { IDispatchOrderParams } from "@/api/orders/dispatch-order";
import { http, HttpResponse } from "msw";

export const dispatchOrderMock = http.patch<IDispatchOrderParams, never, never>(
  "/orders/:orderId/dispatch",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);

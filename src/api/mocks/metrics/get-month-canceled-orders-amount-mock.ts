import { http, HttpResponse } from "msw";
import { IGetMonthCanceledOrdersAmountResponse } from "@/api/metrics/get-month-canceled-orders-amount";

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -10,
  });
});

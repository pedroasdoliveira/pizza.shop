import { http, HttpResponse } from "msw";
import { IGetMonthOrdersAmountResponse } from "@/api/metrics/get-month-orders-amount";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 16,
  });
});

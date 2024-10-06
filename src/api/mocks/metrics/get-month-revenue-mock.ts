import { http, HttpResponse } from "msw";
import { IGetMonthRevenueResponse } from "@/api/metrics/get-month-revenue";

export const getMonthRevenueMock = http.get<
  never,
  never,
  IGetMonthRevenueResponse
>("/metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 10000,
    diffFromLastMonth: 10,
  });
});

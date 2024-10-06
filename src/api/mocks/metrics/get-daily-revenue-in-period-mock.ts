import { http, HttpResponse } from "msw";
import {
  IGetDailyRevenueInPeriodQuery,
  GetDailyRevenueInPeriodResponse,
} from "@/api/metrics/get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    {
      date: "01/01/2024",
      receipt: 2000,
    },
    {
      date: "02/01/2024",
      receipt: 1000,
    },
    {
      date: "03/01/2024",
      receipt: 4000,
    },
    {
      date: "04/01/2024",
      receipt: 2500,
    },
    {
      date: "05/01/2024",
      receipt: 980,
    },
    {
      date: "06/01/2024",
      receipt: 5000,
    },
    {
      date: "07/01/2024",
      receipt: 1600,
    },
  ]);
});

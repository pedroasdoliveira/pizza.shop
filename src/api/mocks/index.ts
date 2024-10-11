import { env } from "@/env";
import { setupWorker } from "msw/browser";

import { signInMock } from "./auth/sign-in-mock";
import { registerRestaurantMock } from "./auth/register-restaurant-mock";
import { getDayOrdersAmountMock } from "./metrics/get-day-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./metrics/get-month-orders-amount-mock";
import { getMonthCanceledOrdersAmountMock } from "./metrics/get-month-canceled-orders-amount-mock";
import { getMonthRevenueMock } from "./metrics/get-month-revenue-mock";
import { getDailyRevenueInPeriodMock } from "./metrics/get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./metrics/get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./orders/get-orders-mock";
import { getOrdersDetailsMock } from "./orders/get-orders-details-mock";

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrdersDetailsMock,
);

export const enableMsw = async () => {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
};

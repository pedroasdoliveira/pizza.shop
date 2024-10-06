import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "./auth/sign-in-mock";
import { registerRestaurantMock } from "./auth/register-restaurant-mock";

export const worker = setupWorker(signInMock, registerRestaurantMock);

export const enableMsw = async () => {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
};

import { http, HttpResponse } from "msw";
import { IGetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  IGetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-restaurant-id",
    name: "Pizza Shop",
    managerId: "custom-user-id",
    description: "Custom restaurant",
    createdAt: new Date(),
    updatedAt: null,
  });
});

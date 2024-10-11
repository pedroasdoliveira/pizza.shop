import { http, HttpResponse } from "msw";
import { IGetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, IGetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "John Doe",
      email: "jdoe@example.com",
      phone: "454851166656",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);

import NotFoundPage from "@/pages/404";
import AppLayout from "@/pages/_layouts/app";
import AuthLayout from "@/pages/_layouts/auth";
import Dashboard from "@/pages/app/dashboard/Dashboard";
import Orders from "@/pages/app/orders/orders";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router-dom";

export enum Paths {
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  ORDERS = "/orders",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: `${Paths.ORDERS}`,
        element: <Orders />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: `${Paths.SIGN_IN}`,
        element: <SignIn />,
      },
      {
        path: `${Paths.SIGN_UP}`,
        element: <SignUp />,
      },
    ],
  },
]);

import AppLayout from "@/pages/_layouts/app";
import AuthLayout from "@/pages/_layouts/auth";
import Dashboard from "@/pages/app/Dashboard";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router-dom";

export enum Paths {
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  ORDERS = '/orders'
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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

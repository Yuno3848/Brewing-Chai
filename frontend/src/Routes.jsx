import React from "react";
import { createBrowserRouter } from "react-router";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import CheckMailPage from "./pages/CheckMailPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  //public routes
  { path: "/signin", element: <SigninPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password/:token", element: <ResetPasswordPage /> },
  { path: "/verify-email/:token", element: <VerifyPage /> },
  { path: "/check-email", element: <CheckMailPage /> },
]);

export default Routes;

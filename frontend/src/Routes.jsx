import React from "react";
import { createBrowserRouter } from "react-router";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth//ResetPasswordPage";
import VerifyPage from "./pages/auth/VerifyPage";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import CheckMailPage from "./pages/auth/CheckMailPage";
import PublicRoute from "./components/routes/PublicRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";

const Routes = createBrowserRouter([
 {
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: (
        <PublicRoute>
          <HomePage />
        </PublicRoute>
      ),
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

  //wrapped public route

  {path:"/profile", element:<ProfilePage/>}
]);

export default Routes;

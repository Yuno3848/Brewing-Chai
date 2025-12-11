import React from "react";
import { createBrowserRouter } from "react-router";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth//ResetPasswordPage";
import VerifyPage from "./pages/auth/VerifyPage";
import Layout from "./components/layout/Layout";
import CheckMailPage from "./pages/auth/CheckMailPage";
import PublicRoute from "./components/routes/PublicRoute";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import EditAvatarPage from "./pages/profile/EditAvatarPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AccountSecurityPage from "./pages/profile/AccountPrivacyPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import DeleteAccountPage from "./pages/profile/DeleteAccountPage";
import NotificationPage from "./pages/profile/NotificationPage";
import ProfileLayout from "./features/profiles/component/ProfileLayout";
import PublicProfilePage from "./pages/profile/PublicProfilePage";
import InstructorLayout from "./features/instructor/component/InstructorLayout";
import InstructorProfilePage from "./pages/Instructor/InstructorProfilePage";
import ApplyForInstructorPage from "./pages/Instructor/ApplyForInstructorPage";

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
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "edit-avatar",
            element: <EditAvatarPage />,
          },
          {
            path: "account-security",
            element: <AccountSecurityPage />,
          },
          {
            path: "delete-account",
            element: <DeleteAccountPage />,
          },
          {
            path: "notification",
            element: <NotificationPage />,
          },
        ],
      },
      {
        path: "public-profile",
        element: (
          <ProtectedRoute>
            <PublicProfilePage />
          </ProtectedRoute>
        ),
      },

      {
        path: "instructor",
        element: (
          <ProtectedRoute>
            <InstructorLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <InstructorProfilePage />,
          },
          {
            path: "apply-for-instructor",
            element: <ApplyForInstructorPage />,
          },
        
        ],
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
]);

export default Routes;

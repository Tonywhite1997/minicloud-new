import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./layouts/Dashboard";
import Database from "./pages/dashboard/Database";
import Profile from "./pages/dashboard/Profile";
import SharedFiles from "./pages/dashboard/SharedFiles";
import ChangePassword from "./pages/dashboard/auth/ChangePassword";
import DeleteAccount from "./pages/dashboard/auth/DeleteAccount";
import Folder from "./pages/dashboard/folder/Folder";
import ShareFile from "./layouts/shareFiles/ShareFile";
import SharedFile from "./layouts/shareFiles/SharedFile";
import BorrowedFiles from "./layouts/shareFiles/BorrowedFiles";
import VerifyEmail from "./layouts/dashboard/VerifyEmail";
import Header from "./components/Header";
import ResetPassword from "./pages/ResetPassword";

export const baseURL = "http://localhost:3000/api";

const queryClient = new QueryClient();
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "auth/register", element: <SignUp /> },
      { path: "auth/forgot", element: <ForgotPassword /> },
      { path: "auth/reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Database /> },
      { path: "database", element: <Database /> },
      { path: "profile", element: <Profile /> },
      { path: "shared-files", element: <SharedFiles /> },
      { path: "shared-files/:id", element: <SharedFile /> },
      { path: "shared-files/borrowed/:id", element: <BorrowedFiles /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "delete-account", element: <DeleteAccount /> },
      { path: "folder/:id", element: <Folder /> },
      { path: "file/share-file/:id", element: <ShareFile /> },
    ],
  },
  {
    path: "/verify-email",
    element: (
      <div>
        <Header />
        <VerifyEmail />
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import { Suspense } from "react";
import { LoginPage, NewPage, RegisterPage } from "./pages";
import LoadingPage from "../pages/LoadingPage";
import ProtectedRoute from "../components/ProtectedRoute";

const route = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingPage />}>
              <NewPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/*",
    element: <h1>Not Foun Page</h1>,
  },
]);

export default route;

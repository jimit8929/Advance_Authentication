import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//PAGES
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmailPage from "./Pages/EmailVerificationPage";
import Verify from "./Pages/Verify";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Home />,
      </ProtectedRoute>
    ),
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },

  {
    path: "/verify",
    element: <VerifyEmailPage />,
  },

  {
    path: "/verify/:token",
    element: <Verify />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

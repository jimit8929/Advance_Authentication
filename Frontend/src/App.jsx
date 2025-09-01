import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//PAGES
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmailPage from "./Pages/EmailVerificationPage";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import ChangePassword from "./Pages/ChangePassword";


//COMPONENTS
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import AuthSuccess from "./Pages/AuthSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />,
      </>
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

  {
    path : "/auth-success",
    element : <AuthSuccess/>
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/verify-otp/:email",
    element: <VerifyOtp />,
  },

  {
    path:"/change-password/:email",
    element: <ChangePassword/>
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

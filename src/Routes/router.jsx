import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Membership from "../Pages/Membership/Membership";
import PostDeatil from "../Shared/PostDeatil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "membership",
        element: <Membership />,
      },
      {
        path: "post/:id",
        element: <PostDeatil />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseUrl}/posts/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <div> Dashboard Is commitn soon </div>,
  },
]);

export default router;

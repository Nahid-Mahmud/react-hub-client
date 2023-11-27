import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Membership from "../Pages/Membership/Membership";
import PostDeatil from "../Shared/PostDeatil";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/DashboardPages/MyProfile/MyProfile";
import AddPosts from "../Pages/DashboardPages/AddPosts/AddPosts";
import MyPosts from "../Pages/DashboardPages/MyPosts/MyPosts";
import AdminProfile from "../Pages/DashboardPages/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/DashboardPages/ManageUsers/ManageUsers";
import ReportedComments from "../Pages/DashboardPages/ReportedComments/ReportedComments";
import MakeAnnouncement from "../Pages/DashboardPages/MakeSnnouncement/MakeAnnouncement";
import PostRelatedCommentDashboard from "../Pages/DashboardPages/MyPosts/PostRelatedCommentDashboard";
import AdminRoute from "../PrivateRoute/AdminRoute";

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
    element: <DashboardLayout />,
    children: [
      // normal user routes
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "addpost",
        element: <AddPosts />,
      },
      {
        path: "myposts",
        element: <MyPosts />,
      },
      {
        element: <PostRelatedCommentDashboard />,
        path: `post/dashboard/:id`,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseUrl}/posts/${params.id}`),
      },
      // admin routes
      {
        path: "adminprofile",
        element: <AdminProfile />,
      },
      {
        path: "manageusers",
        element: <ManageUsers />,
      },
      {
        path: "reportedcomments",
        element: (
          <AdminRoute>
            <ReportedComments />
          </AdminRoute>
        ),
      },
      {
        path: "makeannouncement",
        element: <MakeAnnouncement />,
      },
    ],
  },
]);

export default router;

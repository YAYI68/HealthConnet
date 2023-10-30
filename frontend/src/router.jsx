import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./components/Layout/MainLayout";
import SettingPage from "./pages/SettingPage";
import HistoryPage from "./pages/HistoryPage";
import Notification from "./pages/Notification";
import OverviewPage from "./pages/OverviewPage";
import { BookingPage } from "./components/BooKAppointment";
import BookAppointment from "./pages/BookAppointment";
import PersistLogin from "./components/Layout/PersistLogin";
import ProtectedRoute from "./components/RouteGuard/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import AllAppointments from "./pages/AllAppointments";
import VerifyEmail from "./pages/VerifyEmail";
import CompleteProfile from "./pages/CompleteProfile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

export const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          {
            path: "blog",
            children: [
              { path: "", element: <BlogList /> },
              {
                path: ":id",
                element: <BlogDetail />,
              },
            ],
          },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "appointment", element: <BookAppointment /> },
              { path: "appointment/:slug", element: <BookingPage /> },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Register />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },
      {
        path: "/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/complete/profile",
        element: <CompleteProfile />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              { path: "overview", element: <OverviewPage /> },
              { path: "setting", element: <SettingPage /> },
              { path: "appointment", element: <AllAppointments /> },
              { path: "history", element: <HistoryPage /> },
              { path: "notification", element: <Notification /> },
              { path: "profile", element: <Profile /> },
              { path: "profile/edit", element: <EditProfile /> },
            ],
          },
        ],
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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

export const router = createBrowserRouter([
  {
    element:<PersistLogin />,
    children:[
      { 
        path:'/',
        element:<MainLayout />,
        children: [
          { path: "", element: <Home /> },
          {
            path: "login",
            element: <Register />,
          },
          {
            path:'blog',
            children:[
              {path:'',element:<BlogList />,},
              {
                path:':id',element:<BlogDetail />,
              }
            ]
          },
          {
            path: "sign-up",
            element: <Register />,
          },
          { element:<ProtectedRoute/>,
           children:[
            
           { path:'appointment',element: <BookAppointment />},
           {path:'appointment/:slug',element: <BookingPage />}
          ]
         },
         
         ],
        },
      { element: <ProtectedRoute />,
       children:[
          { 
          path: "/dashboard", element:<DashboardLayout /> ,
          children: [
          { path: "overview", element: <OverviewPage />},  
          { path: "setting", element:<SettingPage /> },
          {path:'appointment',element:<AllAppointments/>},
          { path: "history", element:<HistoryPage /> },
          { path: "notification", element:<Notification /> },
          { path: "profile", element:<Profile />},
          { path:'profile/edit', element:<EditProfile />},
          
          ]
         },
      ]
      },

     
    ]
  },
  
]);

import { Fragment, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import DashboardLayout from "../Layout/DashboardLayout";

function ProtectedRoute({role}) {
  const { accessToken,user } = useAuthContext()
  const { pathname } = useLocation()

  const authUser = !!accessToken

  return (
    authUser?
       <Outlet /> 
       : <Navigate to={`/login`} replace state={{path:pathname}}  />   
  );
}

export default ProtectedRoute
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_Auth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && ["/auth/login", "/auth/register"].includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Check_Auth;

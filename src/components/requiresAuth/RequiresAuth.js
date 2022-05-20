import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "components";

const RequiresAuth = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequiresAuth };

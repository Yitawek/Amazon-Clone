import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../dataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useContext(DataContext);

  if (!user) {
    return <Navigate to="/Auth" state={{ msg, redirect }} replace />;
  }

  return children;
}

export default ProtectedRoute;

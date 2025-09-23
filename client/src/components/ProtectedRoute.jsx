// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const storedRole = localStorage.getItem("role");

  if (!storedRole) {
    // Not logged in or no role found — redirect to login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(storedRole)) {
    // Logged in but role is not allowed — redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // Role is allowed — render child components
  return children;
};

export default ProtectedRoute;

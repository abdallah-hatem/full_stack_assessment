import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../services/cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authToken = getCookie("auth_token");

  // If no auth token, redirect to signin
  if (!authToken) {
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute; 
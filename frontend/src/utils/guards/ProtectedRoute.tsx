import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../services/cookies";
import { GET_USER } from "../../apis";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = () => {
      const authToken = getCookie("auth_token");

      // If no token exists, redirect immediately
      if (!authToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Validate token with backend
      GET_USER({ skipErrorMessage: true })
        .then((response) => {
          if (response.success) {
            setIsAuthenticated(true);
          } else {
            // Invalid token
            removeCookie("auth_token");
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          // Token validation failed (401, 403, etc.)
          console.log("Token validation failed:", error);
          removeCookie("auth_token");
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    validateToken();
  }, []);

  // Show loading while validating token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;

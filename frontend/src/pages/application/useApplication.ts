import { useNavigate } from "react-router-dom";

export const useApplication = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data here
    console.log("Logging out...");
    // Navigate back to sign in page
    navigate("/signin");
  };

  return {
    handleLogout,
  };
}; 
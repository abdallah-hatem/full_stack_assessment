import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../services/cookies";
import { toast } from "react-toastify";

export const useApplication = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored authentication data
    removeCookie("auth_token");

    // Navigate back to sign in page
    navigate("/signin");

    toast.success("Logged out successfully");
  };

  return {
    handleLogout,
  };
};

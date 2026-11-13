
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import authService from "../services/authService";

function LogoutButton({ className = "logout-button" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleLogout}
    >
      <span aria-hidden="true">↪</span>
      Logout
    </button>
  );
}

export default LogoutButton;

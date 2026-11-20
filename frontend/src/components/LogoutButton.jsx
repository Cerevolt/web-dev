import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

// Shared logout control. AuthContext owns the single server logout call and
// all local session cleanup; this component only triggers it and navigates.
function LogoutButton({
  className = "logout-button",
  iconClassName = "",
  icon = "⇥",
  label = "Logout",
  busyLabel = "Signing out...",
  style,
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <span className={iconClassName} aria-hidden="true">
        {icon}
      </span>
      <span>{isLoggingOut ? busyLabel : label}</span>
    </button>
  );
}

export default LogoutButton;

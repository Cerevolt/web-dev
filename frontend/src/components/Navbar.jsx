import React from "react";
import "./Navbar.css";

const Navbar = ({
  title = "Dashboard",
  subtitle = "",
  userName = "User",
  role = "",
}) => {
  const initial = userName.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="app-navbar">
      <div className="navbar-heading">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="navbar-profile">
        <div className="navbar-user-details">
          <span className="navbar-user-name">{userName}</span>
          {role && <span className="navbar-user-role">{role}</span>}
        </div>

        <div className="navbar-avatar" aria-label={`${userName} profile`}>
          {initial}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
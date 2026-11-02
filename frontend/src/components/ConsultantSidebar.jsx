
import React from "react";
import { NavLink } from "react-router-dom";
import "./ConsultantSidebar.css";

function ConsultantSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/consultant/dashboard", icon: "▦" },
    { name: "Assessments", path: "/consultant/assessment", icon: "▤" },
    { name: "Content Addition", path: "/consultant/content-addition", icon: "✚" },
    { name: "Progress Reports", path: "/consultant/progress-report", icon: "▥" },
  ];

  return (
    <aside className="consultant-sidebar">
      <div className="consultant-sidebar-brand">
        <div className="consultant-brand-title">
          <span className="consultant-brand-icon">C</span>
          <h2>Cerevolt</h2>
        </div>
        <span>Consultant Portal</span>
      </div>

      <div className="consultant-sidebar-menu">
        <p className="consultant-menu-heading">MENU</p>

        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `consultant-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="consultant-nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="consultant-sidebar-footer">
        <div className="consultant-user-avatar">C</div>
        <div>
          <h4>Consultant</h4>
          <p>Professional Account</p>
        </div>
      </div>
    </aside>
  );
}

export default ConsultantSidebar;

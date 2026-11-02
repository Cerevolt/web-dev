
import React from "react";
import { NavLink } from "react-router-dom";
import "./ParentSidebar.css";

const parentLinks = [
  { to: "/parent/dashboard", icon: "▦", label: "Dashboard" },
  { to: "/parent/progress", icon: "▤", label: "Child Progress" },
  { to: "/parent/doctor-support", icon: "✚", label: "Doctor Support" },
  { to: "/parent/feedback", icon: "✉", label: "Feedback" },
  { to: "/parent/assistant", icon: "◉", label: "Parent Assistant" },
];

function ParentSidebar() {
  return (
    <aside className="parent-sidebar">
      <div className="parent-sidebar-brand">
        <div className="parent-brand-icon">Cerevolt</div>
        <span>Parent Portal</span>
      </div>

      <nav className="parent-sidebar-nav">
        <span className="parent-nav-heading">MENU</span>

        {parentLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `parent-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="parent-nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="parent-sidebar-bottom">
        <div className="parent-sidebar-message">
          <span>♡</span>
          <p>Every small step in your child's journey matters.</p>
        </div>

        <div className="parent-sidebar-footer">
          <span>© 2026 Cerevolt</span>
        </div>
      </div>
    </aside>
  );
}

export default ParentSidebar;

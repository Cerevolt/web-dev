import React from "react";
import { NavLink } from "react-router-dom";
import "./SchoolSidebar.css";

const schoolLinks = [
  { label: "Dashboard", path: "/school/dashboard", icon: "⌂" },
  { label: "Assessments", path: "/school/assessment", icon: "▤" },
  { label: "Content Addition", path: "/school/content-addition", icon: "＋" },
  { label: "Student Progress", path: "/school/student-progress", icon: "▥" },
  { label: "Behaviour Monitoring", path: "/school/behaviour-monitoring", icon: "◉" },
];

function SchoolSidebar() {
  return (
    <aside className="school-sidebar">
      <div className="school-sidebar-brand">
        <div className="school-brand-title">
          <span className="school-brand-icon">C</span>
          <h2>Cerevolt</h2>
        </div>
        <span className="school-brand-subtitle">School Portal</span>
      </div>

      <nav className="school-sidebar-nav">
        <p className="school-sidebar-label">MENU</p>

        {schoolLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/school/dashboard"}
            className={({ isActive }) =>
              `school-sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="school-sidebar-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="school-sidebar-profile">
        <div className="school-profile-avatar">S</div>
        <div className="school-profile-details">
          <strong>School Admin</strong>
          <span>School Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default SchoolSidebar;
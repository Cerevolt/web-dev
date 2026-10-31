
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const getLinkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">C</div>
        <span>Cerevolt</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={getLinkClass}>
            <span>▦</span>
            Dashboard
          </NavLink>

          <NavLink to="/admin/add-doctor" className={getLinkClass}>
            <span>♙</span>
            Add Doctor
          </NavLink>

          <NavLink to="/admin/reports" className={getLinkClass}>
            <span>▤</span>
            Reports & Analytics
          </NavLink>

          <NavLink to="/admin/manage-content" className={getLinkClass}>
            <span>▣</span>
            Content Management
          </NavLink>

          <NavLink to="/admin/manage-games" className={getLinkClass}>
            <span>◈</span>
            Game Management
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink to="/admin/settings" className={getLinkClass}>
          <span>⚙</span>
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

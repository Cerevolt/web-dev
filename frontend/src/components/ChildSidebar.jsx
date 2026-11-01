
import React from "react";
import { NavLink } from "react-router-dom";
import "./ChildSidebar.css";
import ChildPlantMascot from "./ChildPlantMascot";

const ChildSidebar = () => {
  const links = [
    { to: "/child/dashboard", icon: "🏡", label: "My Home" },
    { to: "/child/goals", icon: "🎯", label: "Daily Goals" },
    { to: "/child/games", icon: "🎮", label: "Play Games" },
    { to: "/child/flashcards", icon: "🃏", label: "Flashcards" },
    { to: "/child/videos", icon: "🎬", label: "Watch & Learn" },
    { to: "/child/rewards", icon: "🏆", label: "My Rewards" },
    { to: "/child/assessments", icon: "📝", label: "Solve Assessments" },
  ];

  return (
    <aside className="child-sidebar">
      <div className="child-sidebar-brand">
        <span className="child-brand-icon">🌈</span>
        <span>Cerevolt</span>
      </div>

      <div className="child-sidebar-welcome">
        <span>✨</span>
        <p>Let's learn and play!</p>
      </div>

      <nav className="child-sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/child/dashboard"}
            className={({ isActive }) =>
              `child-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="child-nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <ChildPlantMascot />
      <div className="child-sidebar-footer">
        <span>🌟</span>
        <p>Every little step counts!</p>
      </div>
    </aside>
  );
};

export default ChildSidebar;

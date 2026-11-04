import React from "react";
import "./Dashboardcard.css";

const Dashboardcard = ({
  title,
  value,
  subtitle,
  icon,
  color = "#172b4d",
}) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <span className="dashboard-card-title">{title}</span>

        {icon && (
          <span className="dashboard-card-icon" style={{ color }}>
            {icon}
          </span>
        )}
      </div>

      <div className="dashboard-card-value">{value}</div>

      {subtitle && (
        <p className="dashboard-card-subtitle">{subtitle}</p>
      )}
    </div>
  );
};

export default Dashboardcard;
import React from "react";
import "./PerformanceColourScale.css";

const PerformanceColourScale = ({ score }) => {
  const value = Number(score);

  let status = "Not available";
  let colorClass = "performance-neutral";

  if (score !== null && score !== undefined && score !== "" && Number.isFinite(value)) {
    if (value >= 80 && value <= 100) {
      status = "Good";
      colorClass = "performance-good";
    } else if (value >= 60 && value < 80) {
      status = "Needs improvement";
      colorClass = "performance-average";
    } else if (value >= 0 && value < 60) {
      status = "Requires support";
      colorClass = "performance-low";
    }
  }

  return (
    <span className={`performance-status ${colorClass}`}>
      <span className="performance-status-dot" />
      {status}
    </span>
  );
};

export default PerformanceColourScale;
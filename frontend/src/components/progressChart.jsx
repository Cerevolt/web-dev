import React from "react";
import "./progressChart.css";

const ProgressChart = ({
  title = "Progress Overview",
  data = [],
  color = "#315b91",
}) => {
  const validData = data.filter(
    (item) =>
      item &&
      typeof item.label === "string" &&
      Number.isFinite(Number(item.value))
  );

  return (
    <section className="progress-chart">
      <h3 className="progress-chart-title">{title}</h3>

      {validData.length === 0 ? (
        <p className="progress-chart-empty">No progress data available.</p>
      ) : (
        <div className="progress-chart-list">
          {validData.map((item, index) => {
            const value = Math.min(100, Math.max(0, Number(item.value)));

            return (
              <div className="progress-chart-item" key={`${item.label}-${index}`}>
                <div className="progress-chart-info">
                  <span className="progress-chart-label">{item.label}</span>
                  <span className="progress-chart-value">{value}%</span>
                </div>

                <div
                  className="progress-chart-track"
                  role="progressbar"
                  aria-label={item.label}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-chart-fill"
                    style={{
                      width: `${value}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProgressChart;
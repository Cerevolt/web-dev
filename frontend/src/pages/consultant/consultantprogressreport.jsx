import React, { useState } from "react";
import "./consultantprogressreport.css";

const progressData = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 8,
    completed: 18,
    total: 24,
    score: 82,
    status: "On Track",
  },
  {
    id: 2,
    name: "Ananya Das",
    age: 9,
    completed: 12,
    total: 24,
    score: 68,
    status: "Needs Attention",
  },
  {
    id: 3,
    name: "Rohan Gupta",
    age: 7,
    completed: 21,
    total: 24,
    score: 91,
    status: "On Track",
  },
  {
    id: 4,
    name: "Ishita Roy",
    age: 8,
    completed: 9,
    total: 24,
    score: 54,
    status: "Needs Attention",
  },
];

function ConsultantProgressReport() {
  const [search, setSearch] = useState("");

  const filteredData = progressData.filter((child) =>
    child.name.toLowerCase().includes(search.toLowerCase())
  );

  const averageScore = Math.round(
    progressData.reduce((sum, child) => sum + child.score, 0) /
      progressData.length
  );

  return (
    <main className="consultant-progress-page">
      <header className="consultant-progress-header">
        <div>
          <h1>Progress Reports</h1>
          <p>Monitor children's learning progress and performance.</p>
        </div>
      </header>

      <section className="progress-summary">
        <div className="progress-summary-card">
          <span>Total Children</span>
          <h2>{progressData.length}</h2>
        </div>

        <div className="progress-summary-card">
          <span>Average Performance</span>
          <h2>{averageScore}%</h2>
        </div>

        <div className="progress-summary-card">
          <span>On Track</span>
          <h2>
            {progressData.filter((child) => child.status === "On Track").length}
          </h2>
        </div>

        <div className="progress-summary-card">
          <span>Needs Attention</span>
          <h2>
            {
              progressData.filter(
                (child) => child.status === "Needs Attention"
              ).length
            }
          </h2>
        </div>
      </section>

      <section className="progress-report-section">
        <div className="progress-report-heading">
          <div>
            <h2>Children's Performance</h2>
            <p>Individual learning progress overview.</p>
          </div>

          <input
            type="search"
            placeholder="Search child..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search children"
          />
        </div>

        <div className="progress-table-wrapper">
          <table className="progress-table">
            <thead>
              <tr>
                <th>Child</th>
                <th>Age</th>
                <th>Activities Completed</th>
                <th>Progress</th>
                <th>Performance</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((child) => {
                const percentage = Math.round(
                  (child.completed / child.total) * 100
                );

                return (
                  <tr key={child.id}>
                    <td>{child.name}</td>
                    <td>{child.age} years</td>
                    <td>
                      {child.completed}/{child.total}
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </td>
                    <td>{child.score}%</td>
                    <td>
                      <span
                        className={`progress-status ${
                          child.status === "On Track"
                            ? "on-track"
                            : "needs-attention"
                        }`}
                      >
                        {child.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <p className="progress-empty">No matching children found.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ConsultantProgressReport;

import React from "react";
import ParentSidebar from "../../components/ParentSidebar";
import "./childprogressreport.css";

const subjectProgress = [
  { name: "Mathematics", score: 82, previous: 74, color: "#4776d0" },
  { name: "Language", score: 74, previous: 68, color: "#28a58a" },
  { name: "Science", score: 91, previous: 85, color: "#e5a33c" },
  { name: "Memory", score: 68, previous: 62, color: "#9671cf" },
];

const progressHistory = [
  { month: "May", score: 52 },
  { month: "Jun", score: 60 },
  { month: "Jul", score: 57 },
  { month: "Aug", score: 68 },
  { month: "Sep", score: 73 },
  { month: "Oct", score: 79 },
];

const activities = [
  {
    name: "Mathematics Practice",
    category: "Mathematics",
    date: "30 Oct 2026",
    status: "Completed",
    score: "8/10",
  },
  {
    name: "Science Explorer",
    category: "Science",
    date: "29 Oct 2026",
    status: "Completed",
    score: "9/10",
  },
  {
    name: "Reading Practice",
    category: "Language",
    date: "28 Oct 2026",
    status: "Completed",
    score: "7/10",
  },
  {
    name: "Memory Challenge",
    category: "Memory",
    date: "27 Oct 2026",
    status: "Completed",
    score: "8/10",
  },
];

function ChildProgressReport() {
  return (
    <div className="parent-layout">
      <ParentSidebar />

      <main className="parent-main progress-report-main">
        <header className="parent-topbar">
          <div>
            <p className="parent-breadcrumb">
              PARENT PORTAL / CHILD PROGRESS
            </p>
            <h1>Child Progress Report</h1>
            <p className="parent-subtitle">
              Track learning performance and development over time.
            </p>
          </div>
        </header>

        <section className="progress-profile">
          <div className="progress-child-avatar">C</div>
          <div className="progress-child-info">
            <span>CHILD PROFILE</span>
            <h2>Child Account</h2>
            <p>Learning progress overview · October 2026</p>
          </div>
          <div className="progress-profile-status">
            <span className="progress-status-dot" />
            Learning activity available
          </div>
        </section>

        <section className="progress-summary-grid">
          <article className="progress-summary-card">
            <span>Overall Performance</span>
            <h2>79%</h2>
            <p>Current progress overview</p>
          </article>

          <article className="progress-summary-card">
            <span>Learning Sessions</span>
            <h2>48</h2>
            <p>Recorded sessions</p>
          </article>

          <article className="progress-summary-card">
            <span>Activities Completed</span>
            <h2>24</h2>
            <p>This week</p>
          </article>

          <article className="progress-summary-card">
            <span>Learning Time</span>
            <h2>18.5 hrs</h2>
            <p>This week</p>
          </article>
        </section>

        <section className="progress-report-grid">
          <article className="progress-report-panel">
            <div className="progress-panel-heading">
              <div>
                <h3>Progress Over Time</h3>
                <p>Monthly learning performance</p>
              </div>
              <span className="progress-report-tag">May – Oct</span>
            </div>

            <div className="progress-history-chart">
              {progressHistory.map((item) => (
                <div className="progress-history-column" key={item.month}>
                  <span>{item.score}%</span>
                  <div className="progress-history-track">
                    <div
                      className="progress-history-bar"
                      style={{ height: `${item.score}%` }}
                    />
                  </div>
                  <small>{item.month}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="progress-report-panel">
            <div className="progress-panel-heading">
              <div>
                <h3>Subject Performance</h3>
                <p>Current performance by learning area</p>
              </div>
            </div>

            <div className="subject-progress-list">
              {subjectProgress.map((subject) => (
                <div className="subject-progress-item" key={subject.name}>
                  <div className="subject-progress-heading">
                    <strong>{subject.name}</strong>
                    <span>{subject.score}%</span>
                  </div>
                  <div className="subject-progress-track">
                    <div
                      className="subject-progress-fill"
                      style={{
                        width: `${subject.score}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </div>
                  <small>Previous period: {subject.previous}%</small>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="progress-report-panel progress-activity-panel">
          <div className="progress-panel-heading">
            <div>
              <h3>Learning Activity History</h3>
              <p>Recently recorded learning activities</p>
            </div>
            <span className="progress-report-tag">Recent records</span>
          </div>

          <div className="progress-table-wrapper">
            <table className="progress-activity-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Learning Area</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.name}</td>
                    <td>{activity.category}</td>
                    <td>{activity.date}</td>
                    <td>{activity.score}</td>
                    <td>
                      <span className="activity-completed">
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="progress-demo-disclaimer">
          Demonstration data only. Actual progress records will be connected
          when the backend is available.
        </p>
      </main>
    </div>
  );
}

export default ChildProgressReport;


import React from "react";
import { NavLink } from "react-router-dom";
import "./consultantdashboard.css";

const overviewStats = [
  { label: "Assessments Created", value: "24", change: "Across all classes", icon: "▤" },
  { label: "Content Published", value: "38", change: "Learning resources", icon: "▣" },
  { label: "Students Reached", value: "486", change: "Across assigned schools", icon: "♙" },
  { label: "Pending Reviews", value: "7", change: "Needs your attention", icon: "◷" },
];

const recentActivities = [
  { title: "Mathematics assessment created", detail: "Grade 5 · Number Operations", time: "Today, 10:30 AM", status: "Completed" },
  { title: "Science learning content added", detail: "Grade 4 · Plants and Animals", time: "Yesterday", status: "Published" },
  { title: "Assessment submitted for review", detail: "Grade 6 · Environmental Science", time: "Yesterday", status: "Pending" },
  { title: "Progress report updated", detail: "School learning summary", time: "2 days ago", status: "Updated" },
];

const workload = [
  { label: "Assessments", value: 72, color: "#3978c7" },
  { label: "Learning Content", value: 86, color: "#35a27b" },
  { label: "Progress Reviews", value: 58, color: "#e5a344" },
];

function ConsultantDashboard() {
  return (
    <div className="consultant-dashboard-page">
      <main className="consultant-dashboard-main">
        <header className="consultant-dashboard-header">
          <div>
            <p className="consultant-eyebrow">CONSULTANT PORTAL</p>
            <h1>Dashboard</h1>
            <p className="consultant-subtitle">
              Manage learning resources, assessments, and student progress.
            </p>
          </div>
          <div className="consultant-header-date">
            <span>WORKSPACE</span>
            <strong>Consultant Overview</strong>
          </div>
        </header>

        <section className="consultant-welcome-banner">
          <div>
            <span>WELCOME BACK</span>
            <h2>Make learning more impactful.</h2>
            <p>
              Create meaningful learning experiences and support schools
              with quality educational content.
            </p>
          </div>
          <div className="consultant-welcome-symbol">✦</div>
        </section>

        <section className="consultant-stats-grid">
          {overviewStats.map((stat) => (
            <article className="consultant-stat-card" key={stat.label}>
              <div className="consultant-stat-top">
                <span>{stat.label}</span>
                <div className="consultant-stat-icon">{stat.icon}</div>
              </div>
              <strong>{stat.value}</strong>
              <p>{stat.change}</p>
            </article>
          ))}
        </section>

        <section className="consultant-dashboard-content-grid">
          <article className="consultant-panel consultant-activity-panel">
            <div className="consultant-panel-heading">
              <div>
                <h2>Recent Activity</h2>
                <p>Latest updates from your workspace</p>
              </div>
              <span className="consultant-panel-label">Recent</span>
            </div>

            <div className="consultant-activity-list">
              {recentActivities.map((activity, index) => (
                <div className="consultant-activity-item" key={activity.title}>
                  <div className={`consultant-activity-marker marker-${index}`}>
                    {index + 1}
                  </div>
                  <div className="consultant-activity-info">
                    <h3>{activity.title}</h3>
                    <p>{activity.detail}</p>
                    <span>{activity.time}</span>
                  </div>
                  <span
                    className={`consultant-activity-status ${activity.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="consultant-panel consultant-workload-panel">
            <div className="consultant-panel-heading">
              <div>
                <h2>Workspace Overview</h2>
                <p>Activity completion snapshot</p>
              </div>
            </div>

            <div className="consultant-workload-list">
              {workload.map((item) => (
                <div className="consultant-workload-item" key={item.label}>
                  <div className="consultant-workload-label">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="consultant-progress-track">
                    <div
                      className="consultant-progress-fill"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="consultant-workload-note">
              <span>ⓘ</span>
              Dashboard figures are sample data for the current interface.
            </div>
          </article>
        </section>

        <section className="consultant-quick-actions">
          <div className="consultant-panel-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Continue with your common tasks</p>
            </div>
          </div>

          <div className="consultant-action-grid">
            <NavLink to="/consultant/assessment" className="consultant-action-card">
              <span className="consultant-action-icon assessment">▤</span>
              <div>
                <h3>Create Assessment</h3>
                <p>Prepare assessments for students</p>
              </div>
              <span className="consultant-action-arrow">→</span>
            </NavLink>

            <NavLink to="/consultant/content-addition" className="consultant-action-card">
              <span className="consultant-action-icon content">▣</span>
              <div>
                <h3>Add Learning Content</h3>
                <p>Upload and organise resources</p>
              </div>
              <span className="consultant-action-arrow">→</span>
            </NavLink>

            <NavLink to="/consultant/progress-report" className="consultant-action-card">
              <span className="consultant-action-icon report">▥</span>
              <div>
                <h3>View Progress Reports</h3>
                <p>Review learning performance</p>
              </div>
              <span className="consultant-action-arrow">→</span>
            </NavLink>
          </div>
        </section>

        <footer className="consultant-dashboard-footer">
          Cerevolt Consultant Portal · Empowering quality learning
        </footer>
      </main>
    </div>
  );
}

export default ConsultantDashboard;

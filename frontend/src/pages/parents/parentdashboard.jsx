
import React from "react";
import ParentSidebar from "../../components/ParentSidebar";
import "./parentdashboard.css";

const weeklyActivity = [
  { day: "Mon", hours: 2.1 },
  { day: "Tue", hours: 2.8 },
  { day: "Wed", hours: 1.7 },
  { day: "Thu", hours: 3.2 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 2.9 },
];

const learningAreas = [
  { name: "Mathematics", score: 82, color: "#4776d0" },
  { name: "Language", score: 74, color: "#28a58a" },
  { name: "Science", score: 91, color: "#e5a33c" },
  { name: "Memory", score: 68, color: "#9671cf" },
];

function ParentDashboard() {
  return (
    <div className="parent-layout">
      <ParentSidebar />

      <main className="parent-main">
        <header className="parent-topbar">
          <div>
            <p className="parent-breadcrumb">PARENT PORTAL / OVERVIEW</p>
            <h1>Parent Dashboard</h1>
            <p className="parent-subtitle">
              A clear view of your child's learning journey.
            </p>
          </div>

          <div className="parent-header-right">
            <button className="parent-notification" aria-label="Notifications">
              ♧
              <span />
            </button>
            <div className="parent-header-avatar">P</div>
          </div>
        </header>

        <section className="parent-welcome">
          <div>
            <span className="parent-welcome-label">FAMILY OVERVIEW</span>
            <h2>Welcome back!</h2>
            <p>
              Stay connected with your child's progress, activities and
              learning routine.
            </p>
          </div>
          <div className="parent-welcome-icon">⌂</div>
        </section>

        <section className="parent-stat-grid">
          <article className="parent-stat-card">
            <span className="parent-stat-icon blue">◷</span>
            <p>Learning Time</p>
            <h2>18.5 <small>hrs</small></h2>
            <span className="parent-stat-note">This week</span>
          </article>

          <article className="parent-stat-card">
            <span className="parent-stat-icon green">↗</span>
            <p>Overall Progress</p>
            <h2>79<small>%</small></h2>
            <span className="parent-stat-note">Learning overview</span>
          </article>

          <article className="parent-stat-card">
            <span className="parent-stat-icon orange">✓</span>
            <p>Goals Completed</p>
            <h2>12 <small>/ 15</small></h2>
            <span className="parent-stat-note">This week</span>
          </article>

          <article className="parent-stat-card">
            <span className="parent-stat-icon purple">☆</span>
            <p>Activities</p>
            <h2>24</h2>
            <span className="parent-stat-note">Completed this week</span>
          </article>
        </section>

        <section className="parent-analytics-grid">
          <article className="parent-panel parent-activity-panel">
            <div className="parent-panel-heading">
              <div>
                <h3>Weekly Learning Activity</h3>
                <p>Daily learning time in hours</p>
              </div>
              <span className="parent-period">Last 7 days</span>
            </div>

            <div className="parent-bar-chart">
              {weeklyActivity.map((item) => (
                <div className="parent-bar-column" key={item.day}>
                  <span className="parent-bar-value">{item.hours}h</span>
                  <div className="parent-bar-track">
                    <div
                      className="parent-bar"
                      style={{ height: `${(item.hours / 4) * 100}%` }}
                    />
                  </div>
                  <span className="parent-bar-day">{item.day}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="parent-panel parent-progress-panel">
            <div className="parent-panel-heading">
              <div>
                <h3>Learning Breakdown</h3>
                <p>Performance by learning area</p>
              </div>
            </div>

            <div className="parent-learning-list">
              {learningAreas.map((area) => (
                <div className="parent-learning-item" key={area.name}>
                  <div className="parent-learning-label">
                    <span>{area.name}</span>
                    <strong>{area.score}%</strong>
                  </div>
                  <div className="parent-progress-track">
                    <div
                      className="parent-progress-fill"
                      style={{
                        width: `${area.score}%`,
                        backgroundColor: area.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="parent-bottom-grid">
          <article className="parent-panel">
            <div className="parent-panel-heading">
              <div>
                <h3>Recent Activity</h3>
                <p>A snapshot of recent learning activities</p>
              </div>
            </div>

            <div className="parent-timeline">
              <div className="parent-timeline-item">
                <span className="timeline-dot blue-dot" />
                <div>
                  <strong>Mathematics practice</strong>
                  <p>Completed a practice session</p>
                  <small>Today · 10:30 AM</small>
                </div>
              </div>

              <div className="parent-timeline-item">
                <span className="timeline-dot green-dot" />
                <div>
                  <strong>Science Explorer</strong>
                  <p>Finished a learning activity</p>
                  <small>Today · 9:15 AM</small>
                </div>
              </div>

              <div className="parent-timeline-item">
                <span className="timeline-dot orange-dot" />
                <div>
                  <strong>Daily goal completed</strong>
                  <p>Completed the reading goal</p>
                  <small>Yesterday · 6:00 PM</small>
                </div>
              </div>
            </div>
          </article>

          <article className="parent-panel parent-controls-panel">
            <div className="parent-panel-heading">
              <div>
                <h3>Parental Controls</h3>
                <p>Manage your child's routine</p>
              </div>
              <span className="parent-control-icon">⚙</span>
            </div>

            <div className="parent-control-row">
              <div>
                <strong>Daily Screen Time</strong>
                <p>Suggested limit: 2 hours</p>
              </div>
              <span className="parent-control-value">2 hrs</span>
            </div>

            <div className="parent-control-row">
              <div>
                <strong>Learning Schedule</strong>
                <p>Preferred learning period</p>
              </div>
              <span className="parent-control-value">Morning</span>
            </div>

            <div className="parent-control-row">
              <div>
                <strong>Activity Monitoring</strong>
                <p>Learning activity overview</p>
              </div>
              <span className="parent-control-status">Active</span>
            </div>

            <p className="parent-demo-note">
              Demo settings — controls will be connected later.
            </p>
          </article>
        </section>

        <footer className="parent-dashboard-footer">
          Cerevolt Parent Portal · Supporting every learning journey
        </footer>
      </main>
    </div>
  );
}

export default ParentDashboard;

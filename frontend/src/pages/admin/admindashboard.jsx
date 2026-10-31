
import React from "react";
import Sidebar from "../../components/Sidebar";
import "./admindashboard.css";

const statistics = [
  {
    title: "Total Users",
    value: "1,248",
    subtitle: "Registered users",
    icon: "♙",
    color: "blue",
  },
  {
    title: "Total Children",
    value: "684",
    subtitle: "Child accounts",
    icon: "♧",
    color: "green",
  },
  {
    title: "Total Doctors",
    value: "32",
    subtitle: "Medical professionals",
    icon: "✚",
    color: "purple",
  },
  {
    title: "Total Teachers",
    value: "86",
    subtitle: "Registered educators",
    icon: "▤",
    color: "orange",
  },
];

const activities = [
  { name: "New user registered", detail: "Parent account", time: "10 min ago" },
  { name: "Doctor account added", detail: "Doctor", time: "35 min ago" },
  { name: "New child registered", detail: "Child account", time: "1 hour ago" },
  { name: "Teacher account added", detail: "Teacher", time: "2 hours ago" },
];

const distribution = [
  { role: "Admin", percentage: 5, color: "#4385f5" },
  { role: "Parent", percentage: 25, color: "#16b981" },
  { role: "Doctor", percentage: 10, color: "#a78bfa" },
  { role: "Teacher", percentage: 20, color: "#f5a623" },
  { role: "Child", percentage: 40, color: "#f472b6" },
];

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="Search anything..." />
          </div>

          <div className="header-actions">
            <button className="notification-button" aria-label="Notifications">
              ♧
              <span className="notification-dot"></span>
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">A</div>
              <div className="admin-profile-info">
                <strong>Administrator</strong>
                <span>System Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-container">
          <div className="page-header">
            <div>
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-description">
                Welcome back! Here's an overview of your platform.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <section className="stats-grid">
            {statistics.map((item) => (
              <div className="stat-card" key={item.title}>
                <div className={`stat-icon ${item.color}`}>
                  {item.icon}
                </div>

                <div className="stat-content">
                  <span className="stat-label">{item.title}</span>
                  <h2>{item.value}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Analytics */}
          <section className="analytics-grid">
            <div className="dashboard-panel activity-panel">
              <div className="panel-heading">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Latest platform updates</p>
                </div>
                <button className="view-all-button">View all</button>
              </div>

              <div className="activity-table-wrapper">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Category</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {activities.map((activity, index) => (
                      <tr key={index}>
                        <td>{activity.name}</td>
                        <td>{activity.detail}</td>
                        <td>{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-panel distribution-panel">
              <div className="panel-heading">
                <div>
                  <h3>User Distribution</h3>
                  <p>Users by role</p>
                </div>
              </div>

              <div className="distribution-content">
                <div className="donut-chart"></div>

                <div className="distribution-legend">
                  {distribution.map((item) => (
                    <div className="legend-item" key={item.role}>
                      <span
                        className="legend-dot"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span>{item.role}</span>
                      <strong>{item.percentage}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAdminDashboard } from "../../services/adminService.js";
import "./admindashboard.css";

// Card labels and colours are kept from the original dashboard. The backend
// uses consultant/school roles in place of the older doctor/teacher concepts,
// so those two cards are sourced from the matching current role counts.
const STAT_CARDS = [
  { title: "Total Users", subtitle: "Registered users", icon: "♙", color: "blue", source: "total_users" },
  { title: "Total Children", subtitle: "Child accounts", icon: "♧", color: "green", source: "child" },
  { title: "Total Doctors", subtitle: "Medical professionals", icon: "✚", color: "purple", source: "consultant" },
  { title: "Total Teachers", subtitle: "Registered educators", icon: "▤", color: "orange", source: "school" },
];

const ROLE_LEGEND = [
  { role: "Admin", source: "admin", color: "#4385f5" },
  { role: "Parent", source: "parent", color: "#16b981" },
  { role: "Doctor", source: "consultant", color: "#a78bfa" },
  { role: "Teacher", source: "school", color: "#f5a623" },
  { role: "Child", source: "child", color: "#f472b6" },
];

const activities = [
  { name: "New user registered", detail: "Parent account", time: "10 min ago" },
  { name: "Doctor account added", detail: "Doctor", time: "35 min ago" },
  { name: "New child registered", detail: "Child account", time: "1 hour ago" },
  { name: "Teacher account added", detail: "Teacher", time: "2 hours ago" },
];

function formatCount(value) {
  return (Number(value) || 0).toLocaleString();
}

function buildDashboardData(data) {
  const roleCounts = data?.users_by_role || {};
  const totalUsers = Number(data?.total_users) || 0;

  const statistics = STAT_CARDS.map((card) => ({
    title: card.title,
    subtitle: card.subtitle,
    icon: card.icon,
    color: card.color,
    value: formatCount(
      card.source === "total_users" ? totalUsers : roleCounts[card.source],
    ),
  }));

  const distribution = ROLE_LEGEND.map((item) => ({
    role: item.role,
    color: item.color,
    percentage: totalUsers
      ? Math.round(((Number(roleCounts[item.source]) || 0) / totalUsers) * 100)
      : 0,
  }));

  let cursor = 0;
  const segments = distribution.map((item) => {
    const start = cursor;
    cursor += item.percentage;
    return `${item.color} ${start}% ${cursor}%`;
  });

  return {
    statistics,
    distribution,
    gradient: cursor > 0
      ? `conic-gradient(${segments.join(", ")})`
      : "conic-gradient(#e2e8f0 0% 100%)",
  };
}

const placeholderStats = STAT_CARDS.map((card) => ({
  title: card.title,
  subtitle: card.subtitle,
  icon: card.icon,
  color: card.color,
  value: "—",
}));

const placeholderDistribution = ROLE_LEGEND.map((item) => ({
  role: item.role,
  color: item.color,
  percentage: 0,
}));

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getAdminDashboard()
      .then((data) => {
        if (active) setDashboard(buildDashboardData(data));
      })
      .catch(() => {
        if (active) setError("Unable to load dashboard data.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const statistics = dashboard?.statistics || placeholderStats;
  const distribution = dashboard?.distribution || placeholderDistribution;

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

          {isLoading && (
            <p className="admin-data-state">Loading dashboard data…</p>
          )}
          {!isLoading && error && (
            <p className="admin-data-state admin-data-error">{error}</p>
          )}

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
                <div
                  className="donut-chart"
                  style={dashboard ? { background: dashboard.gradient } : undefined}
                ></div>

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

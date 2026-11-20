import { useEffect, useState } from "react";
import {
  getSchoolDashboard,
  getSchoolSummary,
} from "../../services/schoolService.js";
import "./schooldashboard.css";

// Only the two values with a directly compatible, school-scoped API are
// loaded below. The remaining cards/sections are unchanged demo data because
// no matching endpoint exists for them.
const schoolStats = [
  { label: "Total Students", detail: "Across all classes", source: "students" },
  { label: "Active Classes", detail: "Currently enrolled", source: "classes" },
  { label: "Assessments", value: "36", detail: "Scheduled this month" },
  { label: "Students Requiring Support", value: "18", detail: "Needs follow-up" },
];

const classProgress = [
  { className: "Class 1", students: 32, progress: 78 },
  { className: "Class 2", students: 28, progress: 84 },
  { className: "Class 3", students: 35, progress: 71 },
  { className: "Class 4", students: 30, progress: 88 },
  { className: "Class 5", students: 26, progress: 76 },
];

const recentActivities = [
  {
    title: "Assessment completed",
    description: "Class 3 · Learning Assessment",
    date: "Today",
    status: "Completed",
  },
  {
    title: "New learning content added",
    description: "Class 2 · Mathematics",
    date: "Yesterday",
    status: "Added",
  },
  {
    title: "Student progress reviewed",
    description: "Class 4 · Monthly review",
    date: "Yesterday",
    status: "Reviewed",
  },
  {
    title: "Behaviour report updated",
    description: "Class 1 · Student support",
    date: "2 days ago",
    status: "Updated",
  },
];

function SchoolDashboard() {
  const [counts, setCounts] = useState({ students: null, classes: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      const [dashboardResult, summaryResult] = await Promise.allSettled([
        getSchoolDashboard(),
        getSchoolSummary(),
      ]);

      if (!active) return;

      const nextCounts = {};
      if (dashboardResult.status === "fulfilled") {
        nextCounts.classes = dashboardResult.value?.class_count ?? 0;
      }
      if (summaryResult.status === "fulfilled") {
        nextCounts.students = summaryResult.value?.total_enrollments ?? 0;
      }

      if (
        dashboardResult.status === "rejected" ||
        summaryResult.status === "rejected"
      ) {
        setError("Some school figures could not be loaded.");
      }

      setCounts(nextCounts);
      setIsLoading(false);
    }

    loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  const stats = schoolStats.map((stat) => {
    if (!stat.source) return stat;
    const value = counts[stat.source];
    return {
      ...stat,
      value: isLoading || value === undefined || value === null ? "—" : value,
    };
  });

  return (
    <main className="school-dashboard-page">
      <header className="school-dashboard-header">
        <div>
          <p className="school-dashboard-eyebrow">SCHOOL PORTAL</p>
          <h1>School Dashboard</h1>
          <p className="school-dashboard-subtitle">
            Overview of student learning, assessments, and school activities.
          </p>
        </div>
        <div className="school-dashboard-date">
          <span>Academic Year</span>
          <strong>2026–2027</strong>
        </div>
      </header>

      {isLoading && (
        <p className="school-dashboard-status">Loading school data…</p>
      )}
      {!isLoading && error && (
        <p className="school-dashboard-status school-dashboard-status-error">
          {error}
        </p>
      )}

      <section className="school-dashboard-stats">
        {stats.map((stat) => (
          <article className="school-stat-card" key={stat.label}>
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
            <span>{stat.detail}</span>
          </article>
        ))}
      </section>

      <section className="school-dashboard-main-grid">
        <article className="school-dashboard-panel school-class-progress">
          <div className="school-panel-header">
            <div>
              <h2>Class Learning Progress</h2>
              <p>Average learning progress by class</p>
            </div>
          </div>

          <div className="school-class-progress-list">
            {classProgress.map((item) => (
              <div className="school-class-progress-item" key={item.className}>
                <div className="school-class-progress-info">
                  <strong>{item.className}</strong>
                  <span>{item.students} students</span>
                  <b>{item.progress}%</b>
                </div>
                <div className="school-progress-track">
                  <div
                    className="school-progress-fill"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="school-dashboard-panel school-activity-panel">
          <div className="school-panel-header">
            <div>
              <h2>Recent Activities</h2>
              <p>Latest updates from the school</p>
            </div>
          </div>

          <div className="school-activity-list">
            {recentActivities.map((activity, index) => (
              <div className="school-activity-item" key={`${activity.title}-${index}`}>
                <div className="school-activity-marker" />
                <div className="school-activity-content">
                  <div className="school-activity-title-row">
                    <strong>{activity.title}</strong>
                    <span>{activity.date}</span>
                  </div>
                  <p>{activity.description}</p>
                  <small>{activity.status}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="school-dashboard-panel school-dashboard-notice">
        <div>
          <h2>School Overview</h2>
          <p>
            Monitor student progress, coordinate assessments, manage learning
            content, and review behaviour records from the School Portal.
          </p>
        </div>
      </section>
    </main>
  );
}

export default SchoolDashboard;


import React, { useState } from "react";
import "./behaviourmonitoring.css";

const initialRecords = [
  { id: 1, name: "Rohan Sen", className: "Class 3", behaviour: "Disruptive", date: "02 Nov 2026", priority: "High", status: "Under Review" },
  { id: 2, name: "Aarav Sharma", className: "Class 1", behaviour: "Improved Participation", date: "01 Nov 2026", priority: "Low", status: "Resolved" },
  { id: 3, name: "Ishaan Ghosh", className: "Class 2", behaviour: "Difficulty Following Instructions", date: "30 Oct 2026", priority: "Medium", status: "Under Review" },
  { id: 4, name: "Meera Paul", className: "Class 5", behaviour: "Positive Peer Interaction", date: "29 Oct 2026", priority: "Low", status: "Resolved" },
];

function BehaviourMonitoring() {
  const [records, setRecords] = useState(initialRecords);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All Records");
  const [form, setForm] = useState({
    name: "",
    className: "Class 1",
    behaviour: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Under Review",
    };

    setRecords([newRecord, ...records]);
    setForm({
      name: "",
      className: "Class 1",
      behaviour: "",
      priority: "Medium",
    });
    setShowForm(false);
  };

  const updateStatus = (id) => {
    setRecords(records.map((record) =>
      record.id === id
        ? { ...record, status: record.status === "Resolved" ? "Under Review" : "Resolved" }
        : record
    ));
  };

  const filteredRecords = records.filter((record) => {
    if (filter === "All Records") return true;
    return record.status === filter;
  });

  return (
    <div className="school-page">
      <div className="school-page-header">
        <div>
          <h1>Behaviour Monitoring</h1>
          <p>Track student behaviour, identify concerns, and record positive progress.</p>
        </div>

        <button className="school-primary-btn" onClick={() => setShowForm(!showForm)}>
          + Add Behaviour Record
        </button>
      </div>

      <div className="behaviour-stats">
        <div className="behaviour-stat">
          <span>Total Records</span>
          <h2>{records.length}</h2>
        </div>

        <div className="behaviour-stat">
          <span>Under Review</span>
          <h2>{records.filter((record) => record.status === "Under Review").length}</h2>
        </div>

        <div className="behaviour-stat">
          <span>Resolved</span>
          <h2>{records.filter((record) => record.status === "Resolved").length}</h2>
        </div>

        <div className="behaviour-stat">
          <span>High Priority</span>
          <h2>{records.filter((record) => record.priority === "High").length}</h2>
        </div>
      </div>

      {showForm && (
        <form className="behaviour-form" onSubmit={handleSubmit}>
          <h2>Add Behaviour Record</h2>

          <div className="school-form-grid">
            <label>
              Student Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </label>

            <label>
              Class
              <select name="className" value={form.className} onChange={handleChange}>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
                <option>Class 4</option>
                <option>Class 5</option>
              </select>
            </label>

            <label>
              Behaviour Observation
              <input
                name="behaviour"
                value={form.behaviour}
                onChange={handleChange}
                placeholder="Describe the observation"
                required
              />
            </label>

            <label>
              Priority
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <div className="school-form-actions">
            <button type="button" className="school-secondary-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="school-primary-btn">
              Save Record
            </button>
          </div>
        </form>
      )}

      <div className="behaviour-records-card">
        <div className="behaviour-records-heading">
          <div>
            <h2>Behaviour Records</h2>
            <p>Review observations and update their status.</p>
          </div>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All Records</option>
            <option>Under Review</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="school-table-wrapper">
          <table className="behaviour-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Observation</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="behaviour-student-name">{record.name}</td>
                    <td>{record.className}</td>
                    <td>{record.behaviour}</td>
                    <td>{record.date}</td>
                    <td>
                      <span className={`behaviour-priority ${record.priority.toLowerCase()}`}>
                        {record.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`behaviour-status ${record.status === "Resolved" ? "resolved" : "review"}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button className="behaviour-action-btn" onClick={() => updateStatus(record.id)}>
                        {record.status === "Resolved" ? "Reopen" : "Resolve"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="behaviour-empty-state">
                    No behaviour records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BehaviourMonitoring;

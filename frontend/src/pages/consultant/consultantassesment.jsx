
import React, { useState } from "react";
import "./consultantassesment.css";

const initialAssessments = [
  {
    id: 1,
    child: "Aarav Sharma",
    age: 8,
    type: "Learning Assessment",
    date: "02 Nov 2026",
    status: "Pending",
  },
  {
    id: 2,
    child: "Ananya Das",
    age: 9,
    type: "Progress Review",
    date: "03 Nov 2026",
    status: "Completed",
  },
  {
    id: 3,
    child: "Rohan Gupta",
    age: 7,
    type: "Behaviour Assessment",
    date: "04 Nov 2026",
    status: "Pending",
  },
];

function ConsultantAssessment() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const [formData, setFormData] = useState({
    child: "",
    age: "",
    type: "Learning Assessment",
    date: "",
  });

  const [error, setError] = useState("");

  const filteredAssessments =
    filter === "All"
      ? assessments
      : assessments.filter((item) => item.status === filter);

  const formatDate = (dateValue) => {
    const [year, month, day] = dateValue.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleCreateAssessment = (e) => {
    e.preventDefault();

    if (
      !formData.child.trim() ||
      !formData.age ||
      !formData.date
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    const newAssessment = {
      id: Date.now(),
      child: formData.child.trim(),
      age: Number(formData.age),
      type: formData.type,
      date: formatDate(formData.date),
      status: "Pending",
    };

    setAssessments((prev) => [...prev, newAssessment]);

    setFormData({
      child: "",
      age: "",
      type: "Learning Assessment",
      date: "",
    });

    setFilter("All");
    setError("");
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setError("");
  };

  return (
    <main className="consultant-assessment-page">
      <header className="consultant-assessment-header">
        <div>
          <h1>Assessments</h1>
          <p>Review and manage children's assessments.</p>
        </div>

        <button
          className="assessment-primary-btn"
          onClick={() => setShowForm(true)}
        >
          + Create Assessment
        </button>
      </header>

      <section className="assessment-summary">
        <div className="assessment-summary-card">
          <span>Total Assessments</span>
          <h2>{assessments.length}</h2>
        </div>

        <div className="assessment-summary-card">
          <span>Pending</span>
          <h2>
            {assessments.filter((a) => a.status === "Pending").length}
          </h2>
        </div>

        <div className="assessment-summary-card">
          <span>Completed</span>
          <h2>
            {assessments.filter((a) => a.status === "Completed").length}
          </h2>
        </div>
      </section>

      {showForm && (
        <div className="assessment-modal-overlay">
          <section
            className="assessment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="assessment-form-title"
          >
            <div className="assessment-modal-header">
              <div>
                <h2 id="assessment-form-title">Create Assessment</h2>
                <p>Enter the details to schedule a new assessment.</p>
              </div>

              <button
                type="button"
                className="assessment-close-btn"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateAssessment}>
              <div className="assessment-form-group">
                <label htmlFor="child">Child's Name</label>
                <input
                  id="child"
                  type="text"
                  name="child"
                  placeholder="Enter child's name"
                  value={formData.child}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="assessment-form-group">
                <label htmlFor="age">Child's Age</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  min="1"
                  max="18"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="assessment-form-group">
                <label htmlFor="type">Assessment Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Learning Assessment">
                    Learning Assessment
                  </option>
                  <option value="Progress Review">
                    Progress Review
                  </option>
                  <option value="Behaviour Assessment">
                    Behaviour Assessment
                  </option>
                </select>
              </div>

              <div className="assessment-form-group">
                <label htmlFor="date">Scheduled Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {error && (
                <p className="assessment-form-error">{error}</p>
              )}

              <div className="assessment-form-actions">
                <button
                  type="button"
                  className="assessment-cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="assessment-primary-btn"
                >
                  Create Assessment
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedAssessment && (
        <div className="assessment-modal-overlay">
          <section className="assessment-modal" role="dialog" aria-modal="true">
            <div className="assessment-modal-header">
              <div>
                <h2>Assessment Details</h2>
                <p>Assessment record information.</p>
              </div>

              <button
                className="assessment-close-btn"
                onClick={() => setSelectedAssessment(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="assessment-detail-list">
              <p><strong>Child:</strong> {selectedAssessment.child}</p>
              <p><strong>Age:</strong> {selectedAssessment.age} years</p>
              <p><strong>Type:</strong> {selectedAssessment.type}</p>
              <p><strong>Scheduled Date:</strong> {selectedAssessment.date}</p>
              <p><strong>Status:</strong> {selectedAssessment.status}</p>
            </div>

            <div className="assessment-form-actions">
              <button
                className="assessment-primary-btn"
                onClick={() => setSelectedAssessment(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      <section className="assessment-list-section">
        <div className="assessment-list-header">
          <div>
            <h2>Assessment Records</h2>
            <p>Track assessment activities and their status.</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter assessments by status"
          >
            <option value="All">All Assessments</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="assessment-table-wrapper">
          <table className="assessment-table">
            <thead>
              <tr>
                <th>Child</th>
                <th>Age</th>
                <th>Assessment Type</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>{assessment.child}</td>
                  <td>{assessment.age} years</td>
                  <td>{assessment.type}</td>
                  <td>{assessment.date}</td>
                  <td>
                    <span
                      className={`assessment-status ${assessment.status.toLowerCase()}`}
                    >
                      {assessment.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="assessment-view-btn"
                      onClick={() => setSelectedAssessment(assessment)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAssessments.length === 0 && (
            <p className="assessment-empty">No assessments found.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ConsultantAssessment;

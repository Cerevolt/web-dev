
import React, { useState } from "react";
import "./schoolassesment.css";

const initialAssessments = [
  { id: 1, title: "Reading Comprehension", className: "Class 1", subject: "English", date: "12 Nov 2026", status: "Published" },
  { id: 2, title: "Basic Mathematics", className: "Class 2", subject: "Mathematics", date: "14 Nov 2026", status: "Published" },
  { id: 3, title: "General Awareness", className: "Class 3", subject: "EVS", date: "18 Nov 2026", status: "Draft" },
  { id: 4, title: "Language Skills", className: "Class 4", subject: "English", date: "20 Nov 2026", status: "Published" },
];

function SchoolAssessment() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    className: "Class 1",
    subject: "English",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAssessment = {
      id: Date.now(),
      ...form,
      date: form.date,
      status: "Draft",
    };

    setAssessments([newAssessment, ...assessments]);
    setForm({ title: "", className: "Class 1", subject: "English", date: "" });
    setShowForm(false);
  };

  return (
    <div className="school-page">
      <div className="school-page-header">
        <div>
          <h1>Assessments</h1>
          <p>Create and manage assessments across classes.</p>
        </div>
        <button className="school-primary-btn" onClick={() => setShowForm(!showForm)}>
          + Create Assessment
        </button>
      </div>

      <div className="school-assessment-stats">
        <div className="school-assessment-stat">
          <span>Total Assessments</span>
          <h2>{assessments.length}</h2>
        </div>
        <div className="school-assessment-stat">
          <span>Published</span>
          <h2>{assessments.filter((item) => item.status === "Published").length}</h2>
        </div>
        <div className="school-assessment-stat">
          <span>Drafts</span>
          <h2>{assessments.filter((item) => item.status === "Draft").length}</h2>
        </div>
      </div>

      {showForm && (
        <form className="school-assessment-form" onSubmit={handleSubmit}>
          <h2>Create New Assessment</h2>

          <div className="school-form-grid">
            <label>
              Assessment Title
              <input name="title" value={form.title} onChange={handleChange} placeholder="Enter assessment title" required />
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
              Subject
              <select name="subject" value={form.subject} onChange={handleChange}>
                <option>English</option>
                <option>Mathematics</option>
                <option>EVS</option>
                <option>General Knowledge</option>
              </select>
            </label>

            <label>
              Assessment Date
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </label>
          </div>

          <div className="school-form-actions">
            <button type="button" className="school-secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="school-primary-btn">Save Assessment</button>
          </div>
        </form>
      )}

      <div className="school-assessment-table-card">
        <div className="school-section-heading">
          <div>
            <h2>Assessment List</h2>
            <p>Overview of assessments created for students.</p>
          </div>
        </div>

        <div className="school-table-wrapper">
          <table className="school-assessment-table">
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((item) => (
                <tr key={item.id}>
                  <td className="school-assessment-title">{item.title}</td>
                  <td>{item.className}</td>
                  <td>{item.subject}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`school-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SchoolAssessment;

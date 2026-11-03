
import React, { useState } from "react";
import "./schoolcontentaddition.css";

const initialContent = [
  { id: 1, title: "Introduction to Numbers", category: "Mathematics", className: "Class 1", type: "Worksheet", status: "Published" },
  { id: 2, title: "Basic English Words", category: "English", className: "Class 2", type: "Learning Material", status: "Published" },
  { id: 3, title: "Our Environment", category: "EVS", className: "Class 3", type: "Video", status: "Pending" },
  { id: 4, title: "Shapes and Patterns", category: "Mathematics", className: "Class 4", type: "Worksheet", status: "Draft" },
];

function SchoolContentAddition() {
  const [content, setContent] = useState(initialContent);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Mathematics",
    className: "Class 1",
    type: "Worksheet",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setContent([
      {
        id: Date.now(),
        ...form,
        status: "Draft",
      },
      ...content,
    ]);

    setForm({
      title: "",
      category: "Mathematics",
      className: "Class 1",
      type: "Worksheet",
    });

    setShowForm(false);
  };

  return (
    <div className="school-page">
      <div className="school-page-header">
        <div>
          <h1>Content Addition</h1>
          <p>Add and manage educational resources for different classes.</p>
        </div>

        <button className="school-primary-btn" onClick={() => setShowForm(!showForm)}>
          + Add Content
        </button>
      </div>

      <div className="school-content-stats">
        <div className="school-content-stat">
          <span>Total Resources</span>
          <h2>{content.length}</h2>
        </div>
        <div className="school-content-stat">
          <span>Published</span>
          <h2>{content.filter((item) => item.status === "Published").length}</h2>
        </div>
        <div className="school-content-stat">
          <span>Pending Review</span>
          <h2>{content.filter((item) => item.status === "Pending").length}</h2>
        </div>
      </div>

      {showForm && (
        <form className="school-content-form" onSubmit={handleSubmit}>
          <h2>Add Educational Content</h2>

          <div className="school-form-grid">
            <label>
              Content Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter content title"
                required
              />
            </label>

            <label>
              Category
              <select name="category" value={form.category} onChange={handleChange}>
                <option>Mathematics</option>
                <option>English</option>
                <option>EVS</option>
                <option>General Knowledge</option>
              </select>
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
              Content Type
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Worksheet</option>
                <option>Learning Material</option>
                <option>Video</option>
                <option>Activity</option>
              </select>
            </label>
          </div>

          <div className="school-form-actions">
            <button type="button" className="school-secondary-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="school-primary-btn">
              Save Content
            </button>
          </div>
        </form>
      )}

      <div className="school-content-table-card">
        <div className="school-section-heading">
          <div>
            <h2>Educational Resources</h2>
            <p>Manage learning materials available across classes.</p>
          </div>
        </div>

        <div className="school-table-wrapper">
          <table className="school-content-table">
            <thead>
              <tr>
                <th>Content Title</th>
                <th>Category</th>
                <th>Class</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {content.map((item) => (
                <tr key={item.id}>
                  <td className="school-content-title">{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.className}</td>
                  <td>{item.type}</td>
                  <td>
                    <span className={`school-status ${item.status.toLowerCase().replace(" ", "-")}`}>
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

export default SchoolContentAddition;

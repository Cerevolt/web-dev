import React, { useState } from "react";
import "./consultantcontentaddition.css";

function ConsultantContentAddition() {
  const [form, setForm] = useState({
    title: "",
    category: "Learning Material",
    ageGroup: "",
    description: "",
    contentType: "Text",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Content submitted successfully! (Demo only)");
    setForm({
      title: "",
      category: "Learning Material",
      ageGroup: "",
      description: "",
      contentType: "Text",
    });
  };

  return (
    <main className="consultant-content-page">
      <header className="consultant-content-header">
        <div>
          <h1>Content Addition</h1>
          <p>Create and submit educational content for children.</p>
        </div>
      </header>

      <section className="content-form-card">
        <div className="content-form-heading">
          <h2>Add New Content</h2>
          <p>Fill in the details below to contribute learning material.</p>
        </div>

        <form onSubmit={handleSubmit} className="consultant-content-form">
          <div className="content-form-group">
            <label htmlFor="content-title">Content Title</label>
            <input
              id="content-title"
              name="title"
              type="text"
              placeholder="Enter content title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="content-form-row">
            <div className="content-form-group">
              <label htmlFor="content-category">Category</label>
              <select
                id="content-category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Learning Material</option>
                <option>Activity</option>
                <option>Story</option>
                <option>Worksheet</option>
                <option>Educational Video</option>
              </select>
            </div>

            <div className="content-form-group">
              <label htmlFor="content-age">Target Age Group</label>
              <select
                id="content-age"
                name="ageGroup"
                value={form.ageGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select age group</option>
                <option value="3-5 years">3–5 years</option>
                <option value="6-8 years">6–8 years</option>
                <option value="9-12 years">9–12 years</option>
              </select>
            </div>
          </div>

          <div className="content-form-group">
            <label htmlFor="content-type">Content Type</label>
            <select
              id="content-type"
              name="contentType"
              value={form.contentType}
              onChange={handleChange}
            >
              <option>Text</option>
              <option>Image</option>
              <option>Video</option>
              <option>Document</option>
            </select>
          </div>

          <div className="content-form-group">
            <label htmlFor="content-description">Description</label>
            <textarea
              id="content-description"
              name="description"
              rows="5"
              placeholder="Describe the learning content and its purpose..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="content-form-actions">
            <button type="submit" className="content-submit-btn">
              Submit Content
            </button>
          </div>

          {message && <p className="content-success-message">{message}</p>}
        </form>
      </section>
    </main>
  );
}

export default ConsultantContentAddition;

import React, { useState } from "react";
import ParentSidebar from "../../components/ParentSidebar";
import "./feedbackform.css";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    category: "General Feedback",
    rating: 0,
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.rating || !formData.subject.trim() || !formData.message.trim()) {
      alert("Please complete all fields and select a rating.");
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      category: "General Feedback",
      rating: 0,
      subject: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="parent-layout">
      <ParentSidebar />

      <main className="parent-main feedback-main">
        <header className="parent-topbar">
          <div>
            <p className="parent-breadcrumb">PARENT PORTAL / FEEDBACK</p>
            <h1>Parent Feedback</h1>
            <p className="parent-subtitle">
              Share your thoughts and help us improve Cerevolt.
            </p>
          </div>
        </header>

        <section className="feedback-intro">
          <div>
            <span>YOUR VOICE MATTERS</span>
            <h2>Help us make learning better.</h2>
            <p>
              Your feedback helps us understand your experience and improve
              the platform for families.
            </p>
          </div>
          <div className="feedback-intro-icon">✎</div>
        </section>

        {submitted ? (
          <section className="feedback-success">
            <div className="feedback-success-icon">✓</div>
            <h2>Thank you for your feedback!</h2>
            <p>
              Your response has been recorded in this demo session.
              Thank you for helping us improve Cerevolt.
            </p>
            <button type="button" onClick={handleReset}>
              Submit Another Response
            </button>
          </section>
        ) : (
          <section className="feedback-form-card">
            <div className="feedback-form-heading">
              <h2>Share Your Feedback</h2>
              <p>Fields marked with * are required.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="feedback-field">
                <label htmlFor="category">Feedback Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>General Feedback</option>
                  <option>Learning Experience</option>
                  <option>Platform Usability</option>
                  <option>Child Progress</option>
                  <option>Technical Issue</option>
                  <option>Suggestion</option>
                </select>
              </div>

              <div className="feedback-field">
                <label>Your Overall Experience *</label>
                <div className="feedback-rating" role="group" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={formData.rating >= rating ? "selected" : ""}
                      onClick={() =>
                        setFormData((previous) => ({ ...previous, rating }))
                      }
                      aria-label={`${rating} out of 5 stars`}
                      aria-pressed={formData.rating === rating}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <small>Select a rating from 1 to 5 stars.</small>
              </div>

              <div className="feedback-field">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enter a short subject"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="feedback-field">
                <label htmlFor="message">Your Feedback *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Share your experience, suggestions, or concerns..."
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={1000}
                  required
                />
                <small>{formData.message.length}/1000 characters</small>
              </div>

              <button className="feedback-submit-button" type="submit">
                Submit Feedback <span>→</span>
              </button>
            </form>
          </section>
        )}

        <footer className="parent-dashboard-footer">
          Cerevolt Parent Portal · Supporting every learning journey
        </footer>
      </main>
    </div>
  );
}

export default FeedbackForm;

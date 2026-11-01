
import React, { useState } from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./solveassessments.css";

const assessments = [
  {
    id: 1,
    title: "Maths Challenge",
    subject: "Mathematics",
    icon: "🔢",
    description: "Test your number skills with fun questions.",
    questions: 10,
    duration: "15 min",
    color: "math",
    level: "Easy",
  },
  {
    id: 2,
    title: "Word Wizard",
    subject: "English",
    icon: "📚",
    description: "Explore words, grammar and vocabulary.",
    questions: 10,
    duration: "15 min",
    color: "english",
    level: "Easy",
  },
  {
    id: 3,
    title: "Science Explorer",
    subject: "Science",
    icon: "🔬",
    description: "Discover the wonders of science.",
    questions: 10,
    duration: "20 min",
    color: "science",
    level: "Medium",
  },
  {
    id: 4,
    title: "General Knowledge",
    subject: "General Knowledge",
    icon: "🌍",
    description: "See how much you know about the world.",
    questions: 10,
    duration: "15 min",
    color: "gk",
    level: "Medium",
  },
];

const SolveAssessments = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [startedAssessment, setStartedAssessment] = useState(null);

  const filters = ["All", "Easy", "Medium"];

  const filteredAssessments =
    selectedFilter === "All"
      ? assessments
      : assessments.filter(
          (item) => item.level === selectedFilter
        );

  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="assessment-page">
        <div className="assessment-header">
          <div>
            <span className="assessment-tag">📝 LEARNING ZONE</span>
            <h1>Let's Test Your Knowledge!</h1>
            <p>
              Challenge yourself, answer questions and discover
              how much you've learned.
            </p>
          </div>

          <div className="assessment-header-emoji">🎓</div>
        </div>

        <div className="assessment-stats">
          <div className="assessment-stat-card">
            <span>📋</span>
            <div>
              <h3>4</h3>
              <p>Assessments</p>
            </div>
          </div>

          <div className="assessment-stat-card">
            <span>❓</span>
            <div>
              <h3>40</h3>
              <p>Total Questions</p>
            </div>
          </div>

          <div className="assessment-stat-card">
            <span>⭐</span>
            <div>
              <h3>Learn</h3>
              <p>Every Day</p>
            </div>
          </div>
        </div>

        <div className="assessment-section-heading">
          <div>
            <h2>Choose Your Challenge</h2>
            <p>Pick a subject and start practising!</p>
          </div>
        </div>

        <div className="assessment-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                selectedFilter === filter ? "selected" : ""
              }
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="assessment-grid">
          {filteredAssessments.map((item) => (
            <div
              className={`assessment-card ${item.color}`}
              key={item.id}
            >
              <div className="assessment-card-top">
                <span className="assessment-icon">
                  {item.icon}
                </span>

                <span className="assessment-level">
                  {item.level}
                </span>
              </div>

              <span className="assessment-subject">
                {item.subject}
              </span>

              <h3>{item.title}</h3>

              <p className="assessment-description">
                {item.description}
              </p>

              <div className="assessment-details">
                <span>❓ {item.questions} Questions</span>
                <span>⏱️ {item.duration}</span>
              </div>

              <button
                className="assessment-start-btn"
                onClick={() => setStartedAssessment(item)}
              >
                Start Assessment →
              </button>
            </div>
          ))}
        </div>

        {startedAssessment && (
          <div className="assessment-modal-overlay">
            <div className="assessment-modal">
              <button
                className="assessment-modal-close"
                onClick={() => setStartedAssessment(null)}
              >
                ✕
              </button>

              <span className="assessment-modal-icon">
                {startedAssessment.icon}
              </span>

              <h2>{startedAssessment.title}</h2>

              <p>
                Your {startedAssessment.subject} assessment is
                ready!
              </p>

              <div className="assessment-modal-info">
                <span>
                  ❓ {startedAssessment.questions} Questions
                </span>
                <span>
                  ⏱️ {startedAssessment.duration}
                </span>
              </div>

              <p className="assessment-coming-soon">
                🚀 Assessment questions will be available soon!
              </p>

              <button
                className="assessment-modal-btn"
                onClick={() => setStartedAssessment(null)}
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SolveAssessments;


import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-content">
        <Link to="/" className="notfound-brand">
          <span className="notfound-brand-icon">C</span>
          Cerevolt
        </Link>

        <div className="notfound-illustration" aria-hidden="true">
          <span>4</span>
          <div className="notfound-circle">
            <span>?</span>
          </div>
          <span>4</span>
        </div>

        <span className="notfound-eyebrow">PAGE NOT FOUND</span>

        <h1>Looks like you're lost.</h1>

        <p>
          The page you're looking for may have been moved, removed
          or is temporarily unavailable.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-home-button">
            Back to Home <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            className="notfound-back-button"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>

        <span className="notfound-footer">
          © {new Date().getFullYear()} Cerevolt · Learning · Growth · Collaboration
        </span>
      </div>
    </main>
  );
}

export default NotFound;

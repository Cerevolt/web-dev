
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage(
      "Your email address is valid. Password recovery will be available after backend integration."
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/" className="auth-brand">
          <div className="brand-symbol">C</div>
          <span>Cerevolt</span>
        </Link>

        <div className="visual-content">
          <span className="visual-tag">Your journey continues</span>

          <h1>
            A fresh start.
            <br />
            A secure account.
          </h1>

          <p>
            We're here to help you regain access to your Cerevolt account
            and continue your connected learning and development journey.
          </p>

          <div className="visual-illustration" aria-hidden="true">
            <div className="illustration-circle circle-one"></div>
            <div className="illustration-circle circle-two"></div>

            <div className="illustration-card">
              <div className="illustration-icon">✦</div>
              <span>Access</span>
              <span>Recover</span>
              <span>Continue</span>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          Supporting every step of the journey.
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/" className="mobile-brand">
            <div className="brand-symbol">C</div>
            <span>Cerevolt</span>
          </Link>

          <div className="auth-heading">
            <span className="auth-eyebrow">ACCOUNT RECOVERY</span>

            <h2>Forgot your password?</h2>

            <p>
              Enter the email address associated with your account.
              We'll help you get back in.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="recovery-email">Email address</label>

              <input
                id="recovery-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setMessage("");
                }}
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "recovery-email-error" : undefined}
              />

              {error && (
                <span className="form-error" id="recovery-email-error">
                  {error}
                </span>
              )}
            </div>

            {message && (
              <p className="auth-status-message" role="status">
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit-button">
              Continue
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-switch">
            Remember your password?{" "}
            <Link to="/login">Back to Sign In</Link>
          </p>

          <p className="auth-legal">
            Keep your account credentials secure and private.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ForgetPassword;

import { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Authentication API integration will be added later.
    console.log("Login form validated successfully.");
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand">
          <div className="brand-symbol">N</div>
          <span>NeuroCare</span>
        </div>

        <div className="visual-content">
          <span className="visual-tag">A better way to grow</span>

          <h1>
            Every mind is unique.
            <br />
            Every journey matters.
          </h1>

          <p>
            A connected platform bringing families, educators and
            consultants together to support every child's development.
          </p>

          <div className="visual-illustration" aria-hidden="true">
            <div className="illustration-circle circle-one"></div>
            <div className="illustration-circle circle-two"></div>
            <div className="illustration-card">
              <div className="illustration-icon">✦</div>
              <span>Learn</span>
              <span>Grow</span>
              <span>Thrive</span>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          Supporting every step of the journey.
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <div className="mobile-brand">
            <div className="brand-symbol">N</div>
            <span>NeuroCare</span>
          </div>

          <div className="auth-heading">
            <span className="auth-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>
              Enter your details below to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {errors.email && (
                <span className="form-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>

                <a href="/forgot-password">
                  Forgot password?
                </a>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <span className="form-error" id="password-error">
                  {errors.password}
                </span>
              )}
            </div>

            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button type="submit" className="auth-submit-button">
              Sign In
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/register">Create an account</a>
          </p>

          <p className="auth-legal">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;

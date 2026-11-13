
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import adminService from "../../services/adminService";
import "./registeruser.css";

function RegisterUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await adminService.createUser(formData);

      setMessage("User registered successfully.");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (err) {
      setError(err.message || "Unable to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h1 className="page-title">Register User</h1>
              <p className="page-description">
                Create an account for a new Cerevolt platform user.
              </p>
            </div>
          </div>

          <section className="register-card">
            <form onSubmit={handleSubmit}>
              <div className="register-grid">
                <div className="register-field">
                  <label>First Name</label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="register-field">
                  <label>Last Name</label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="register-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="register-field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength={8}
                    required
                  />
                </div>

                <div className="register-field full-width">
                  <label>Register As</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select user type</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="consultant">Doctor / Consultant</option>
                    <option value="school">Teacher / School</option>
                  </select>
                </div>
              </div>

              {message && <p className="register-success">{message}</p>}
              {error && <p className="register-error">{error}</p>}

              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register User"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RegisterUser;


import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./addconsultanat.css";

function AddConsultant() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Form completed. Backend integration is pending.");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="header-actions">
            <div className="admin-profile">
              <div className="admin-avatar">A</div>
              <div className="admin-profile-info">
                <strong>Administrator</strong>
                <span>System Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-container">
          <div className="add-consultant-page">
            <div className="consultant-page-heading">
              <div>
                <h1>Add Doctor</h1>
                <p>Create a new doctor account for Cerevolt.</p>
              </div>
            </div>

            <form className="consultant-form" onSubmit={handleSubmit}>
              <h3>Personal Information</h3>

              <div className="consultant-form-grid">
                <div className="form-field">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required />
                </div>

                <div className="form-field">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" required />
                </div>

                <div className="form-field">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" required />
                </div>

                <div className="form-field">
                  <label>Specialization</label>
                  <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="e.g. Neurology" required />
                </div>

                <div className="form-field">
                  <label>Qualification</label>
                  <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Enter qualification" required />
                </div>

                <div className="form-field">
                  <label>Years of Experience</label>
                  <input type="number" min="0" name="experience" value={form.experience} onChange={handleChange} placeholder="Enter years of experience" required />
                </div>
              </div>

              <div className="form-divider"></div>

              <h3>Account Credentials</h3>

              <div className="consultant-form-grid">
                <div className="form-field">
                  <label>Password</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create password" required />
                </div>

                <div className="form-field">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
                </div>
              </div>

              {message && <p className="consultant-form-message">{message}</p>}

              <div className="consultant-form-actions">
                <button type="reset" className="consultant-reset" onClick={() => {
                  setForm({
                    name: "", email: "", phone: "", specialization: "",
                    qualification: "", experience: "", password: "",
                    confirmPassword: "",
                  });
                  setMessage("");
                }}>
                  Reset
                </button>
                <button type="submit" className="consultant-submit">
                  Create Doctor Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddConsultant;

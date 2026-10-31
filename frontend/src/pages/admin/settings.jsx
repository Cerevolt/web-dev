
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./settings.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@cerevolt.com",
    phone: "",
  });

  const [platform, setPlatform] = useState({
    platformName: "Cerevolt",
    supportEmail: "support@cerevolt.com",
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    newUser: true,
    reports: true,
    systemUpdates: false,
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePlatformChange = (e) => {
    setPlatform({ ...platform, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("Settings saved locally. Backend integration is pending.");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main settings-page">
        <header className="page-header">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-description">
              Manage your administrator profile and platform preferences.
            </p>
          </div>
        </header>

        {message && <div className="settings-message">{message}</div>}

        <form onSubmit={handleSave}>
          <section className="settings-section">
            <div className="settings-section-heading">
              <h2>Administrator Profile</h2>
              <p>Update your account information.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-field">
                <label>Full Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="settings-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="settings-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-heading">
              <h2>Platform Settings</h2>
              <p>Manage general platform information.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-field">
                <label>Platform Name</label>
                <input
                  name="platformName"
                  value={platform.platformName}
                  onChange={handlePlatformChange}
                  required
                />
              </div>

              <div className="settings-field">
                <label>Support Email</label>
                <input
                  type="email"
                  name="supportEmail"
                  value={platform.supportEmail}
                  onChange={handlePlatformChange}
                  required
                />
              </div>

              <div className="settings-field">
                <label>Language</label>
                <select
                  name="language"
                  value={platform.language}
                  onChange={handlePlatformChange}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Bengali</option>
                </select>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-heading">
              <h2>Notification Preferences</h2>
              <p>Choose which platform notifications you want to receive.</p>
            </div>

            <div className="settings-notifications">
              <label className="settings-toggle">
                <span>
                  <strong>New User Notifications</strong>
                  <small>Receive updates when a new user is added.</small>
                </span>
                <input
                  type="checkbox"
                  name="newUser"
                  checked={notifications.newUser}
                  onChange={handleNotificationChange}
                />
              </label>

              <label className="settings-toggle">
                <span>
                  <strong>Report Notifications</strong>
                  <small>Receive updates about platform reports.</small>
                </span>
                <input
                  type="checkbox"
                  name="reports"
                  checked={notifications.reports}
                  onChange={handleNotificationChange}
                />
              </label>

              <label className="settings-toggle">
                <span>
                  <strong>System Updates</strong>
                  <small>Receive information about platform updates.</small>
                </span>
                <input
                  type="checkbox"
                  name="systemUpdates"
                  checked={notifications.systemUpdates}
                  onChange={handleNotificationChange}
                />
              </label>
            </div>
          </section>

          <div className="settings-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Settings;

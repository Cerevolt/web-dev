
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import adminService from "../../services/adminService";
import "./manageusers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminService.getUsers();
      const userList = Array.isArray(response)
        ? response
        : response.results || response.users || [];

      setUsers(userList);
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleStatusChange = async (user) => {
    const action = user.is_active ? "deactivate" : "activate";

    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      await adminService.updateUserStatus(user.id, action);
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Unable to update user status.");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h1 className="page-title">Manage Users</h1>
              <p className="page-description">
                View and manage registered Cerevolt platform users.
              </p>
            </div>
          </div>

          <section className="users-card">
            <div className="users-toolbar">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="consultant">Doctor / Consultant</option>
                <option value="school">Teacher / School</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <p className="users-error">{error}</p>}

            {loading ? (
              <p className="users-message">Loading users...</p>
            ) : (
              <div className="users-table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            {`${user.first_name || ""} ${user.last_name || ""}`.trim() || "—"}
                          </td>
                          <td>{user.email || "—"}</td>
                          <td>{user.role || "—"}</td>
                          <td>
                            <span className={user.is_active ? "user-status active" : "user-status inactive"}>
                              {user.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="user-action"
                              onClick={() => handleStatusChange(user)}
                              disabled={user.role === "admin"}
                            >
                              {user.is_active ? "Deactivate" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="users-empty">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ManageUsers;

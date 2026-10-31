
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./managecontent.css";

const initialContent = [
  {
    id: 1,
    title: "Introduction to Numbers",
    type: "Learning Video",
    category: "Mathematics",
    ageGroup: "5–8 years",
    status: "Published",
  },
  {
    id: 2,
    title: "Memory Building Cards",
    type: "Flashcards",
    category: "Memory",
    ageGroup: "6–10 years",
    status: "Published",
  },
  {
    id: 3,
    title: "Basic Shape Recognition",
    type: "Learning Activity",
    category: "Cognitive",
    ageGroup: "5–8 years",
    status: "Draft",
  },
  {
    id: 4,
    title: "Word Recognition",
    type: "Learning Video",
    category: "Language",
    ageGroup: "8–12 years",
    status: "Published",
  },
];

const ManageContent = () => {
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    type: "Learning Video",
    category: "Mathematics",
    ageGroup: "",
    status: "Draft",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setContent((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...form, id: editingId } : item
        )
      );
    } else {
      setContent((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      type: item.type,
      category: item.category,
      ageGroup: item.ageGroup,
      status: item.status,
    });

    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setContent((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setContent((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const handleAddNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main manage-content-page">
        <header className="page-header">
          <div>
            <h1 className="page-title">Content Management</h1>
            <p className="page-description">
              Manage learning materials and educational content.
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleAddNew}>
            + Add New Content
          </button>
        </header>

        <section className="content-stats">
          <div className="content-stat-card">
            <span>Total Content</span>
            <h2>{content.length}</h2>
          </div>

          <div className="content-stat-card">
            <span>Published</span>
            <h2>
              {content.filter((item) => item.status === "Published").length}
            </h2>
          </div>

          <div className="content-stat-card">
            <span>Drafts</span>
            <h2>
              {content.filter((item) => item.status === "Draft").length}
            </h2>
          </div>
        </section>

        <section className="content-panel">
          <div className="content-toolbar">
            <input
              type="text"
              placeholder="Search content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Learning Video">Learning Video</option>
              <option value="Flashcards">Flashcards</option>
              <option value="Learning Activity">Learning Activity</option>
            </select>
          </div>

          {showForm && (
            <form className="content-form" onSubmit={handleSubmit}>
              <h2>{editingId ? "Edit Content" : "Add New Content"}</h2>

              <div className="content-form-grid">
                <div className="content-field">
                  <label>Content Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter content title"
                    required
                  />
                </div>

                <div className="content-field">
                  <label>Content Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option>Learning Video</option>
                    <option>Flashcards</option>
                    <option>Learning Activity</option>
                  </select>
                </div>

                <div className="content-field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Mathematics</option>
                    <option>Memory</option>
                    <option>Cognitive</option>
                    <option>Language</option>
                    <option>Communication</option>
                  </select>
                </div>

                <div className="content-field">
                  <label>Age Group</label>
                  <input
                    name="ageGroup"
                    value={form.ageGroup}
                    onChange={handleChange}
                    placeholder="e.g. 5–8 years"
                    required
                  />
                </div>

                <div className="content-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div className="content-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update Content" : "Save Content"}
                </button>
              </div>
            </form>
          )}

          <div className="content-table-wrapper">
            <table className="content-table">
              <thead>
                <tr>
                  <th>Content Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Age Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredContent.length > 0 ? (
                  filteredContent.map((item) => (
                    <tr key={item.id}>
                      <td className="content-title-cell">{item.title}</td>
                      <td>{item.type}</td>
                      <td>{item.category}</td>
                      <td>{item.ageGroup}</td>
                      <td>
                        <span
                          className={`content-status ${
                            item.status === "Published"
                              ? "published"
                              : "draft"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="content-actions">
                          <button onClick={() => handleEdit(item)}>
                            Edit
                          </button>

                          <button onClick={() => handleStatusToggle(item.id)}>
                            {item.status === "Published"
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <button
                            className="delete-action"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="content-empty">
                      No content found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageContent;

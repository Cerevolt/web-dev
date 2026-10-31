
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./managegame.css";

const initialGames = [
  {
    id: 1,
    name: "Memory Match",
    category: "Memory",
    ageGroup: "5–8 years",
    difficulty: "Easy",
    status: "Active",
  },
  {
    id: 2,
    name: "Puzzle Challenge",
    category: "Problem Solving",
    ageGroup: "8–12 years",
    difficulty: "Medium",
    status: "Active",
  },
  {
    id: 3,
    name: "Word Builder",
    category: "Language",
    ageGroup: "6–10 years",
    difficulty: "Easy",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Pattern Recognition",
    category: "Cognitive",
    ageGroup: "8–12 years",
    difficulty: "Hard",
    status: "Active",
  },
];

const ManageGame = () => {
  const [games, setGames] = useState(initialGames);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    category: "Memory",
    ageGroup: "",
    difficulty: "Easy",
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || game.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setGames((prev) =>
        prev.map((game) =>
          game.id === editingId ? { ...form, id: editingId } : game
        )
      );
    } else {
      setGames((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (game) => {
    setForm({
      name: game.name,
      category: game.category,
      ageGroup: game.ageGroup,
      difficulty: game.difficulty,
      status: game.status,
    });

    setEditingId(game.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      setGames((prev) => prev.filter((game) => game.id !== id));
    }
  };

  const handleAddNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main manage-game-page">
        <header className="page-header">
          <div>
            <h1 className="page-title">Game Management</h1>
            <p className="page-description">
              Manage and organize games available on the platform.
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleAddNew}>
            + Add New Game
          </button>
        </header>

        <section className="game-stats">
          <div className="game-stat-card">
            <span>Total Games</span>
            <h2>{games.length}</h2>
          </div>

          <div className="game-stat-card">
            <span>Active Games</span>
            <h2>{games.filter((g) => g.status === "Active").length}</h2>
          </div>

          <div className="game-stat-card">
            <span>Inactive Games</span>
            <h2>{games.filter((g) => g.status === "Inactive").length}</h2>
          </div>
        </section>

        <section className="game-content">
          <div className="game-toolbar">
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Memory">Memory</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Language">Language</option>
              <option value="Cognitive">Cognitive</option>
            </select>
          </div>

          {showForm && (
            <form className="game-form" onSubmit={handleSubmit}>
              <h2>{editingId ? "Edit Game" : "Add New Game"}</h2>

              <div className="game-form-grid">
                <div className="game-field">
                  <label>Game Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter game name"
                    required
                  />
                </div>

                <div className="game-field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Memory</option>
                    <option>Problem Solving</option>
                    <option>Language</option>
                    <option>Cognitive</option>
                  </select>
                </div>

                <div className="game-field">
                  <label>Age Group</label>
                  <input
                    name="ageGroup"
                    value={form.ageGroup}
                    onChange={handleChange}
                    placeholder="e.g. 5–8 years"
                    required
                  />
                </div>

                <div className="game-field">
                  <label>Difficulty</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="game-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="game-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update Game" : "Save Game"}
                </button>
              </div>
            </form>
          )}

          <div className="game-table-wrapper">
            <table className="game-table">
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Category</th>
                  <th>Age Group</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <tr key={game.id}>
                      <td className="game-name">{game.name}</td>
                      <td>{game.category}</td>
                      <td>{game.ageGroup}</td>
                      <td>{game.difficulty}</td>
                      <td>
                        <span
                          className={`game-status ${
                            game.status === "Active" ? "active" : "inactive"
                          }`}
                        >
                          {game.status}
                        </span>
                      </td>
                      <td>
                        <div className="game-actions">
                          <button onClick={() => handleEdit(game)}>
                            Edit
                          </button>
                          <button
                            className="delete-action"
                            onClick={() => handleDelete(game.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="game-empty">
                      No games found.
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

export default ManageGame;

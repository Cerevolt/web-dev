
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./addproduct.css";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    ageGroup: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Product details saved locally. Backend integration is pending.");
  };

  const handleReset = () => {
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      ageGroup: "",
      imageUrl: "",
    });
    setMessage("");
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
              <h1>Add Product</h1>
              <p>Add a new product to the Cerevolt platform.</p>
            </div>

            <form className="consultant-form" onSubmit={handleSubmit}>
              <h3>Product Information</h3>

              <div className="consultant-form-grid">
                <div className="form-field">
                  <label>Product Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Educational">Educational</option>
                    <option value="Sensory">Sensory</option>
                    <option value="Learning">Learning</option>
                    <option value="Therapy">Therapy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Age Group</label>
                  <select
                    name="ageGroup"
                    value={form.ageGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select age group</option>
                    <option value="3-5 years">3–5 years</option>
                    <option value="6-8 years">6–8 years</option>
                    <option value="9-12 years">9–12 years</option>
                    <option value="13+ years">13+ years</option>
                    <option value="All ages">All ages</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Product Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="form-field product-description">
                <label>Product Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows="4"
                  required
                />
              </div>

              {message && (
                <p className="consultant-form-message">{message}</p>
              )}

              <div className="consultant-form-actions">
                <button
                  type="button"
                  className="consultant-reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className="consultant-submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;

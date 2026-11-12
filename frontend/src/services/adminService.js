
import { apiGet, apiPost, apiPatch } from "./api";

const adminService = {
  // Get admin dashboard statistics
  getDashboard() {
    return apiGet("/adminpanel/dashboard/");
  },

  // Get all registered users
  getUsers() {
    return apiGet("/adminpanel/users/");
  },

  // Get details of a specific user
  getUser(userId) {
    return apiGet(`/adminpanel/users/${userId}/`);
  },

  // Create a new user
  createUser(userData) {
    return apiPost("/accounts/users/", userData);
  },

  // Update user information
  updateUser(userId, userData) {
    return apiPatch(
      `/adminpanel/users/${userId}/update/`,
      userData
    );
  },

  // Activate or deactivate a user
  updateUserStatus(userId, action) {
    return apiPost(
      `/adminpanel/users/${userId}/status/`,
      { action }
    );
  },
};

export default adminService;

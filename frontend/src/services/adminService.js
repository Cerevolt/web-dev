import { apiGet, apiPatch, apiPost } from "./api.js";

const adminService = {
  // Upstream admin user-management API.
  getDashboard() {
    return apiGet("/adminpanel/dashboard/");
  },

  getUsers() {
    return apiGet("/adminpanel/users/");
  },

  getUser(userId) {
    return apiGet(`/adminpanel/users/${userId}/`);
  },

  createUser(userData) {
    return apiPost("/accounts/users/", userData);
  },

  updateUser(userId, userData) {
    return apiPatch(`/adminpanel/users/${userId}/update/`, userData);
  },

  updateUserStatus(userId, action) {
    return apiPost(`/adminpanel/users/${userId}/status/`, { action });
  },

  // Current dashboard integration used by pages/admin/admindashboard.jsx.
  getAdminDashboard() {
    return apiGet("/adminpanel/dashboard/");
  },
};

export const getAdminDashboard = adminService.getAdminDashboard;

export default adminService;

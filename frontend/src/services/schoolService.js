import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api.js";

export const getSchoolDashboard = () => apiGet("/school/dashboard/");
export const getSchoolSummary = () => apiGet("/reports/school/summary/");

const schoolService = {
  // Upstream school class/enrollment API.
  getDashboard: getSchoolDashboard,
  getSummary: getSchoolSummary,

  getClasses() {
    return apiGet("/school/classes/");
  },

  createClass(classData) {
    return apiPost("/school/classes/", classData);
  },

  getClass(classId) {
    return apiGet(`/school/classes/${classId}/`);
  },

  updateClass(classId, classData) {
    return apiPatch(`/school/classes/${classId}/`, classData);
  },

  replaceClass(classId, classData) {
    return apiPut(`/school/classes/${classId}/`, classData);
  },

  deleteClass(classId) {
    return apiDelete(`/school/classes/${classId}/`);
  },

  getEnrollments() {
    return apiGet("/school/enrollments/");
  },

  createEnrollment(enrollmentData) {
    return apiPost("/school/enrollments/", enrollmentData);
  },

  getEnrollment(enrollmentId) {
    return apiGet(`/school/enrollments/${enrollmentId}/`);
  },

  updateEnrollment(enrollmentId, enrollmentData) {
    return apiPatch(`/school/enrollments/${enrollmentId}/`, enrollmentData);
  },

  replaceEnrollment(enrollmentId, enrollmentData) {
    return apiPut(`/school/enrollments/${enrollmentId}/`, enrollmentData);
  },

  deactivateEnrollment(enrollmentId) {
    return apiPost(`/school/enrollments/${enrollmentId}/deactivate/`, {});
  },
};

export default schoolService;

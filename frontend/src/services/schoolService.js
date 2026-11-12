
import {
  apiGet,
  apiPost,
  apiPatch,
  apiPut,
  apiDelete,
} from "./api";

const schoolService = {
  // Get school dashboard information
  getDashboard() {
    return apiGet("/school/dashboard/");
  },

  // Get all classes
  getClasses() {
    return apiGet("/school/classes/");
  },

  // Create a class
  createClass(classData) {
    return apiPost("/school/classes/", classData);
  },

  // Get a particular class
  getClass(classId) {
    return apiGet(`/school/classes/${classId}/`);
  },

  // Update a class
  updateClass(classId, classData) {
    return apiPatch(`/school/classes/${classId}/`, classData);
  },

  // Replace class details
  replaceClass(classId, classData) {
    return apiPut(`/school/classes/${classId}/`, classData);
  },

  // Delete a class
  deleteClass(classId) {
    return apiDelete(`/school/classes/${classId}/`);
  },

  // Get all student enrollments
  getEnrollments() {
    return apiGet("/school/enrollments/");
  },

  // Create a student enrollment
  createEnrollment(enrollmentData) {
    return apiPost("/school/enrollments/", enrollmentData);
  },

  // Get a particular enrollment
  getEnrollment(enrollmentId) {
    return apiGet(`/school/enrollments/${enrollmentId}/`);
  },

  // Update an enrollment
  updateEnrollment(enrollmentId, enrollmentData) {
    return apiPatch(
      `/school/enrollments/${enrollmentId}/`,
      enrollmentData
    );
  },

  // Replace enrollment details
  replaceEnrollment(enrollmentId, enrollmentData) {
    return apiPut(
      `/school/enrollments/${enrollmentId}/`,
      enrollmentData
    );
  },

  // Deactivate an enrollment
  deactivateEnrollment(enrollmentId) {
    return apiPost(
      `/school/enrollments/${enrollmentId}/deactivate/`,
      {}
    );
  },
};

export default schoolService;

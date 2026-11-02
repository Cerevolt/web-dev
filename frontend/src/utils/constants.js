export const APP_NAME = "Cerevolt";

export const USER_ROLES = {
  ADMIN: "admin",
  CHILD: "child",
  PARENT: "parent",
  CONSULTANT: "consultant",
  SCHOOL: "school",
};

export const ROUTES = {
  HOME: "/",
  ADMIN_DASHBOARD: "/admin/dashboard",
  CHILD_DASHBOARD: "/child/dashboard",
  PARENT_DASHBOARD: "/parent/dashboard",
  CONSULTANT_DASHBOARD: "/consultant/dashboard",
  CONSULTANT_ASSESSMENT: "/consultant/assessment",
  CONSULTANT_CONTENT_ADDITION: "/consultant/content-addition",
  CONSULTANT_PROGRESS_REPORT: "/consultant/progress-report",
};

export const ASSESSMENT_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
};

export const ASSESSMENT_TYPES = [
  "Learning Assessment",
  "Progress Review",
  "Behaviour Assessment",
];

export const CONTENT_TYPES = [
  "Video",
  "Article",
  "Worksheet",
  "Activity",
  "Game",
];

export const AGE_GROUPS = [
  "3–5 years",
  "6–8 years",
  "9–12 years",
  "13–15 years",
  "16–18 years",
];
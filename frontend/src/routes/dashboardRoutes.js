// Single source of truth for role-based dashboard destinations.
// Admin path is taken from the existing route in AppRoutes.jsx.
export const ROLE_DASHBOARDS = {
  admin: "/admin/dashboard",
  parent: "/parent/dashboard",
  child: "/child/dashboard",
  consultant: "/consultant/dashboard",
  school: "/school/dashboard",
};

export function getDashboardForRole(role) {
  return ROLE_DASHBOARDS[role] || "/login";
}

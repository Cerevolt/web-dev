import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { getDashboardForRole } from "./dashboardRoutes.js";

function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.status && user.status !== "approved") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Send known roles to their own portal; keep the upstream error route for
    // accounts with an unrecognised or missing role.
    const dashboard = getDashboardForRole(user.role);
    return (
      <Navigate
        to={dashboard === "/login" ? "/unauthorized" : dashboard}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RoleRoute;

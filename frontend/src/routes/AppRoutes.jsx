
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../pages/admin/admindashboard";
import AddConsultant from "../pages/admin/addconsultanat";
import AddProduct from "../pages/admin/addproduct";
import AdminReport from "../pages/admin/adminreport";
import ManageGame from "../pages/admin/managegame";
import ManageContent from "../pages/admin/managecontent";
import Settings from "../pages/admin/settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-doctor" element={<AddConsultant />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/reports" element={<AdminReport />} />
      <Route path="/admin/manage-games" element={<ManageGame />} />
      <Route path="/admin/manage-content" element={<ManageContent />} />
      <Route path="/admin/settings" element={<Settings />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;

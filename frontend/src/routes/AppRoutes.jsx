
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/admindashboard";
import AddConsultant from "../pages/admin/addconsultanat";
import AddProduct from "../pages/admin/addproduct";
import AdminReport from "../pages/admin/adminreport";
import ManageGame from "../pages/admin/managegame";
import ManageContent from "../pages/admin/managecontent";
import Settings from "../pages/admin/settings";

import Home from "../pages/common/home";
import About from "../pages/common/about";
import NotFound from "../pages/common/notfound";

import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";

import ChildDashboard from "../pages/children/childdashboard.jsx";
import DailyGoals from "../pages/children/dailygoals.jsx";
import PlayGames from "../pages/children/playgames.jsx";
import Flashcards from "../pages/children/flashcards.jsx";
import SolveAssessments from "../pages/children/solveassesments.jsx";
import WatchVideos from "../pages/children/watchvideos.jsx";
import Reward from "../pages/children/reward.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />

      {/* Admin pages */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-doctor" element={<AddConsultant />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/reports" element={<AdminReport />} />
      <Route path="/admin/manage-games" element={<ManageGame />} />
      <Route path="/admin/manage-content" element={<ManageContent />} />
      <Route path="/admin/settings" element={<Settings />} />

      {/* Children's pages */}
      <Route path="/child/dashboard" element={<ChildDashboard />} />
      <Route path="/child/goals" element={<DailyGoals />} />
      <Route path="/child/games" element={<PlayGames />} />
      <Route path="/child/flashcards" element={<Flashcards />} />
      <Route path="/child/assessments" element={<SolveAssessments />} />
      <Route path="/child/videos" element={<WatchVideos />} />
      <Route path="/child/rewards" element={<Reward />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

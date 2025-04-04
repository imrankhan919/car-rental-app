import React, { useState } from "react";
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import {
  PlusCircle,
  Car,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  Trash2,
  Edit,
  Star,
} from "lucide-react";
import Sidebar from "../components/ui/admin/SideBar";
import AllCarsPage from "../components/ui/admin/AllCarsPage";
import AllRentalsPage from "../components/ui/admin/AllRentalsPage";
import AllReviews from "../components/ui/admin/AllReviews";

function AdminDashboard() {
  return (
    <div className="flex h-[calc(100vh-73px)]">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;

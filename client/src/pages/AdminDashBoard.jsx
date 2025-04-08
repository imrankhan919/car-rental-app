import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
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
import { useSelector } from "react-redux";

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/profile");
    }
  }, [user]);

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

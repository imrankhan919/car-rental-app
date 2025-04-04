import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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
// Admin Dashboard Components
function Sidebar() {
  const location = useLocation();
  const isActive = (string) => location.pathname === string;

  return (
    <div className="w-64 bg-white h-full shadow-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <nav className="mt-4">
        <Link
          to="/admin"
          className={`flex items-center space-x-2 px-4 py-2 ${
            isActive("/admin") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <Car size={20} />
          <span>Cars</span>
        </Link>
        <Link
          to="/admin/rentals"
          className={`flex items-center space-x-2 px-4 py-2 ${
            isActive("/admin/rentals") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <ClipboardList size={20} />
          <span>Rentals</span>
        </Link>
        <Link
          to="/admin/reviews"
          className={`flex items-center space-x-2 px-4 py-2 ${
            isActive("/admin/reviews") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <MessageSquare size={20} />
          <span>Reviews</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

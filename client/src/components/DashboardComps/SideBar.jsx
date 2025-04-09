import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, Calendar, Users, Star, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const {user} = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Cars", path: "/admin/cars", icon: Car },
    { name: "Rentals", path: "/admin/rentals", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200 shadow-md transition-all duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className={`p-6 ${isCollapsed ? "flex justify-center" : ""}`}>
          <Link to="/admin" className={`text-xl font-bold ${isCollapsed ? "hidden" : ""}`}>Car Rental Admin</Link>
          {isCollapsed && <Car size={24} className="text-blue-600" />}
        </div>

        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white rounded-full border border-gray-200 shadow-md"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <nav className="mt-6">
          <ul>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    title={isCollapsed ? item.name : ""}
                  >
                    <item.icon
                      size={20}
                      className={`${isActive ? "text-blue-600" : "text-gray-500"} ${isCollapsed ? "" : "mr-3"}`}
                    />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`absolute bottom-0 w-full p-6 ${isCollapsed ? "hidden" : ""}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";
import { Car, LogOut, Menu, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black/30 dark:bg-gray-900/30 backdrop-blur-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-2xl font-bold text-white">CARWALA</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Home
            </Link>
            <Link to="/search/all" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Vehicles
            </Link>
            <a href="#" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              About
            </a>
            <a href="#" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                {user.isAdmin ? (
                  <Link to="/admin" className="flex items-center bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition-all">
                    <span className="ml-2">Admin</span>
                  </Link>
                ) : <Link to="/my-rentals" className="flex items-center text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
                <User className="h-5 w-5" />
                <span className="ml-2">My Rentals</span>
              </Link>}
                <button onClick={handleLogOut} className="flex items-center bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-all">
                <User className="h-5 w-5" />
                <span className="ml-2">Login</span>
              </Link>
            )}
            <button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

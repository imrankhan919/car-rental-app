import { User } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            CarRental
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {
                  user.isAdmin ? (<Link className="mx-4 font-semibold" to={"/auth/admin"}>
                    Welcome Admin
                  </Link>) : (<Link className="mx-4 font-semibold" to={"/auth/profile"}>
                    Welcome {user.name}
                  </Link>)
                }

                <button
                  onClick={handleLogout}
                  className="bg-red-400 py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer text-white font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
              >
                <User size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

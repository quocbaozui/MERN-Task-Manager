import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sm:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          Task Manager
        </Link>
      </div>

      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-medium opacity-70">
              Xin chào,{" "}
              <span className="text-secondary font-bold">{user.username}</span>
            </span>

            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="btn btn-outline btn-error btn-sm"
            >
              Logout
            </button>

            <div className="avatar placeholder online cursor-pointer">
              <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                <span className="text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-active btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

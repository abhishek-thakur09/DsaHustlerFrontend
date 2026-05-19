import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slice/AuthSlice";
import api from "../utils/api"

const Logo = () => {
  return (
    <div className="cursor-pointer transition-all duration-600 ease-in-out hover:scale-105 tracking-tight">
      <span className="text-blue-500 font-medium text-4xl hover:text-blue-400 sm:text-5xl">
        DSA
      </span>
      <span className="text-white font-light text-3xl sm:text-4xl">
        hustler
      </span>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(logout());

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Logo />
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 text-gray-400">
          <button
            onClick={() => navigate("/problems")}
            className={`hover:text-white ${location.pathname === "/problems" ? "text-white" : ""}`}
          >
            Problems
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-white"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-white"
          >
            About
          </button>
        </div>

        {/* AUTH BUTTONS OR PROFILE */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Photo Trigger */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={user?.profileImage || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover hover:border-blue-400 transition"
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white font-medium truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    My Profile
                  </button>
                  {/* <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </button> */}
                  <hr className="border-gray-700 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white hover:text-gray-300"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 rounded-lg bg-blue-400 text-black font-medium hover:bg-blue-300 transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 px-6 py-4 space-y-4 border-t border-gray-800">
          <button
            onClick={() => navigate("/problems")}
            className="block text-gray-300 w-full text-left"
          >
            Problems
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="block text-gray-300 w-full text-left"
          >
            Contact
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="block text-gray-300 w-20 text-left"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-20 text-center py-2 rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="block text-white w-20 text-left"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="w-20 py-2 rounded-lg bg-blue-400 text-black text-center"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

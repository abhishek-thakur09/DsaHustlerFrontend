import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn, logout, loading } = useContext(AuthContext);

  console.log(isLoggedIn);


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (loading) return null;

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div onClick={() => navigate("/")}>
          <Logo />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8 text-gray-400">
          {isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/problems")}
                className={`hover:text-white ${
                  location.pathname === "/problems" ? "text-white" : ""
                }`}
              >
                Problems
              </button>

              <button
                onClick={() => navigate("/profile")}
                className={`hover:text-white ${
                  location.pathname === "/profile" ? "text-white" : ""
                }`}
              >
                Profile
              </button>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white hover:text-gray-300"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-blue-400 text-black font-medium hover:bg-blue-300 transition"
              >
                Get Started
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
        <div className="lg:hidden bg-gray-900 px-6 py-4 space-y-4">
          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate("/problems");
                  setIsOpen(false);
                }}
                className="block text-gray-300 hover:text-white"
              >
                Problems
              </button>

              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="block text-gray-300 hover:text-white"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block text-white px-4 py-2 rounded-lg bg-red-500"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="block text-white"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="block px-4 py-2 rounded-lg bg-blue-400 text-black"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

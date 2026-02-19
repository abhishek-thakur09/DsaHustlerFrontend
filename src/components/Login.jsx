import React, { useState } from "react";
import { setUser } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/api";


const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    // store user in redux
    dispatch(setUser(res.data.user)); // or res.data (depends on your API)
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex w-full h-screen bg-black overflow-hidden">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 h-full">
        <img src="/Side.png" alt="Side" className="w-80 h-auto object-cover" />
      </div>

      {/* RIGHT LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="relative group">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[360px] blur-[80px] rounded-3xl group-hover:bg-blue-500/70" />

          <div className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl">
            <div className="text-center mb-6 text-3xl font-bold">
              DSA<span className="text-red-500">hustler</span>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-2">Welcome</h2>
            <p className="text-center text-gray-500 mb-6">
              Log in to DSAhustler
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500"
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

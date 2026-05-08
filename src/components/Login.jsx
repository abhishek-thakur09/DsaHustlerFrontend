import React, { useEffect, useState } from "react";
import { setUser } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3333/auth/google";
  };

  const githubLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3333/auth/github";
  };

  return (
    <div className="flex w-full h-screen bg-black overflow-hidden">
      <div className="w-full flex items-center justify-center px-4">
        <div className="relative group">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[360px] blur-[80px] rounded-3xl group-hover:bg-blue-500/70" />
          <div className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl">
            <div className="text-center mb-6 text-3xl font-bold">
              DSA<span className="text-blue-500">hustler</span>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-2">Welcome</h2>
            <p className="text-center text-gray-500 mb-6">Log in to DSAhustler</p>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form className="space-y-5" onSubmit={handleLogin}>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Log In</button>
              <div className="flex justify-around gap-4">
                <button type="button" className="bg-gray-400 px-5 m-2" onClick={googleLogin}>Google</button>
                {/* <button type="button" onClick={githubLogin}>Github</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
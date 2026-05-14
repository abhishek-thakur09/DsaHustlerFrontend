import React, { useEffect, useState } from "react";
import { setUser } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import { motion } from "framer-motion"; // Make sure to use 'framer-motion'

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

 return (
    <div className="flex w-full h-screen bg-[#020617] items-center justify-center overflow-hidden font-sans relative">
      
      {/* Background Ambient Glows - Focused on Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[380px] px-4" // Constrained width
      >
        {/* Glow Border Wrapper */}
        <div className=" hover:bg-gradient-to-b  hover:from-blue-500/50 to-transparent rounded-[1rem] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          
          <div className="bg-[#0f172a]/90 backdrop-blur-2xl p-8 rounded-[1rem]">
            
            {/* Logo Section - Scaled Down */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                DSA<span className="text-blue-500">hustler</span>
              </h1>
              <p className="text-slate-400 mt-1 text-xs uppercase tracking-widest">Login</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-xs text-center mb-4"
              >
                {error}
              </motion.div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1 ml-1 tracking-wider">Email</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full bg-black/40 border border-slate-800 text-white px-4 py-2.5 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm placeholder:text-slate-700" 
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1 ml-1 tracking-wider">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-black/40 border border-slate-800 text-white px-4 py-2.5 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm placeholder:text-slate-700" 
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all mt-2"
              >
                Continue
              </motion.button>

              <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-slate-600 text-[10px] uppercase font-bold">OR</span>
                  <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <button 
                type="button" 
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-2 bg-slate-900/50 border border-slate-800 py-2.5 rounded-xl text-white hover:bg-slate-800 transition-all text-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" />
                <span className="font-medium">Google</span>
              </button>
            </form>

            <p className="text-center text-slate-500 mt-6 text-xs">
              New here? <a href="/signup" className="text-blue-500 hover:text-blue-400 font-bold">Create account</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
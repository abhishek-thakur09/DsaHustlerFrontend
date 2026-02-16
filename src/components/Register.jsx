import React, { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      return toast.error("Required fields missing");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.post("/auth/signin", {
        name: form.firstName,   
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      toast.success("Registration successful");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(err?.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-3xl bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}
            <div>
              <label className="text-sm text-slate-300">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-slate-300">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-slate-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg text-white"
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-blue-500 to-indigo-600 
            hover:scale-[1.02] disabled:opacity-50"

            onClick={()=>{
                navigate("/login")
            }}

          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;

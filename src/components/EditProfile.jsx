import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slice/AuthSlice";
import { motion } from "framer-motion";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    likedInProfile: "",
    GithubProfile: "",
    Bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        lastName: user.lastName || "",
        likedInProfile: user.likedInProfile || "",
        GithubProfile: user.GithubProfile || "",
        Bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.patch("/auth/update", formData);

      dispatch(setUser(res.data.user));

      alert("Profile updated successfully!");

      navigate("/profile");
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">
              Edit Profile
            </h2>

            <p className="text-gray-400 mt-2">
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                First Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-4 bg-[#1e293b] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Last Name
              </label>

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-4 bg-[#1e293b] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                LinkedIn Profile
              </label>

              <input
                name="likedInProfile"
                value={formData.likedInProfile}
                onChange={handleChange}
                placeholder="LinkedIn Profile"
                className="w-full p-4 bg-[#1e293b] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Github */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Github Profile
              </label>

              <input
                name="GithubProfile"
                value={formData.GithubProfile}
                onChange={handleChange}
                placeholder="Github Profile"
                className="w-full p-4 bg-[#1e293b] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* BIO */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Bio
              </label>

              <textarea
                name="Bio"
                value={formData.Bio}
                onChange={handleChange}
                rows="5"
                placeholder="Tell something about yourself..."
                className="w-full p-4 bg-[#1e293b] border border-slate-700 rounded-xl text-white outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
              }`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
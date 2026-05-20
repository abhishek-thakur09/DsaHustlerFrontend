import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileUpload from "./ProfileUpdate";
import api from "../utils/api";
import SubmissionHeatmap from "./HeatMap";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [totalproblem, settotalProblems] = useState(0);
  const [stats, setStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    totalSolved: 0,
  });
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const probRes = await api.get("/api/problems?page=1&limit=1");
        settotalProblems(probRes.data.total);

        const statsRes = await api.get("/auth/user-stats");
        setStats(statsRes.data);

        const activityRes = await api.get("/auth/user-activity");
        setActivityData(activityRes.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      }
    };

    if (user) fetchProfileData();
  }, [user]);

  if (!user) return <h1 className="text-white">Please login</h1>;

  return (
    <>
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION*/}
        <div className="bg-[#0f172a] p-6 rounded-2xl glow-card border border-white/5">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <ProfileUpload />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 group-hover:border-blue-500 transition-colors pointer-events-none z-20" />{" "}
            </div>

            <h2 className="text-2xl mt-4 font-bold tracking-tight">
              {user.name} <span>{user.lastName}</span>
            </h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          <button
            onClick={() => navigate("/updateProfile")}
            className="w-full mt-6 bg-blue-600/10 border border-blue-500/50 text-blue-400 py-2.5 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-all"
          >
            Edit Profile
          </button>

          <div className="mt-8 space-y-4 pt-6 border-t border-white/5 text-sm text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-500">Role</span>
              <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs">
                {user.role || "User"}
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-gray-500">Bio</span>
              <span>{user.bio}</span>
            </div>
            <div className="pt-2">
              <p className="text-gray-500 mb-1">LinkedIn</p>
              <a
                href={user.linkedInProfile}
                className="text-blue-400 hover:underline truncate block text-xs"
              >
                {user.linkedInProfile || "Not linked"}
              </a>
            </div>
            <div>
              <p className="text-gray-500 mb-1">GitHub</p>
              <a
                href={user.githubProfile}
                className="text-blue-400 hover:underline truncate block text-xs"
              >
                {user.githubProfile || "Not linked"}
              </a>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION*/}
        <div className="bg-[#0f172a] p-8 rounded-2xl glow-card border border-white/5 flex flex-col items-center justify-center">
          <h3 className="text-gray-400 font-medium mb-6 uppercase tracking-widest text-xs">
            Solved Problems
          </h3>

          {/* Use stats from your state here! */}
          <div className="text-6xl font-black text-white mb-2">
            {stats.totalSolved}
            <span className="text-gray-600 text-2xl font-normal">
              /{totalproblem}
            </span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-1000"
              style={{ width: `${(stats.totalSolved / totalproblem) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 w-full">
            <div className="text-center">
              <p className="text-green-500 text-xs font-bold uppercase mb-1">
                Easy
              </p>
              <p className="text-xl font-bold">{stats.easy}</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-500 text-xs font-bold uppercase mb-1">
                Medium
              </p>
              <p className="text-xl font-bold">{stats.medium}</p>
            </div>
            <div className="text-center">
              <p className="text-red-500 text-xs font-bold uppercase mb-1">
                Hard
              </p>
              <p className="text-xl font-bold">{stats.hard}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-[#0f172a] p-6 rounded-2xl glow-card border border-white/5">
          <h3 className="text-gray-400 font-medium mb-6 uppercase tracking-widest text-xs">
            Achievements
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-16 h-16 bg-white/5 rounded-full border border-dashed border-white/20 flex items-center justify-center text-[10px] text-gray-500 text-center p-2">
              Locked
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITY SECTION */}
      <div className="max-w-6xl mx-auto mt-8 bg-[#0f172a] p-8 rounded-2xl glow-card border border-white/5">
        <h3 className="text-gray-400 font-medium mb-8 uppercase tracking-widest text-xs">
          Submissions
        </h3>
        <div className="w-full text-amber-50">
          <SubmissionHeatmap data={activityData} />
        </div>
      </div>
    </div>
      </>
  );
};

export default Profile;

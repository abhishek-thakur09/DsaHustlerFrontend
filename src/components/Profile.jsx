import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {ProblemsContext} from "../context/ProblemContext";
import { useNavigate } from "react-router-dom";




const Profile = () => {
  const { user, loading, updateUser} = useContext(AuthContext);
  const { total } = useContext(ProblemsContext);
const navigate = useNavigate();



  if (loading) return <h1 className="text-white">Loading...</h1>;

  if (!user) return <h1 className="text-white">Please login</h1>;

  return (
    <>
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="bg-[#0f172a] p-6 rounded-xl">

          <img
            src="https://thumbs.dreamstime.com/b/autumn-nature-landscape-colorful-forest-autumn-nature-landscape-colorful-forest-morning-sunlight-131400332.jpg"
            className="h-32 w-32 rounded-full mx-auto object-cover"
          />

          <h2 className="text-xl text-center mt-4 font-semibold">
            {user.name}
          </h2>

          <p className="text-gray-400 text-center">
            {user.email}
          </p>

          <button onClick={()=>{
            navigate("/updateProfile")
          }} className="w-full mt-4 bg-green-900 py-2 rounded-lg  border-cyan-400 text-cyan-300
              hover:bg-white/10">
            Edit Profile
          </button>

          <div className="mt-6 space-y-2 text-gray-300">
            <p>🌍 India</p>
            <p>🧑 Role: {user.role || "User"}</p>
          </div>
        </div>

        {/* MIDDLE STATS */}
        <div className="bg-[#0f172a] p-6 rounded-xl flex flex-col items-center">

          <h3 className="text-lg mb-4">Solved Problems</h3>

          <div className="text-5xl font-bold">
            0
            <span className="text-gray-500 text-xl">/{total}</span>
          </div>

          <p className="text-green-400 mt-2">Solved</p>

          <div className="grid grid-cols-3 gap-3 mt-6 w-full text-center">

            <div className="bg-gray-800 p-2 rounded">
              <p className="text-green-400">Easy</p>
              <p>0</p>
            </div>

            <div className="bg-gray-800 p-2 rounded">
              <p className="text-yellow-400">Medium</p>
              <p>0</p>
            </div>

            <div className="bg-gray-800 p-2 rounded">
              <p className="text-red-400">Hard</p>
              <p>0</p>
            </div>

          </div>
        </div>

        {/* RIGHT BADGES */}
        <div className="bg-[#0f172a] p-6 rounded-xl">

          <h3 className="text-lg mb-4">Badges</h3>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-gray-800 p-3 rounded text-center">
              
            </div>

            <div className="bg-gray-800 p-3 rounded text-center">
             
            </div>

            <div className="bg-gray-800 p-3 rounded text-center">
            
            </div>

          </div>
        </div>

      </div>

      {/* ACTIVITY SECTION */}
      <div className="max-w-6xl mx-auto mt-6 bg-[#0f172a] p-6 rounded-xl">

        <h3 className="mb-4">Submissions Activity</h3>

        <div className="grid grid-cols-12 gap-1">

          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 bg-green-700 rounded-sm opacity-70"
            />
          ))}

        </div>

      </div>

    </div>
    </>
  );
};

export default Profile;

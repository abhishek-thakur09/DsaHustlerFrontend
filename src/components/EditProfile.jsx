import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import ProfileUpload from "../components/ProfileUpdate";

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    likedInProfile: "",
    GithubProfile: "",
  });

  if (!user) return <h1 className="text-white">Please login</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== ""),
    );

    if (Object.keys(filteredData).length === 0) {
      alert("No changes made");
      return;
    }

    try {
      const res = await api.patch("/auth/update", filteredData);
      
      updateUser(res.data.user);
      navigate("/profile");
      console.log(res.data.user);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[#0f172a] p-6 rounded-xl text-white">
      <h2 className="text-xl mb-6 text-center">Edit Profile</h2>

      {/* Profile Image Upload */}
      <ProfileUpload />

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          name="name"
          placeholder={user.name || "First Name"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="lastName"
          placeholder={user.lastName || "Last Name"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="likedInProfile"
          placeholder={user.likedInProfile || "LinkedIn Profile"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="GithubProfile"
          placeholder={user.GithubProfile || "GitHub Profile"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <button className="w-full bg-green-900 py-2 rounded hover:bg-green-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

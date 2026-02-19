import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slice/AuthSlice";

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
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        lastName: user.lastName || "",
        likedInProfile: user.likedInProfile || "",
        GithubProfile: user.GithubProfile || "",
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
    e.preventDefault(); // prevent reload

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
    <div className="max-w-xl mx-auto mt-10 bg-[#0f172a] p-6 rounded-xl text-white">
      <h2 className="text-xl mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          name="name"
          placeholder={user?.name || "First Name"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="lastName"
          placeholder={user?.lastName || "Last Name"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="likedInProfile"
          placeholder={user?.likedInProfile || "LinkedIn Profile"}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="GithubProfile"
          placeholder={user?.GithubProfile || "GitHub Profile"}
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

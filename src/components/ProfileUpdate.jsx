import React, { useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileUpload = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <h1 className="text-white">Please login</h1>;

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await api.post("/auth/upload", formData, {
        withCredentials: true,
      });

      // ⭐ update global user state
      updateUser(res.data.user);

      // ⭐ redirect to profile page
      // navigate("/profile");

      // // optional hard refresh
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-40 h-40 mx-auto">

      <img
        src={user.profileImage || "/default-avatar.png"}
        alt="profile"
        className="w-full h-full rounded-full object-cover cursor-pointer border-4 border-green-500"
        onClick={() => document.getElementById("profileUpload").click()}
      />

      <input
        type="file"
        id="profileUpload"
        className="hidden"
        onChange={handleChange}
      />

    </div>
  );
};

export default ProfileUpload;

import React from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slice/AuthSlice";
 

const ProfileUpload = () => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await api.post("/auth/upload", formData);

      dispatch(setUser(res.data.user));
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="relative group w-32 h-32 lg:w-40 lg:h-40">
      <label htmlFor="profileUpload" className="cursor-pointer block h-full w-full">
        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-blue-500 transition-all duration-300 group-hover:border-blue-500 shadow-lg group-hover:shadow-blue-500/20">
          
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="profile"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-bold uppercase tracking-tighter">
              Change Photo
            </span>
          </div>
        </div>

        <input
          type="file"
          id="profileUpload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ProfileUpload;
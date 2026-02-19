import React from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const ProfileUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const user = useSelector((state) => state.auth.user);

if (!user) return <h1 className="text-white">Loading...</h1>;


const handleChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // validate file
  if (!file.type.startsWith("image/")) {
    alert("Please upload an image");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await api.post("/auth/upload", formData);

    // update redux user globally
    dispatch(setUser(res.data.user));

    console.log("Profilephoto updated:", res.data.user);

  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="relative w-40 h-40 mx-auto">
      <img
        src={user?.profileImage || "/default-avatar.png"}
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

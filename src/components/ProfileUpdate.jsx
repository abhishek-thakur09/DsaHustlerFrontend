import React, { useState } from "react";
import api from "../utils/api";

const ProfileUpload = () => {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const img = e.target.files[0];

    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await api.post("/auth/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
       withCredentials: true,
    });

    alert("Uploaded: " + res.data.url);
  };

  return (
    <form onSubmit={handleSubmit}>

      <input type="file" onChange={handleChange} />

      {preview && <img src={preview} width="150" />}

      <button>Upload</button>

    </form>
  );
};

export default ProfileUpload;

import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");

        // FIX 1 → store actual data
        setUsers(res.data.data || res.data); // depends on your backend
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);



  const handleUser = async(id)=>{

    try{
      await api.delete(`/auth/user-delete/${id}`);

      console.log(id);
      alert("user deleted successfully!!");
      window.location.reload();
    }
    catch(err){
       console.log(err);
    }

  }

return (
  <>
    {/* Header */}
    <div className="bg-black py-10 text-center">
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold
        bg-gradient-to-r from-purple-400 to-pink-500
        bg-clip-text text-transparent"
      >
        Manage Users
      </h1>

      {/* User count */}
      <p className="text-gray-400 mt-3">
        Total Users: {users.length}
      </p>
    </div>

    {/* Users Container */}
    <div className="flex flex-wrap justify-center gap-8 p-10 bg-black h-1/5">

      {/* If no users */}
      {users.length === 0 && (
        <p className="text-gray-500 text-2xl">No users found</p>
      )}

      {users.map((item) => (
        <div
          key={item._id}
          className="flex flex-col items-center 
          bg-[#0f172a] border border-slate-800  rounded-2xl shadow-lg w-72 p-6
          transition duration-300 hover:shadow-2xl"
        >
          {/* Profile Image */}
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            src={item.profileImage || "/default-avatar.png"}
            alt="profile"
          />

          {/* Name */}
          <h2 className="mt-4 text-lg font-semibold text-white">
            {item.name}
          </h2>

          {/* Email */}
          <p className="text-gray-500 text-sm">{item.email}</p>

          {/* Role Badge (optional) */}
          {item.role && (
            <span
              className={`mt-2 px-3 py-1 text-xs rounded-full
              ${item.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-gray-600"}`}
            >
              {item.role}
            </span>
          )}

          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm("Delete this user?")) {
                handleUser(item._id);
              }
            }}
            className="mt-5 w-full py-2
            bg-red-500 text-white rounded-lg font-medium
            hover:bg-red-600 transition"
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  </>
);
};

export default ManageUsers;

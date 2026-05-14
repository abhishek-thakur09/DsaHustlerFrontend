import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");

        setUsers(res.data.data || res.data); 
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
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      {/* Header Section */}
      <div className="py-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Manage Users
        </h1>
        <p className="text-gray-400 mt-3 font-medium">
          Total Registered Users: {users.length}
        </p>
      </div>

      {/* Users Grid Container */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 p-10">
        {users.length === 0 ? (
          <div className="flex flex-col items-center mt-20">
             <p className="text-gray-500 text-2xl animate-pulse">No users found</p>
          </div>
        ) : (
          users
            .filter((user) => user.role !== "admin")
            .map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center bg-[#0f172a] border border-white/5 rounded-2xl shadow-xl w-72 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 group"
              >
                {/* Profile Image */}
                <div className="relative">
                  <img
                    className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/20 group-hover:border-purple-500 transition-colors"
                    src={item.profileImage || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>

                {/* Info */}
                <h2 className="mt-4 text-lg font-semibold text-white truncate w-full text-center">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm truncate w-full text-center">
                  {item.email}
                </p>

                {/* Role Badge */}
                <span className="mt-3 px-3 py-0.5 text-[10px] uppercase tracking-widest rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.role || "User"}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
                      handleUser(item._id);
                    }
                  }}
                  className="mt-6 w-full py-2.5 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl font-medium hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  Delete User
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

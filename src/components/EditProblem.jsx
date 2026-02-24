import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const ManageProblems = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // fetch problems
  const fetchProblems = async () => {
    try {
      let allProblems = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const res = await api.get(`/api/problems?page=${page}&limit=20`);

        allProblems = [...allProblems, ...res.data.problems];
        totalPages = res.data.totalPages; // backend must send this
        page++;
      }

      setProblems(allProblems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // delete problem
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/delete-problem/${id}`);
      alert("Problem deleted");

      // refresh list
      fetchProblems();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProblems = problems.filter((problem) =>
  problem.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className=" bg-black min-h-[calc(100vh-80px)] text-white   mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Problems</h1>

      <div>
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 p-3 w-96 bg-[#0f172a] border border-slate-700 rounded"
        />
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {filteredProblems.map((problem) => (
          <div
            key={problem._id}
            className="flex justify-between items-center 
        bg-[#0f172a] border border-slate-800 rounded-xl px-6 py-4 w-96
        hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10
        transition-all duration-300 cursor-pointer"
          >
            <span className="block w-1/3 ">{problem.title}</span>

            {/* EDIT */}
            <button
              className="bg-yellow-300 px-4 m-2 rounded-xl"
              onClick={() => navigate(`/edit-problem/${problem._id}`)}
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              className="bg-red-600 px-4 m-2 rounded-xl"
              onClick={() => handleDelete(problem._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProblems;

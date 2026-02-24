import React, { useState } from "react";
import api from "../utils/api";

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    tags: "",
    constraints: "",
    functionSignature: "",
    testCases: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const addproblem = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/problem", {
        ...formData,
        tags: formData.tags.split(","),
        testCases: JSON.parse(formData.testCases)
      });

      setSuccess(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Try again");
      setSuccess("");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-black py-10 text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold
          bg-gradient-to-r from-purple-400 to-pink-500
          bg-clip-text text-transparent"
        >
          Add New Problem
        </h1>
      </div>

      {/* Form Container */}
      <div className="min-h-screen text-stone-50 bg-black flex justify-center items-start p-10">

        <form
          onSubmit={addproblem}
          className=" bg-[#0f172a] border border-slate-800  shadow-xl  rounded-2xl p-8 w-full max-w-2xl space-y-5"
        >
          {/* Title */}
          <input
            name="title"
            placeholder="Problem Title"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Problem Description"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Difficulty*/}
          <select
            name="difficulty"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>

          {/* Tags */}
          <input
            name="tags"
            placeholder="Tags (comma separated → array,string,dp)"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Constraints */}
          <textarea
            name="constraints"
            placeholder="Constraints"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Function Signature */}
          <input
            name="functionSignature"
            placeholder="Function Signature (ex: int twoSum(vector<int>& nums))"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Test Cases */}
          <textarea
            name="testCases"
            placeholder='TestCases JSON → [{"input":"1","output":"2"}]'
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Button */}
          <button
            className="w-full py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-purple-500 to-pink-500
            hover:opacity-90 transition"
          >
            Add Problem
          </button>

          {/* Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </>
  );
};

export default AddProblem;
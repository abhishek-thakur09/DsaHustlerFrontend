import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTotalProblems } from "../Slice/ProblemSlice";

const Problems = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [problems, setProblems] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [
    "Array",
    "Two Pointer",
    "DP",
    "Graph",
    "Tree",
    "backtrack",
    "binary search",
    "binary tree",
  ];


const handleDifficulty = async (level) => {
  try {
    setDifficulty(level);

    const res = await api.get(`/api/difficultylevel/${level}`);

    setProblems(res.data.problems);

  } catch (error) {
    console.log("Error fetching difficulty:", error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/problems?page=${page}&limit=${limit}`);

      console.log(res);
      setProblems(res.data.problems);
      setTotalPages(res.data.totalPages);
      dispatch(setTotalProblems(res.data.totalPages));
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchAllProblems = async () => {
      try {
        let currentPage = 1;
        let total = 1;
        let allProblems = [];

        //fetching all problems
        while (currentPage <= total) {
          const res = await api.get(
            `/api/problems?page=${currentPage}&limit=${limit}`,
          );

          allProblems = [...allProblems, ...res.data.problems];

          total = res.data.totalPages;

          currentPage++;
        }

        // store ALL problems
        setAllProblems(allProblems);
        setProblems(allProblems);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchAllProblems();
  }, []);

  const getVisiblePages = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

    // always show exactly 3
    if (end - start < 2) {
      if (start === 1) {
        end = Math.min(3, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 2);
      }
    }

    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  // handling tags
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // for tags 
  useEffect(() => {
    // if no tag selected → show all
    if (selectedTags.length === 0) {
      setProblems(allProblems);
      return;
    }

    // filter problems
    const filtered = allProblems.filter((problem) =>
      problem.tags?.some((tag) => selectedTags.includes(tag)),
    );

    setProblems(filtered);
  }, [selectedTags, allProblems]);

  return (
    <>
      <div className=" bg-black min-h-[calc(100vh-80px)]  mx-auto px-6 py-8">
        {/* Heading */}
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-white mb-8">All Problems</h1>
        </div>
        {/* TAG FILTER */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full border transition
      ${
        selectedTags.includes(tag)
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-[#0f172a] text-slate-300 border-slate-700 hover:border-blue-500"
      }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Problems Container */}
        <div className="space-y-4">
          {problems.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center 
        bg-[#0f172a] border border-slate-800 rounded-xl px-6 py-4
        hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10
        transition-all duration-300 cursor-pointer"
              onClick={() => {
                navigate(`/singleProblem/${p._id}`);
              }}
            >
              {/* Title */}
              <div className="text-slate-200 font-medium">{p.title}</div>

              {/* Difficulty Badge */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
          ${
            p.difficulty === "easy"
              ? "bg-green-500/20 text-green-400"
              : p.difficulty === "medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
              >
                {p.difficulty}
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3 bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 shadow-lg">
            {/* Previous */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 
        hover:bg-blue-500 hover:text-white transition disabled:opacity-40"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            {getVisiblePages().map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-4 py-2 rounded-lg transition
          ${
            page === num
              ? "bg-blue-500 text-white shadow-md"
              : "bg-slate-800 text-slate-300 hover:bg-blue-500 hover:text-white"
          }`}
              >
                {num}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 
        hover:bg-blue-500 hover:text-white transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problems;

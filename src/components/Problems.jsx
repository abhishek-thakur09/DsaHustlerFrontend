import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTotalProblems } from "../Slice/ProblemSlice";
import { useProblem } from "../hooks/useProblem";
import { motion } from "framer-motion";
import api from "../utils/api";

const Problems = () => {
  const [allProblems, setAllProblems] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const { problems } = useProblem();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allTags = [
    "array",
    "two-pointers",
    "fast-slow-pointers",
    "sliding-window",
    "kadane",
    "prefix-sum",
    "merge-intervals",
    "cyclic-sort",
    "linked-list",
    "stack",
    "queue",
    "hash-map",
    "binary-search",
    "graph",
    "bfs",
    "dfs",
    "matrix",
    "two-heaps",
    "subsets",
    "bitwise",
    "top-k-elements",
    "k-way-merge",
    "greedy",
    "dynamic-programming",
    "backtracking",
    "trie",
    "topological-sort",
    "union-find",
    "tree",
    "binary-tree",
  ];

  useEffect(() => {
    const fetchSolved = async () => {
      try {
        const activityRes = await api.get("/auth/user-activity");

        const solvedIds = activityRes.data.flatMap((item) => item.problems);

        setSolvedProblems(solvedIds);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchSolved();
    }
  }, [user]);

  // Sync hook data to local state
  useEffect(() => {
    if (problems) {
      setAllProblems(problems);
      setFilteredProblems(problems);
      dispatch(setTotalProblems(problems.length));
    }
  }, [problems, dispatch]);

  // Tag filtering logic
  useEffect(() => {
    let filtered = allProblems;

    // TAG FILTER
    if (selectedTags.length > 0) {
      filtered = filtered.filter((problem) =>
        problem.tags?.some((tag) => selectedTags.includes(tag)),
      );
    }

    // SEARCH FILTER
    if (debouncedSearch.trim() !== "") {
      filtered = filtered.filter((problem) =>
        problem.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    setFilteredProblems(filtered);
  }, [selectedTags, debouncedSearch, allProblems]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 4, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-black min-h-[calc(100vh-80px)] mx-auto px-6 py-8">
        {/* Heading */}
        <div className="flex justify-between items-center align-center">
          <h1 className="text-3xl font-bold text-white mb-8">All Problems</h1>

          <input
            type="text"
            placeholder="Search problem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 rounded-2xl p-3 h-10 text-white outline-none border border-gray-600 focus:border-blue-500"
          />
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

        {/* Problems List */}
        <div className="space-y-4 w-1/2">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((p) => {
              const solved = solvedProblems.includes(p.title);
              return (
                <div
                  key={p._id}
                  className="flex justify-between items-center 
                bg-[#0f172a] border border-slate-800 rounded-xl px-6 py-4
                hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10
                transition-all duration-300 cursor-pointer 
                hover:translate-y-1"
                  onClick={() => navigate(`/singleProblem/${p._id}`)}
                >
                  {solved && <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400">solved</span>}
                  <div className="text-slate-200 font-medium">{p.title}</div>

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
              );
            })
          ) : (
            <div className="text-slate-500 text-center py-10">
              No problems found for these tags.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Problems;

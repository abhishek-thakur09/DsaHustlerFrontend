import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/problems?page=${page}&limit=${limit}`);

      console.log(res);
      setProblems(res.data.problems);
      setTotalPages(res.data.totalPages);
    };

    fetchData();
  }, [page]);

  const getVisiblePages = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

    // always show exactly 3 when possible
    if (end - start < 2) {
      if (start === 1) {
        end = Math.min(3, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 2);
      }
    }

    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-80px)] flex flex-col max-w-4xl mx-auto p-6">
        {/* headig */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">All Problems</h1>

          {problems.map((p) => (
            <div key={p._id} className="border p-3 mb-2 rounded">
              {p.title}
            </div>
          ))}
        </div>

        {/* pagination*/}
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded"
            >
              Previous
            </button>

            {getVisiblePages().map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 border rounded ${
                  page === num ? "bg-blue-500 text-white" : ""
                }`}
              >
                {num}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problems;

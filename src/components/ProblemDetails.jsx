import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    const res = await api.get(`/api/singleProblem/${id}`);
    setProblem(res.data);

    console.log(res.data);
  };

  // if not problem then keep loading
  if (!problem) return <div>Loading...</div>;

  // else iterrate over the problem

  const sampleTests = problem.testCases.filter((tc) => tc.isSample);
  console.log(sampleTests);

  return (
    <div className="h-screen bg-black text-amber-50 flex">
      {/* LEFT  */}
      <div className="w-1/2 border-r border-slate-800  rounded-2xl p-6 overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold m-5 text-center">
            {problem.title}
          </h1>
          <h3
            className={`text-1xl m-1 px-2 py-1 rounded-2xl border transition
      ${
        problem.difficulty === "easy"
          ? "text-green-400 border-green-400/30 hover:border-green-400"
          : problem.difficulty === "medium"
            ? "text-yellow-400 border-yellow-400/30 hover:border-yellow-400"
            : "text-red-400 border-red-400/30 hover:border-red-400"
      }`}
          >
            {problem.difficulty}
          </h3>
        </div>

        <div className="mt-4 text-slate-300">
          Description : {problem.description}
        </div>
        <div className="my-4 bg-slate-800 p-2">
          Input:
          {!problem.isSample &&
            sampleTests.map((e, index) => (
              <>
                <div key={index}>{e.input}</div>
                <div className="my-2">Output:</div>
                <div key={index + 123123}>{e.output}</div>
              </>
            ))}
        </div>

        <div className="flex gap-2">
          {problem.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <strong>Constraints:</strong> {problem.constraints}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;

import React from "react";
import {useSingleProblem } from "../hooks/useProblem";
import { useParams } from "react-router-dom";


const ProblemDescription = () => {
const { id } = useParams();
  const { problem } = useSingleProblem(id);

  if (!problem) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const sampleTests =
    problem?.testCases?.filter((tc) => tc.isSample) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold">{problem.title}</h1>

      <span
        className={`inline-block mt-4 px-4 py-1 rounded-full border
        ${
          problem.difficulty === "easy"
            ? "text-green-400 border-green-400/40"
            : problem.difficulty === "medium"
            ? "text-yellow-400 border-yellow-400/40"
            : "text-red-400 border-red-400/40"
        }`}
      >
        {problem.difficulty}
      </span>

      <div className="mt-6 text-slate-300">
        <strong>DESCRIPTION</strong>
        <p className="mt-2">{problem.description}</p>
      </div>

      <div className="mt-6 bg-slate-800 p-6 rounded-lg w-2/3">
        {sampleTests.map((e, index) => (
          <div key={index}>
            <p>Input:</p>
            <p>{e.input}</p>

            <p className="mt-3">Output:</p>
            <p>{e.output}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        {problem.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <strong>Constraints :</strong> {problem.constraints}
      </div>
    </div>
  );
};

export default ProblemDescription;
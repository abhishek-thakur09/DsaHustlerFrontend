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
  };

  // if not problem then keep loading
  if (!problem) return <div>Loading...</div>;

  // else iterrate over the problem

  const sampleTests = problem.testCases.filter((tc) => tc.isSample);

  console.log(sampleTests);

  return (
    <div className="h-screen bg-black text-amber-50 flex">
      {/* LEFT  */}
      <div className="w-1/2 border-r border-slate-800 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold">{problem.title}</h1>

        <div className="mt-4 text-slate-300">{problem.description}</div>
        <div className="m-4 py-8">
          Input:
          {!problem.isSample && sampleTests.map((e, index) => (
            <>
              <div key={index}>{e.input}</div>
              <div className="my-2" >Output:</div>
              <div key={index+123123}>{e.output}</div>
            </>
          ))}
        </div>
        <div className="mt-4">
          <strong>Difficulty:</strong> {problem.difficulty}
        </div>

        <div className="mt-4">
          <strong>Constraints:</strong> {problem.constraints}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../utils/api";

const CodeRunner = () => {
  const { id } = useParams();

  const [isSubmit, setIsSubmit] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputSize, setOutputSize] = useState("hidden"); // Start hidden

  const languageMap = {
    cpp: 54,
    javascript: 63,
    python: 71,
    java: 62
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/api/singleProblem/${id}`);
        setProblem(response.data);
        
        if (response.data.starterCode && response.data.starterCode[language]) {
          setCode(response.data.starterCode[language]);
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };
    if (id) fetchProblem();
  }, [id, language]);

  //Load saved code from LocalStorage
useEffect(() => {
  const savedCode = localStorage.getItem(`code-${id}-${language}`);
  
  if (savedCode) {
    setCode(savedCode);
  } else if (problem?.starterCode && problem.starterCode[language]) {
    setCode(problem.starterCode[language]);
  }
}, [id, language, problem]);

useEffect(() => {
  if (code && id) {
    localStorage.setItem(`code-${id}-${language}`, code);
  }
}, [code, id, language]);

  // Unified execution handler
  const executeCode = async (submitMode = false) => {
    setLoading(true);
    setResults(null);
    setIsSubmit(submitMode);
    setOutputSize("normal");

    try {
      const payload = {
        source_code: code,
        language_id: languageMap[language],
        problemId: id,
        isSubmit: submitMode,
      };

      if (!submitMode) {
        payload.testCases = problem?.testCases?.filter((tc) => tc.isSample);
      }

      const response = await api.post("api/run", payload);
      setResults(response.data);
    } catch (err) {
      console.error("Execution Error:", err);
      alert("Execution failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#10192e] text-white font-sans">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#000000] border-b border-gray-800">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-[#1e293b] border border-gray-700 text-white px-4 py-1.5 pr-8 rounded-lg cursor-pointer focus:outline-none text-sm font-medium hover:bg-gray-800 transition-all"
            >
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <span className="absolute right-3 top-2.5 pointer-events-none text-[10px] text-gray-500">
              ▼
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => executeCode(false)}
            disabled={loading}
            className="bg-[#262626] hover:bg-[#333] text-gray-300 px-5 py-1.5 rounded-lg text-sm font-semibold transition-all border border-gray-700"
          >
            {loading && !isSubmit ? "Running..." : "Run"}
          </button>

          <button
            onClick={() => executeCode(true)}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white px-5 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-green-900/20"
          >
            {loading && isSubmit ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* CODE AREA */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            fontFamily: "Fira Code, monospace",
          }}
        />
      </div>

      {/* RESULTS SECTION */}
      {results && (
        <div
          className={`transition-all duration-300 bg-[#0a0f1d] border-t border-gray-800 p-6 overflow-y-auto
            ${outputSize === "hidden" ? "h-0 p-0 overflow-hidden border-none" : ""}
            ${outputSize === "normal" ? "h-[40vh]" : "h-[85vh]"}
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h3
                className={`text-2xl font-black uppercase tracking-tighter ${
                  results.overallStatus === "Accepted" ? "text-green-400" : "text-red-500"
                }`}
              >
                {results.overallStatus}
              </h3>

              {isSubmit && results.overallStatus === "Accepted" && (
                <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                  {results.passed} / {results.total} testcases passed
                </span>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setOutputSize(outputSize === "expanded" ? "normal" : "expanded")}
                className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest"
              >
                {outputSize === "expanded" ? "▼ Collapse" : "▲ Expand"}
              </button>
              <button
                onClick={() => {
                  setResults(null);
                  setOutputSize("hidden");
                }}
                className="text-gray-500 hover:text-red-500 font-bold text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          {isSubmit && results.overallStatus === "Accepted" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex gap-6 mb-8">
                <div className="bg-[#1e293b]/30 p-5 rounded-2xl border border-gray-800 min-w-[160px]">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Runtime</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.max(...results.results.map((r) => parseFloat(r.time) || 0)).toFixed(3)} s
                  </p>
                </div>
                <div className="bg-[#1e293b]/30 p-5 rounded-2xl border border-gray-800 min-w-[160px]">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Memory</p>
                  <p className="text-2xl font-bold text-white">
                    {(Math.max(...results.results.map((r) => parseInt(r.memory) || 0)) / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="text-green-400 font-medium bg-green-400/10 px-4 py-3 rounded-xl border border-green-400/20 flex items-center gap-3">
                All test cases passed successfully!
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.results?.map((res, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 bg-[#1e293b]/20 transition-all ${
                    res.passed ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`text-[10px] font-black uppercase ${res.passed ? "text-green-400" : "text-red-400"}`}>
                        {res.passed ? "Passed" : "Failed"}
                      </span>
                      <h4 className="text-white font-bold">Test Case {index + 1}</h4>
                    </div>
                    <div className="text-right text-[10px] text-gray-500 uppercase font-bold space-y-1">
                      <div>{res.status}</div>
                      <div>{res.time}s | {res.memory} KB</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">Expected Output</p>
                      <pre className="bg-[#000] p-3 rounded-lg text-blue-400 text-xs overflow-x-auto border border-gray-900">
                        {res.expected}
                      </pre>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">Your Output</p>
                      <pre className={`p-3 rounded-lg text-xs overflow-x-auto border ${
                        res.passed ? "bg-[#000] text-green-400 border-gray-900" : "bg-red-900/10 text-red-400 border-red-900/30"
                      }`}>
                        {res.actual || "No output"}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeRunner;
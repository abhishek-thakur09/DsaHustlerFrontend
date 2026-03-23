import React, { useState } from "react";
import CodeRunner from "./CodeRunner";
import ProblemDescription from "./ProblemDescription";
import AIChat from "./AiChat";
import Submission from "./Submission";
import Editorial from "./Editorial";

const ProblemDetails = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="h-screen bg-black text-amber-50 flex">

      {/* LEFT PANEL */}
      <div className="w-1/2 border-r border-slate-800 p-6 overflow-y-auto">

        {/* NAVBAR */}
        <div className="flex gap-6 border-b border-slate-700 mb-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 ${
              activeTab === "description"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Description
          </button>

          <button
          onClick={()=> setActiveTab("aiChat")}
          className={`
          pb-2 ${
          activeTab === "aiChat"
          ?  "border-b-2 border-blue-500 text-blue-500"
          : "text-slate-400 hover:text-white"
          }
          `} >
            AiHint
          </button>

          <button
            onClick={() => setActiveTab("submission")}
            className={`pb-2 ${
              activeTab === "submission"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Submission
          </button>

          <button
            onClick={() => setActiveTab("editorial")}
            className={`pb-2 ${
              activeTab === "editorial"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Editorial
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "description" && <ProblemDescription />}
        {activeTab === "aiChat" && <AIChat/>}
        {activeTab === "submission" && <Submission />}
        {activeTab === "editorial" && <Editorial />}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 h-full">
        <CodeRunner />
      </div>

    </div>
  );
};

export default ProblemDetails;
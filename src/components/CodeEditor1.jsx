import React, { useState } from "react";
import CodeRunner from "./CodeRunner";
import ProblemDescription from "./ProblemDescription";
import AIChat from "./AiChat";
import Editorial from "./Editorial";

const ProblemDetails = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      <div className="h-screen bg-black text-amber-50 flex overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/2 h-auto border-r border-slate-800 p-6 mb-10 overflow-y-auto">
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
              onClick={() => setActiveTab("aiChat")}
              className={`
          pb-2 ${
            activeTab === "aiChat"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-slate-400 hover:text-white"
          }
          `}
            >
              AiHint
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
          {activeTab === "aiChat" && <AIChat />}
          {activeTab === "editorial" && <Editorial />}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 h-full overflow-hidden">
          <div className="h-full overflow-y-auto">
            <CodeRunner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;

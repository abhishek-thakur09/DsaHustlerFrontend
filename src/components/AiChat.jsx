import React, { useState } from "react";
import api from "../utils/api";
import ReactMarkdown from "react-markdown";
import {
  Brain,
  Lightbulb,
  Workflow,
  Sigma,
  Loader2,
} from "lucide-react";

const AIChat = ({ problem }) => {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (type) => {
    setLoading(true);

    try {
      const res = await api.post("/ai/aiInstructure", {
        type,
        title: problem.title,
        difficulty: problem.difficulty,
        tags: problem.tags,
        description: problem.description,
      });

      setChat(res.data.hint);
    } catch (err) {
      console.log(err);
      setChat("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    {
      label: "Get Hint",
      type: "hint",
      icon: <Lightbulb size={18} />,
    },
    {
      label: "Pattern",
      type: "pattern",
      icon: <Workflow size={18} />,
    },
    {
      label: "Dry Run",
      type: "dryrun",
      icon: <Brain size={18} />,
    },
    {
      label: "Complexity",
      type: "complexity",
      icon: <Sigma size={18} />,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#020617] text-white">

      {/* HEADER */}
      <div className="border-b border-slate-800 px-6 py-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="text-blue-500" />
          AI Mentor
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Get smart hints without revealing full solutions.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="p-5 flex flex-wrap gap-3 border-b border-slate-800">

        {buttons.map((btn) => (
          <button
            key={btn.type}
            disabled={loading}
            onClick={() => askAI(btn.type)}
            className="
              flex items-center gap-2
              px-4 py-3 rounded-xl
              bg-slate-900 border border-slate-700
              hover:border-blue-500
              hover:bg-slate-800
              transition-all duration-200
              text-sm font-medium
              disabled:opacity-50
            "
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}

      </div>

      {/* RESPONSE SECTION */}
      <div className="flex-1 overflow-y-auto p-6">

        {!loading && !chat && (
          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <Brain size={40} className="text-blue-500" />
            </div>

            <h3 className="text-xl font-semibold text-slate-200">
              Your AI DSA Mentor
            </h3>

            <p className="text-slate-500 mt-2 max-w-md">
              Click any action above to get hints, patterns,
              dry runs, or complexity analysis for this problem.
            </p>

          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-full">

            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-blue-500" size={40} />

              <p className="text-slate-400">
                AI is thinking...
              </p>
            </div>

          </div>
        )}

        {!loading && chat && (
          <div
            className="
              bg-slate-900 border border-slate-800
              rounded-2xl p-6
              prose prose-invert max-w-none
              shadow-lg shadow-blue-500/5
            "
          >
            <ReactMarkdown>{chat}</ReactMarkdown>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIChat;
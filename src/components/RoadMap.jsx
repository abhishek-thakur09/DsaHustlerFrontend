import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";

import roadmapData from "../data/roadmapdata";

const RoadMap = () => {
  const [selectedPattern, setSelectedPattern] = useState(
    roadmapData[0]
  );

  const [openSidebar, setOpenSidebar] = useState(true);

  return (
      <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 4, y: 0 }}
      transition={{ duration: 0.2 }}
    >
    <div className="flex h-screen text-white overflow-hidden">
      
      {/* Sidebar */}
      <div
        className={`${
          openSidebar ? "w-[280px]" : "w-[90px]"
        } transition-all duration-300 bg-[#111827] border-r border-gray-800 flex flex-col overflow-y-auto`}
      >
        
        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          
          {openSidebar && (
            <h1 className="text-2xl font-bold text-blue-400">
              Roadmap
            </h1>
          )}

          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            {openSidebar ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* Topics */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {roadmapData.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedPattern(topic)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300
              
              ${
                selectedPattern.id === topic.id
                  ? "bg-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-gray-900 hover:bg-gray-800"
              }
              `}
            >
              <LayoutDashboard size={20} />

              {openSidebar && (
                <span className="font-medium">
                  {topic.title}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black overflow-y-auto p-8">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-blue-400">
            {selectedPattern.title}
          </h1>

          <p className="text-gray-300 text-lg">
            {selectedPattern.description}
          </p>
          
        </div>


        {/* real life example */}
        <div  className=" p-6 mb-6 ">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400" >RealLifeUse: </h2>
          <p>
            {selectedPattern.realLifeExample}
          </p>
        </div>

        {/* When To Use */}
        <div className="bg-[#1e293b] rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            When To Use
          </h2>

          <div className="flex flex-wrap gap-3">
            {selectedPattern.whenToUse.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-600/20 border border-blue-500 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Identification Tips */}
        <div className="bg-[#1e293b] rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            Identification Tips
          </h2>

          <ul className="space-y-3">
            {selectedPattern.identificationTips.map(
              (tip, index) => (
                <li
                  key={index}
                  className="bg-[#0f172a] p-4 rounded-xl border border-gray-700"
                >
                  🟢 {tip}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Common Keywords */}
        <div className="bg-[#1e293b] rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            Common Keywords
          </h2>

          <div className="flex flex-wrap gap-3">
            {selectedPattern.commonKeywords.map(
              (keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700"
                >
                  #{keyword}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default RoadMap;
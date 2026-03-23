import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeRunner = () => {
  const [language, setLanguage] = useState("cpp");
  const [openAiHint , setOpenAiHint] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[#10192e]">
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-3 bg-[#000000]">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-blue-500 text-white px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none"
          >
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <span className="absolute right-2 top-2 text-white pointer-events-none">
            ▼
          </span>
        </div>



<div
  className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 transition-opacity duration-300
  ${openAiHint ? "opacity-100 visible" : "opacity-0 invisible"}`}
>

  <div
    className={`bg-blue-600 p-6 rounded-lg w-[500px] h-[500px] shadow-lg transform transition-all duration-300
    ${openAiHint ? "scale-100 translate-y-0" : "scale-90 translate-y-5"}`}
  >

<div className="flex justify-between">

    <h2 className="text-lg font-semibold mb-3">AI Hint</h2>
    <button
        onClick={() => setOpenAiHint(false)}
        className="px-3 py-1 bg-gray-400 rounded hover:bg-gray-500"
      >
        x
      </button>

      </div>

    <input
      placeholder="Ask AI for help..."
      className="w-full h-[10px] border p-2 rounded mb-3 outline-none"
    />

    <div className="flex justify-end gap-2">
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        Ask AI
      </button>
    </div>

  </div>
</div>

        {/* .......................................Run Button */}
        <button className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 text-black font-semibold" title="run the code">
          Run
        </button>
      </div>

      {/* CODE AREA */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          defaultValue="// write your code"
        />
      </div>
    </div>
  );
};

export default CodeRunner;

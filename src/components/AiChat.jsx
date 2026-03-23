import axios from "axios";
import React, { useState } from "react";
import api from "../utils/api";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const AIChat = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // add user message
    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/ai/aiInstructure",
        { message } 
      );

      console.log(res);
      // add AI reply
      setChat([
        ...newChat,
        { role: "ai", text: res.data.hint } 
      ]);

    } catch (err) {
      console.log(err);

      // error message
      setChat([
        ...newChat,
        { role: "ai", text: "Something went wrong" }
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-5 max-w-xl mx-auto">

      <h2 className="text-blue-500 text-xl font-semibold mb-4">
        AI Assistant
      </h2>

      {/* Chat Box */}
      <div className="h-[400px] overflow-y-auto border-2 border-blue-500 p-3 mb-4 rounded-lg">
       
  {chat.length === 0 ? (
    <div className="flex items-center justify-center h-full text-blue-400 text-lg">
      Hey {user.name}, what about today?
    </div>
  ) : (
    chat.map((msg, i) => (
      <div
        key={i}
        className={`my-2 ${
          msg.role === "user" ? "text-right" : "text-left"
        }`}
      >
        <span
          className={`inline-block px-3 py-2 rounded-lg ${
            msg.role === "user"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-900"
          }`}
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </span>
      </div>
    ))
  )}

        {loading && (
          <p className="text-blue-400 text-sm mt-2">thinking...</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Here...."
          className="w-full p-2 border-2 border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(); 
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
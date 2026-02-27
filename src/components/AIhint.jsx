import axios from "axios";
import React, { useState } from "react";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // add user message
    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { message }
      );

      // add AI reply
      setChat([
        ...newChat,
        { role: "ai", text: res.data.reply }
      ]);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>

      <h2>AI Assistant</h2>

      {/* Chat Box */}
      <div style={{
        height: 400,
        overflowY: "auto",
        border: "1px solid gray",
        padding: 10,
        marginBottom: 10
      }}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "10px 0"
            }}
          >
            <span
              style={{
                padding: 10,
                borderRadius: 10,
                background: msg.role === "user" ? "#22c55e" : "#e5e7eb",
                color: msg.role === "user" ? "white" : "black",
                display: "inline-block"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about DSA..."
        style={{ width: "80%", padding: 10 }}
      />

      <button onClick={sendMessage} style={{ padding: 10 }}>
        Send
      </button>

    </div>
  );
};

export default AIChat;
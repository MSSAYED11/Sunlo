import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // make sure port matches

function ChatApp() {
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off("receive_message");
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  const sendMessage = () => {
    if (!username || !newMessage) return;
    const messageData = { sender: username, content: newMessage };
    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "80vh"
      }}>
        <h2 style={{ textAlign: "center", color: "#ff4d94" }}>🌸 Sunlo Chat</h2>

        <input
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ffb6c1",
            marginBottom: "15px"
          }}
        />

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          background: "#ffe6f0",
          borderRadius: "15px",
          marginBottom: "15px"
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.sender === username ? "flex-end" : "flex-start",
                marginBottom: "10px"
              }}
            >
              <div style={{
                background: msg.sender === username ? "#ff4d94" : "#ffc0cb",
                color: msg.sender === username ? "#fff" : "#333",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                wordWrap: "break-word",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <b>{msg.sender}:</b> {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ffb6c1"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              background: "#ff4d94",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

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
      console.log("Message received:", message);
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off("receive_message");
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  const sendMessage = () => {
    if (!username || !newMessage) return;
    const messageData = { sender: username, content: newMessage };
    socket.emit("send_message", messageData); // send to server
    setNewMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Sunlo Chat Dashboard</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "5px 0" }}>
            <b>{msg.sender}:</b> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex" }}>
        <input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatApp;

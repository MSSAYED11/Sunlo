import { useEffect, useState } from "react";
import io from "socket.io-client";

// ⚙️ Connect to your backend server
const socket = io("https://sunlo-y4xc.onrender.com", {
  withCredentials: true,
}); 
// For local testing, use: io("http://localhost:8000")

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // 📡 Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [
        ...prev,
        { system: false, text: `${data.username}: ${data.message}` },
      ]);
    });

    socket.on("user_joined", (msg) => {
      setChat((prev) => [...prev, { system: true, text: msg }]);
    });

    socket.on("user_left", (msg) => {
      setChat((prev) => [...prev, { system: true, text: msg }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, []);

  // ✨ Join the chat
  const joinChat = () => {
    if (username.trim()) {
      socket.emit("join_chat", username);
      setJoined(true);
      setChat((prev) => [
        ...prev,
        { system: true, text: `You joined as ${username}` },
      ]);
    }
  };

  // 🚀 Send a new message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  // 🪪 Step 1: Join Screen
  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-80 text-center">
          <h1 className="text-2xl mb-4 font-semibold">Join Chat</h1>
          <input
            type="text"
            className="border w-full p-2 rounded mb-3"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={joinChat}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  // 💬 Step 2: Chat Screen
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Chat Room — {username}
        </h1>

        <div className="border h-80 overflow-y-auto p-3 rounded mb-3 bg-gray-50">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-1 ${
                msg.system
                  ? "text-center text-gray-500 text-sm italic"
                  : "text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="border flex-1 p-2 rounded"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

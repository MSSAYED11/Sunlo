import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // to get user from Redux store
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io(import.meta.env.VITE_API_URL|| "http://localhost:8000", {
  withCredentials: true,
});

export default function ChatPage() {
  const navigate = useNavigate();

  // 🧠 Get current user from Redux (already set during sign in)
  const user = useSelector((state) => state.user.user.user.name);
  console.log("chatPage ",user)

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // 📡 Listen for messages and events
  useEffect(() => {
    if (user) {
      socket.emit("join_chat", user);
    }

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

    socket.on("name_changed", (msg) => {
      setChat((prev) => [...prev, { system: true, text: msg }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("name_changed");
    };
  }, [user]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile"); // redirect to profile settings page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-800">
      <div className="bg-white w-96 rounded-2xl shadow-lg border border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-pink-400 text-white px-4 py-3">
          <h1 className="text-lg font-semibold">Sunlo Chat</h1>
          <button
            onClick={handleProfileClick}
            className="bg-white text-pink-500 text-sm px-3 py-1 rounded-full hover:bg-pink-100 transition"
          >
            {user?.userName || "Profile"}
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto bg-pink-50 px-4 py-3">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${
                msg.system
                  ? "text-center text-gray-500 text-sm italic"
                  : msg.text.startsWith(user?.userName)
                  ? "text-right text-pink-700 font-medium"
                  : "text-left text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex p-3 border-t border-pink-200 bg-pink-100">
          <input
            className="flex-1 border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

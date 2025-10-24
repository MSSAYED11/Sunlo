// socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";

let io;
const connectedUsers = new Map(); // socket.id -> username

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://sunlo-gold.vercel.app", "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log("🟢 New socket connected:", socket.id);

    // Extract JWT from cookies (sent automatically if same-site/cors configured)
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      ?.find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("userName name");

        if (user) {
          socket.userId = user._id;
          socket.userName = user.userName;
          connectedUsers.set(socket.id, user.userName);

          io.emit("user_joined", `${user.userName} joined the chat 💬`);
        }
      } catch (err) {
        console.error("❌ Invalid token for socket:", err.message);
      }
    }

    // When user sends a message
    socket.on("send_message", (message) => {
      const username = connectedUsers.get(socket.id) || "Anonymous";
      const data = {
        username,
        message,
        timestamp: new Date(),
      };
      io.emit("receive_message", data);
    });

    // Handle manual join (fallback)
    socket.on("join_chat", (username) => {
      connectedUsers.set(socket.id, username);
      socket.userName = username;
      io.emit("user_joined", `${username} joined the chat 💬`);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      const username = connectedUsers.get(socket.id);
      if (username) {
        io.emit("user_left", `${username} left the chat 👋`);
        connectedUsers.delete(socket.id);
      }
      console.log("🔴 Socket disconnected:", socket.id);
    });

    // When user changes their name (triggered from backend controller)
    socket.on("name_changed", ({ oldName, newName }) => {
      io.emit("name_changed", `${oldName} changed their name to ${newName} ✨`);
    });
  });

  return io;
};

// Allow controllers to broadcast events globally
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

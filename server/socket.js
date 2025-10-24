// socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://sunlo-gold.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // When a user joins with a username
    socket.on("join_chat", (username) => {
      socket.username = username;
      io.emit("user_joined", `${username} joined the chat`);
      console.log(`${username} joined`);
    });

    // When a user sends a message
    socket.on("send_message", (message) => {
      const data = {
        username: socket.username || "Anonymous",
        message,
        timestamp: new Date(),
      };
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      if (socket.username) {
        io.emit("user_left", `${socket.username} left the chat`);
      }
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

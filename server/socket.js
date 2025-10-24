import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }, // or your frontend origin
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
      console.log("Message received:", data);
      io.emit("receive_message", data); // broadcast to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  console.log("Socket.IO initialized");
};

export const getIO = () => io;

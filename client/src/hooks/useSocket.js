// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "../redux/messageSlice";

export const useSocket = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000");

    // Load history
    socket.on("chatHistory", (messages) => {
      dispatch(setMessages(messages));
    });

    // New message received
    socket.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => socket.disconnect();
  }, [dispatch, userId]);
};

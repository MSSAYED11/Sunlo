// src/api/messageCalls.js
import axios from "axios";
import { API_BASE_URL } from "./config.js";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch all messages (initial load)
export const getAllMessages = async (token) => {
  try {
    const res = await api.get("/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching messages:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// Create a new message (optional, mostly used by backend/socket)
export const createMessage = async (messageData, token) => {
  try {
    const res = await api.post("/api/messages", messageData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating message:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

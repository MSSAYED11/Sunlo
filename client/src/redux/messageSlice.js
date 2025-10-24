// src/redux/messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => action.payload,
    addMessage: (state, action) => [...state, action.payload],
    clearMessages: () => [],
  },
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;

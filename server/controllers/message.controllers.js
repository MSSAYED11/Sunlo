// server/controllers/message.controller.js
import Message from "../models/message.model.js";

// Fetch all messages (for initial load)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "username avatar") // populate sender info
      .sort({ createdAt: 1 }); // oldest first
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new message (optional if using Socket.IO only)
export const createMessage = async (req, res) => {
  try {
    const { senderId, text } = req.body;

    if (!text || !senderId) {
      return res.status(400).json({ error: "senderId and text are required" });
    }

    const message = new Message({ sender: senderId, text });
    await message.save();

    // Populate sender info before sending
    const populatedMessage = await message.populate("sender", "username avatar");

    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

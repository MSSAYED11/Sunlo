// server/routes/message.route.js
import express from "express";
import { getAllMessages, createMessage } from "../controllers/message.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Fetch all messages (initial load)
router.get("/", authMiddleware, getAllMessages);

router.post("/", authMiddleware, createMessage);

export default router;

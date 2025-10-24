import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import { initSocket } from './socket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);

// Test route
app.get('/', (req, res) => res.send("Server is running for Sunlo"));

// Connect to MongoDB
connectDB();

// HTTP server & Socket.IO
const server = http.createServer(app);

// Attach Socket.IO
initSocket(server);

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

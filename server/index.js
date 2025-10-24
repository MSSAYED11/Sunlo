import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ---------------------
// Middleware
// ---------------------
app.use(express.json());           // Parse JSON bodies
app.use(cookieParser());           // Parse cookies
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true                // Allow cookies to be sent
}));

// ---------------------
// Routes
// ---------------------
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ---------------------
// Test route
// ---------------------
app.get('/', (req, res) => {
  res.send("Server is running for Sunlo");
});

// ---------------------
// Connect to MongoDB
// ---------------------
connectDB();

// ---------------------
// Start server
// ---------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

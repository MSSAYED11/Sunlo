import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../config/token.js";

// Sign Up
export const signUp = async (req, res) => {
    console.log(req.body)
    try {
        const { name, userName, email, password } = req.body;

        if (!name || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) return res.status(400).json({ message: "Username already taken" });

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            userName,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = await genToken(newUser._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  
            sameSite: "none", 
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Return user data (omit password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                userName: newUser.userName,
                email: newUser.email,
                avatar: newUser.avatar,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // omit password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Sign In
export const signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ message: "Invalid username or password" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid username or password" });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  
            sameSite: "none", 
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "SignIn successful",
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

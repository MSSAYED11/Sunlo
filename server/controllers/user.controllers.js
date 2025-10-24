import User from "../models/user.model.js";
import { getIO } from "../socket.js";

// Create or initialize profile (for chat app)
export const createProfile = async (req, res) => {
    try {
        const { name, avatar } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.status(200).json({ message: "Profile saved", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get current logged-in user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Edit or update profil

export const editOrUpdateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const oldName = user.name;
    user.name = name || user.name;
    await user.save();

    // 🔥 Emit socket event to everyone
    const io = getIO();
    io.emit("name_changed", { oldName, newName: user.name });

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


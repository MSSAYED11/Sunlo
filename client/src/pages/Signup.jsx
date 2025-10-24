import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { signUp } from "../apicalls/authCalls";
import { setUserData } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";

function Signup() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = await signUp({ name, userName, email, password });
      console.log("Server response", data);
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
      if (data) {
        dispatch(setUserData(data));
        navigate("/profileSetup");
      }
    } catch (err) {
      console.error("Error during Sign Up", err);
      console.error("Server response", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Left Side Branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-500 text-white p-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-3">Sunlo</h1>
            <p className="text-pink-100 max-w-sm leading-relaxed">
              Your friendly chat companion. Connect, share, and interact seamlessly.
            </p>
          </motion.div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 text-center"
          >
            Create Your Account
          </motion.h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Join Sunlo to chat and connect with your friends instantly.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe123"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Sign Up
            </motion.button>

            {/* Switch */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-pink-500 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

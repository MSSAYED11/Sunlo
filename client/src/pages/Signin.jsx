import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import { signIn } from "../apicalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Signin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await signIn({ userName, password });
      console.log("signIn data", data);

      if (data) {
        dispatch(setUserData(data));
        navigate("/");
      }
      setUserName("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Left Side Branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-rose-500 text-white p-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-3">Sunlo</h1>
            <p className="text-pink-100 max-w-sm leading-relaxed">
              Your trusted companion for health and wellness. Track, analyze, and
              share your progress effortlessly.
            </p>
          </motion.div>
        </div>

        {/* Right Side Form */}
        <div className="w-full max-w-md flex flex-col gap-5 border-default p-8 rounded-3xl shadow-lg bg-white">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 text-center"
          >
            Sign In
          </motion.h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Login to access your Sunlo dashboard and insights.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                User Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
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
                  className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Sign In
            </motion.button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Create a new Account?{" "}
              <Link
                to="/signup"
                className="text-pink-500 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;

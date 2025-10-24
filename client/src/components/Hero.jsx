import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-pink-50 relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-pink-500 leading-tight">
          Chat with Friends <br /> Anytime, Anywhere
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-xl">
          Sunlo Chat is your friendly space to connect, share, and have fun in real-time. No hassle, just instant messaging!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/signin")}
            className="bg-white text-pink-500 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-pink-50 hover:shadow-md transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-pink-600 transition shadow-md"
          >
            Sign Up
          </button>
        </div>

        {/* Decorative cute blobs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;

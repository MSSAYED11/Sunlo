import React from "react";
import { useNavigate } from "react-router-dom";

const Step = ({ number, title }) => (
  <div className="flex flex-col items-center space-y-3 w-40 sm:w-auto">
    <div className="w-16 h-16 flex items-center justify-center bg-pink-500 text-white text-2xl font-bold rounded-full shadow-lg">
      {number}
    </div>
    <p className="text-base sm:text-lg font-medium text-gray-700 text-center">
      {title}
    </p>
  </div>
);

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 text-center bg-pink-50">
      <h2 className="text-3xl font-bold text-pink-500 mb-12">
        How Sunlo Chat Works
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16">
        <Step number="1" title="Join the Chat" />
        <Step number="2" title="Send Messages" />
        <Step number="3" title="Connect Instantly" />
      </div>

      <div className="pt-20">
        <p className="text-xl font-medium text-gray-700 mb-8 max-w-xl mx-auto">
          Start chatting with friends in real-time. Quick, secure, and super easy!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="border border-pink-500 text-pink-500 px-6 py-3 rounded-xl font-semibold text-base hover:bg-pink-50 transition duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-pink-600 transition duration-300 shadow-lg"
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

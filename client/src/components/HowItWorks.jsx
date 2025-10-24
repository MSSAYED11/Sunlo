import React from "react";
import { useNavigate } from "react-router-dom";

const Step = ({ number, title }) => (
  <div className="flex flex-col items-center space-y-3 w-1/3 sm:w-auto">
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
      <h2 className="text-3xl font-bold text-gray-900 mb-12 hidden">
        How It Works
      </h2>

      <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-16">
        <Step number="1" title="Track Readings" />
        <div className="w-6 sm:w-12 h-0.5 bg-gray-00 transform -translate-y-4 relative hidden sm:block">
          <svg
            className="w-4 h-4 text-gray-400 absolute right-0 -mr-2 -mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </div>

        <Step number="2" title="View Insights" />
        <div className=" sm:w-12 h-0.5 bg-gray-00 transform -translate-y-4 relative hidden sm:block">
          <svg
            className="w-4 h-4 text-gray-400 absolute right-0 -mr-2 -mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </div>

        <Step number="3" title="Get AI Guidance" />
      </div>

      <div className="pt-20">
        <p className="text-xl font-medium text-gray-700 mb-8">
          Take control of your health journey.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/signin")}
            className="border border-pink-500 text-pink-500 px-6 py-3 rounded-xl font-semibold text-base hover:bg-pink-50 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-pink-600 transition duration-300 shadow-lg cursor-pointer"
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

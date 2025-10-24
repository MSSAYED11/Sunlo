import React from "react";
import { useNavigate } from "react-router-dom";
import DASHBOARD_IMAGE_URL from "../assets/mockups/logo1.png";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white relative pt-20 pb-32 overflow-hidden">

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-pink-50 to-white z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between z-10 relative">

        <div className="lg:w-1/2 space-y-6 text-center lg:text-left mb-16 lg:mb-0 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight sm:leading-snug">
            Track Your Health. <br /> Master Your Wellness
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-xl mx-auto lg:mx-0">
            Your trusted partner for health insights. Monitor, analyze, and
            share wellness data with Sunlo AI reports.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-pink-600 transition duration-300 shadow-xl mt-6"
          >
            Get Started Free
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center relative pt-10 lg:pt-0 transform scale-90 sm:scale-100 lg:scale-[1.1] xl:scale-[1.2] lg:translate-x-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-pink-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>

          <div className="relative z-10 w-[500px] h-auto aspect-[16/10] bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-2 pt-0.5">
            <div className="w-full h-[88%] bg-white rounded-t-lg overflow-hidden">
              <img
                src={DASHBOARD_IMAGE_URL}
                alt="Sunlo Dashboard Interface"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="w-full h-[12%] flex items-center justify-center pt-1.5">
              <div className="w-1/3 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

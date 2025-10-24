import React from "react";
import GlucoseTrackerImage from "../assets/mockups/logo1.png";
import DashboardImage from "../assets/mockups/logo2.png";
import AIReportImage from "../assets/mockups/logo3.png";

const FeatureCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:translate-y-[-2px] w-full border border-gray-100">
    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
      {title}
    </h3>
    {children}
  </div>
);

const KeyFeatures = () => {
  return (
    <section id="features" className="py-20 bg-pink-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Key Features
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <FeatureCard title="Effortless Tracking">
          <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <img
              src={GlucoseTrackerImage}
              alt="Glucose Reading Entry Form"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-pink-500">Quick Entry:</span>{" "}
              Log readings fast using a clean interface.
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-pink-500">Notes:</span>{" "}
              Add meal details for analysis later.
            </p>
          </div>
        </FeatureCard>

        <FeatureCard title="Comprehensive Dashboard">
          <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <img
              src={DashboardImage}
              alt="Dashboard Overview"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-pink-500">Visual Trends:</span>{" "}
              See history and averages at a glance.
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-pink-500">Metrics:</span>{" "}
              View counts of Low, Normal, High readings.
            </p>
          </div>
        </FeatureCard>

        <FeatureCard title="Smart AI Guidance">
          <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <img
              src={AIReportImage}
              alt="Smart AI Report"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-xl space-y-3">
            <h4 className="text-base font-bold text-gray-800">AI Summary</h4>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-pink-500">Insights:</span>{" "}
              Personalized recommendations based on your data.
            </p>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
};

export default KeyFeatures;

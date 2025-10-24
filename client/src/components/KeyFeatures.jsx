import React from "react";

const FeatureCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 w-full border border-pink-200">
    <h3 className="text-xl font-bold text-pink-500 mb-4 border-b pb-2">
      {title}
    </h3>
    {children}
  </div>
);

const KeyFeatures = () => {
  return (
    <section id="features" className="py-20 bg-pink-50">
      <h2 className="text-3xl font-bold text-pink-500 mb-12 text-center">
        Key Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard title="Real-time Messaging">
          <p className="text-gray-700 text-sm">
            Chat instantly with friends. Messages appear live as you type.
          </p>
        </FeatureCard>

        <FeatureCard title="Secure & Private">
          <p className="text-gray-700 text-sm">
            All conversations are encrypted. Only you and your friends see your messages.
          </p>
        </FeatureCard>

        <FeatureCard title="Easy to Use">
          <p className="text-gray-700 text-sm">
            No complicated setup. Join, type, and chat immediately on any device.
          </p>
        </FeatureCard>
      </div>
    </section>
  );
};

export default KeyFeatures;

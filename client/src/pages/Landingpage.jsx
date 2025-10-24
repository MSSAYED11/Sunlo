import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import KeyFeatures from "../components/KeyFeatures.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

function Landingpage() {
  return (
    <div className="min-h-screen bg-pink-50 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <KeyFeatures />
          <HowItWorks />
        </div>
      </main>
    </div>
  );
}

export default Landingpage;

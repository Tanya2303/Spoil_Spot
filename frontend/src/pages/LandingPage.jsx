import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Brain, Recycle, BarChart3, ArrowRight } from 'lucide-react';
import bgImage from '../assets/bg3.jpg';

const LandingPage = () => {
  console.log('LandingPage component is rendering...');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-32">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="block">Stop Wasting, Start Saving.</span>
          
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            SpoilSpot helps you track food expiration, reduce kitchen waste, and take small actions that save money — and the planet.
          </p>
          
          {/* Supportive Bullet Points */}
          <div className="text-lg md:text-xl mb-8 space-y-3 text-left max-w-2xl mx-auto">
            <p className="flex items-start">
              <span className="mr-3 mt-1">✅</span>
              <span>Track expiry and get timely alerts</span>
            </p>
            <p className="flex items-start">
              <span className="mr-3 mt-1">🌍</span>
              <span>Map & report food waste in your area</span>
            </p>
            <p className="flex items-start">
              <span className="mr-3 mt-1">♻️</span>
              <span>Discover ways to reuse or donate food</span>
            </p>
          </div>
          
          <Link 
            to="/signup" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 group"
          >
            🚀 Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* White Background Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Problem Statement */}
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <span className="text-3xl font-bold text-red-600">1/3 of all food produced</span> is wasted every year — that's enough to feed <span className="font-semibold text-green-600">3 billion people</span>!
            </p>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              SpoilSpot empowers you to track what's in your kitchen, fight spoilage, and reduce waste at the source.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Food Expiry Tracker */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🕒 Smart Food Expiry Tracker</h3>
              <p className="text-gray-600">Never let food go bad again with intelligent expiration tracking and timely notifications.</p>
            </div>

            {/* Global Spoilage Heatmap */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🗺️ Global Spoilage Heatmap</h3>
              <p className="text-gray-600">Visualize waste patterns and discover insights to make better purchasing decisions.</p>
            </div>

            {/* Food Safety Knowledge Hub */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🧠 Food Safety Knowledge Hub</h3>
              <p className="text-gray-600">Access expert guidance on food storage, safety tips, and best practices for freshness.</p>
            </div>

            {/* Reuse & Repurpose Suggestions */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">♻️ Reuse & Repurpose Suggestions</h3>
              <p className="text-gray-600">Transform food scraps into compost and discover creative ways to repurpose ingredients.</p>
            </div>

            {/* Personal Waste Analytics */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">📊 Personal Waste Analytics</h3>
              <p className="text-gray-600">Track your progress with detailed analytics and insights to optimize your food management.</p>
            </div>

            {/* Call to Action Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-6 text-center text-white hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
              <p className="mb-4">Join thousands of users already reducing food waste and saving money.</p>
              <Link 
                to="/signup" 
                className="inline-flex items-center bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
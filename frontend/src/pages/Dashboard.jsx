import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, ArrowLeft } from 'lucide-react';
import DashboardHome from '../components/DashboardHome';
import FoodTracker from '../components/FoodTracker';
import WasteMap from '../components/WasteMap';
import RecipeReuse from '../components/RecipeReuse';
import LearnTips from '../components/LearnTips';
import MyImpact from '../components/MyImpact';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/food-tracker', name: 'Food Tracker', icon: '🕒' },
    { path: '/dashboard/waste-map', name: 'WasteMap', icon: '🗺️' },
    { path: '/dashboard/recipes-reuse', name: 'Recipes & Reuse', icon: '♻️' },
    { path: '/dashboard/learn-tips', name: 'Learn & Tips', icon: '📚' },
    { path: '/dashboard/my-impact', name: 'My Impact', icon: '📊' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">SpoilSpot</span>
            </div>
          </div>

          {/* Back to Home */}
          <a 
            href="/" 
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Back to Home</span>
          </a>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar - Fixed below navbar */}
        <div className={`
          fixed top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span className="lg:block">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/food-tracker" element={<FoodTracker />} />
              <Route path="/waste-map" element={<WasteMap />} />
              <Route path="/recipes-reuse" element={<RecipeReuse />} />
              <Route path="/learn-tips" element={<LearnTips />} />
              <Route path="/my-impact" element={<MyImpact />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
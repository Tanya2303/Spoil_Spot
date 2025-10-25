import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const MyImpact = () => {
  const [impactStats, setImpactStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImpactStats = async () => {
      try {
        const stats = await ApiService.getImpactStats();
        setImpactStats(stats);
      } catch (err) {
        setError('Failed to load impact statistics');
        console.error('Error fetching impact stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Impact</h1>
      <p className="text-gray-600 mb-8">Track your environmental impact and analytics here.</p>
      
      {impactStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Food Saved</h3>
            <p className="text-3xl font-bold text-green-600">{impactStats.food_saved} kg</p>
            <p className="text-sm text-green-600 mt-1">This month</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Money Saved</h3>
            <p className="text-3xl font-bold text-blue-600">${impactStats.money_saved}</p>
            <p className="text-sm text-blue-600 mt-1">This month</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Carbon Reduced</h3>
            <p className="text-3xl font-bold text-purple-600">{impactStats.carbon_footprint_reduced} kg</p>
            <p className="text-sm text-purple-600 mt-1">CO2 equivalent</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Meals Created</h3>
            <p className="text-3xl font-bold text-orange-600">{impactStats.meals_created}</p>
            <p className="text-sm text-orange-600 mt-1">From leftovers</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImpact; 
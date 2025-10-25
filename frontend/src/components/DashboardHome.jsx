import React, { useEffect, useState }  from 'react';
import { Plus, MapPin, TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const DashboardHome = () => {
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    const fetchLastName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setLastName(userDoc.data().lastName);
        }
      }
    };
    fetchLastName();
  }, []);

  const userName = lastName || "User";

  const expiringItems = [
    { name: "Greek Yogurt", daysLeft: 1, category: "Dairy", priority: "high" },
    { name: "Fresh Spinach", daysLeft: 2, category: "Vegetables", priority: "medium" },
    { name: "Organic Apples", daysLeft: 3, category: "Fruits", priority: "medium" }
  ];
  
  const heatmapReports = [
    { location: "Downtown Market", wasteType: "Produce", amount: "15kg", time: "2 hours ago" },
    { location: "Local Grocery", wasteType: "Bread", amount: "8kg", time: "5 hours ago" },
    { location: "Community Center", wasteType: "Dairy", amount: "12kg", time: "1 day ago" }
  ];

  const dailyTip = "Store herbs in a glass of water in the fridge to keep them fresh for up to 2 weeks!";
  
  const stats = {
    saved: 23,
    wasted: 7,
    totalItems: 42,
    streak: 15
  };

  return (
    <div className="p-6 space-y-6">
      {/* Greeting */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello, {userName}! 👋
        </h1>
        <p className="text-gray-600">
          Here's your food waste overview for today
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Log New Food
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
          <MapPin className="h-4 w-4 mr-2" />
          Make a Report
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Waste
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Saved</p>
              <p className="text-2xl font-bold text-green-600">{stats.saved}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Wasted</p>
              <p className="text-2xl font-bold text-red-600">{stats.wasted}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Items Tracked</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Day Streak</p>
              <p className="text-2xl font-bold text-purple-600">{stats.streak}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soon-to-Expire Items */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              🕒 Top 3 Soon-to-Expire Items
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {expiringItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      item.daysLeft === 1 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {item.daysLeft} day{item.daysLeft !== 1 ? 's' : ''} left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Heatmap Reports */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              📍 Latest Heatmap Waste Reports
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {heatmapReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{report.location}</p>
                    <p className="text-sm text-gray-500">{report.wasteType} • {report.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{report.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">💡</span>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">♻️ Daily Tip</h3>
            <p className="text-gray-700 leading-relaxed">{dailyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 
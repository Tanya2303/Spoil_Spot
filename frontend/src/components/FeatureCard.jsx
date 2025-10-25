import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
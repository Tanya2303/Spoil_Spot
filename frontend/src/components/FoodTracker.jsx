import React, { useState } from 'react';
import { Plus, Upload, Search, Filter, Trash2, Bell, CheckCircle, XCircle, Calendar, Camera } from 'lucide-react';
import ApiService from '../services/api';

const FoodTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    purchaseDate: '',
    expiryDate: '',
    notes: ''
  });

  // Mock food data
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: 'Greek Yogurt',
      category: 'Dairy',
      purchaseDate: '2024-01-15',
      expiryDate: '2024-01-20',
      status: 'expiring-soon', // fresh, expiring-soon, expired
      notes: 'Organic, 2% fat',
      image: null
    },
    {
      id: 2,
      name: 'Fresh Spinach',
      category: 'Vegetables',
      purchaseDate: '2024-01-16',
      expiryDate: '2024-01-18',
      status: 'expired',
      notes: 'Baby spinach leaves',
      image: null
    },
    {
      id: 3,
      name: 'Organic Apples',
      category: 'Fruits',
      purchaseDate: '2024-01-14',
      expiryDate: '2024-01-25',
      status: 'fresh',
      notes: 'Gala apples, 6 pack',
      image: null
    },
    {
      id: 4,
      name: 'Whole Milk',
      category: 'Dairy',
      purchaseDate: '2024-01-17',
      expiryDate: '2024-01-22',
      status: 'fresh',
      notes: '2% milk, 1 gallon',
      image: null
    }
  ]);

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Grains', 'Beverages', 'Snacks', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const foodData = {
        ...formData,
        image: selectedImage,
        status: 'fresh'
      };
      
      // Send to backend
      const response = await ApiService.trackFood(foodData);
      console.log('Food tracked successfully:', response);
      
      // Add to local state
      const newItem = {
        id: Date.now(),
        ...foodData
      };
      setFoodItems(prev => [newItem, ...prev]);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        purchaseDate: '',
        expiryDate: '',
        notes: ''
      });
      setSelectedImage(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error tracking food:', error);
      alert('Failed to track food item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fresh': return '🟢';
      case 'expiring-soon': return '🟡';
      case 'expired': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'fresh': return 'Fresh';
      case 'expiring-soon': return 'Expiring Soon';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const markAsUsed = (id) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const markAsWasted = (id) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'wasted' } : item
    ));
  };

  const deleteItem = (id) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (filter) {
      case 'expired':
        matchesFilter = item.status === 'expired';
        break;
      case 'fresh':
        matchesFilter = item.status === 'fresh';
        break;
      case 'expiring-soon':
        matchesFilter = item.status === 'expiring-soon';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🕒 Food Tracker</h1>
          <p className="text-gray-600">Add, track, and manage your food items</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Food Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Items</option>
          <option value="fresh">🟢 Fresh</option>
          <option value="expiring-soon">🟡 Expiring Soon</option>
          <option value="expired">🔴 Expired</option>
        </select>
      </div>

      {/* Add Food Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Food Item</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Greek Yogurt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receipt Image (OCR Integration)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {selectedImage ? (
                        <div>
                          <img src={selectedImage} alt="Receipt" className="w-full h-32 object-cover rounded mb-2" />
                          <p className="text-sm text-green-600">Image uploaded successfully!</p>
                        </div>
                      ) : (
                        <div>
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload receipt image</p>
                          <p className="text-xs text-gray-500">OCR will extract food details</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Food Item'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {item.image && (
                <div className="h-32 bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-2xl ml-2">{getStatusColor(item.status)}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`font-medium ${
                      daysUntilExpiry < 0 ? 'text-red-600' :
                      daysUntilExpiry <= 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {daysUntilExpiry < 0 ? 'Expired' : 
                       daysUntilExpiry === 0 ? 'Expires today' :
                       `${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''} left`}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-500 italic">{item.notes}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => markAsUsed(item.id)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Used
                  </button>
                  <button
                    onClick={() => markAsWasted(item.id)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Wasted
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default FoodTracker; 
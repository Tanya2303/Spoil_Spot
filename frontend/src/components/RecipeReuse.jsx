import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Leaf, Sparkles, Clock, Users, Star, Plus, ArrowRight } from 'lucide-react';
import ApiService from '../services/api';

const RecipeReuse = () => {
  const [ingredients, setIngredients] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' or 'reuse'
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  // Mock reuse suggestions
  const reuseSuggestions = [
    {
      id: 1,
      title: 'Banana Peels → Fertilizer',
      description: 'Rich in potassium and phosphorus, perfect for plants',
      category: 'Fertilizer',
      difficulty: 'Easy',
      time: '2-3 weeks',
      icon: '🌱'
    },
    {
      id: 2,
      title: 'Coffee Grounds → Exfoliant',
      description: 'Natural body scrub and face mask ingredient',
      category: 'Beauty',
      difficulty: 'Easy',
      time: '5 min',
      icon: '🧴'
    },
    {
      id: 3,
      title: 'Eggshells → Calcium Supplement',
      description: 'Crush and add to soil or compost for calcium',
      category: 'Garden',
      difficulty: 'Easy',
      time: '10 min',
      icon: '🥚'
    },
    {
      id: 4,
      title: 'Citrus Peels → Natural Cleaner',
      description: 'Infuse in vinegar for all-purpose cleaning solution',
      category: 'Cleaning',
      difficulty: 'Medium',
      time: '2 weeks',
      icon: '🍋'
    },
    {
      id: 5,
      title: 'Bread Crumbs → Croutons',
      description: 'Toast stale bread with herbs and olive oil',
      category: 'Food',
      difficulty: 'Easy',
      time: '15 min',
      icon: '🍞'
    },
    {
      id: 6,
      title: 'Milk → Face Mask',
      description: 'Lactic acid in milk helps exfoliate and brighten skin',
      category: 'Beauty',
      difficulty: 'Easy',
      time: '10 min',
      icon: '🥛'
    }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await ApiService.getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Fallback to mock data if API fails
        setRecipes([
          {
            id: 1,
            name: 'Banana Smoothie Bowl',
            ingredients: ['banana', 'yogurt', 'honey'],
            time: '5 min',
            servings: 1,
            difficulty: 'Easy',
            rating: 4.5,
            description: 'A healthy and delicious smoothie bowl using overripe bananas',
            image: null
          },
          {
            id: 2,
            name: 'Stale Bread French Toast',
            ingredients: ['bread', 'eggs', 'milk', 'cinnamon'],
            time: '15 min',
            servings: 2,
            difficulty: 'Easy',
            rating: 4.2,
            description: 'Transform stale bread into a delicious breakfast',
            image: null
          },
          {
            id: 3,
            name: 'Vegetable Scrap Broth',
            ingredients: ['carrot peels', 'onion ends', 'celery leaves', 'herbs'],
            time: '45 min',
            servings: 4,
            difficulty: 'Easy',
            rating: 4.7,
            description: 'Make nutritious broth from vegetable scraps',
            image: null
          }
        ]);
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleGetRecipes = async () => {
    if (!ingredients.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call to Gemini/GPT
    setTimeout(() => {
      // In real app, this would be an actual API call
      const newRecipes = [
        {
          id: Date.now(),
          name: 'Quick Stir Fry',
          ingredients: ingredients.split(',').map(i => i.trim()),
          time: '20 min',
          servings: 2,
          difficulty: 'Easy',
          rating: 4.3,
          description: `A delicious stir fry using ${ingredients}`,
          image: null
        }
      ];
      
      setRecipes(prev => [...newRecipes, ...prev]);
      setIsLoading(false);
    }, 2000);
  };

  const filteredReuseSuggestions = reuseSuggestions.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Fertilizer', 'Beauty', 'Garden', 'Cleaning', 'Food'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">♻️ Recipes & Reuse</h1>
        <p className="text-gray-600">Discover recipes and creative ways to reuse food items</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'recipes'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ChefHat className="h-4 w-4 inline mr-2" />
          Recipe Suggestions
        </button>
        <button
          onClick={() => setActiveTab('reuse')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'reuse'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Leaf className="h-4 w-4 inline mr-2" />
          Reuse Ideas
        </button>
      </div>

      {activeTab === 'recipes' ? (
        /* Recipe Suggestions Section */
        <div className="space-y-6">
          {/* Ingredient Input */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🍴 Find Recipes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your ingredients (separated by commas)
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., banana, yogurt, honey, milk, bread..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleGetRecipes}
                disabled={!ingredients.trim() || isLoading}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Finding Recipes...
                  </>
                ) : (
                  <>
                    <ChefHat className="h-4 w-4 mr-2" />
                    Get Recipe Suggestions
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recipe Cards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Recipes</h3>
            {loadingRecipes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3"></div>
                      <div className="flex space-x-2">
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {recipe.image && (
                      <div className="h-48 bg-gray-100">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{recipe.name}</h4>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm ml-1">{recipe.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {recipe.difficulty}
                        </span>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                          View Recipe
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Reuse Ideas Section */
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🧼 Reuse Ideas</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="What can I do with milk? Search reuse ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Reuse Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReuseSuggestions.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{item.time}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {item.difficulty}
                  </span>
                </div>
                
                <button className="w-full mt-4 text-green-600 hover:text-green-700 text-sm font-medium flex items-center justify-center">
                  Learn More
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredReuseSuggestions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Leaf className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reuse ideas found</h3>
              <p className="text-gray-500">Try searching for different ingredients or categories</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeReuse; 
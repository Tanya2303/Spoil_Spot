const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  static async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    return this.makeRequest('/health');
  }

  // Get food waste data
  static async getFoodWasteData() {
    return this.makeRequest('/food-waste-data');
  }

  // Track food item
  static async trackFood(foodData) {
    return this.makeRequest('/track-food', {
      method: 'POST',
      body: JSON.stringify(foodData),
    });
  }

  // Get impact statistics
  static async getImpactStats() {
    return this.makeRequest('/impact-stats');
  }

  // Get recipes
  static async getRecipes() {
    return this.makeRequest('/recipes');
  }
}

export default ApiService; 
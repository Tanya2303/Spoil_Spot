# SpoilSpot - Food Waste Reduction Platform

SpoilSpot is a comprehensive food waste reduction platform that helps users track their food items, discover recipes for leftovers, and understand their environmental impact.

## Features

- 🍽️ **Food Tracking**: Add and track food items with expiry dates
- 📊 **Impact Analytics**: View your environmental impact statistics
- 🍳 **Recipe Suggestions**: Find recipes using leftover ingredients
- ♻️ **Reuse Ideas**: Discover creative ways to reuse food items
- 📍 **Waste Map**: Visualize global food waste data
- 🎓 **Learning Tips**: Educational content about food waste reduction

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Firebase for authentication

### Backend
- Flask (Python)
- Flask-CORS for cross-origin requests
- Pandas for data processing
- RESTful API endpoints

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd SpoilSpot
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment:

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

### 1. Start the Backend Server

In the backend directory:

```bash
# Make sure you're in the backend directory and virtual environment is activated
python app.py
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check
- `GET /api/food-waste-data` - Get food waste dataset
- `POST /api/track-food` - Track a new food item
- `GET /api/impact-stats` - Get impact statistics
- `GET /api/recipes` - Get recipe suggestions

## Project Structure

```
SpoilSpot/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   ├── package.json       # Node.js dependencies
│   └── vite.config.ts     # Vite configuration
└── datasets/              # Food waste datasets
```

## Key Components

### Frontend Components
- **Dashboard**: Main dashboard with overview
- **FoodTracker**: Add and track food items
- **MyImpact**: View environmental impact statistics
- **RecipeReuse**: Discover recipes and reuse ideas
- **WasteMap**: Visualize global food waste data
- **LearnTips**: Educational content

### Backend Features
- RESTful API with CORS support
- Food waste data processing
- Mock data for development
- Health check endpoint

## Development

### Adding New Features

1. **Frontend**: Add new components in `frontend/src/components/`
2. **Backend**: Add new endpoints in `backend/app.py`
3. **API Integration**: Update `frontend/src/services/api.js`

### Environment Variables

Create a `.env` file in the backend directory for any environment-specific configurations.

## Troubleshooting

### Common Issues

1. **Backend not starting**: Make sure all Python dependencies are installed
2. **Frontend not connecting to backend**: Ensure backend is running on port 5000
3. **CORS errors**: Backend has CORS enabled, but check if frontend URL is allowed

### Port Conflicts

If you encounter port conflicts:
- Backend: Change port in `backend/app.py` line 65
- Frontend: Change port in `frontend/vite.config.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 
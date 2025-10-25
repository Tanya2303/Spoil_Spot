import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

function App() {
  console.log('SpoilSpot App is loading...');
  
  // Simple test component
  const TestComponent = () => (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'green', fontSize: '2rem' }}>🚀 SpoilSpot is Working!</h1>
      <p>If you can see this, the React app is loading correctly.</p>
      <p>Backend status: <span id="backend-status">Checking...</span></p>
      <button onClick={() => {
        fetch('http://localhost:5001/api/health')
          .then(res => res.json())
          .then(data => {
            document.getElementById('backend-status').textContent = '✅ Connected!';
            console.log('Backend response:', data);
          })
          .catch(err => {
            document.getElementById('backend-status').textContent = '❌ Error: ' + err.message;
            console.error('Backend error:', err);
          });
      }}>Test Backend Connection</button>
    </div>
  );
  
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
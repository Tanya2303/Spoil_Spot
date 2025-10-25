import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset to transparent when on landing page and at top
  useEffect(() => {
    if (location.pathname === '/' && window.scrollY === 0) {
      setIsClicked(false);
      setIsScrolled(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsClicked(true);
  };

  const handleLinkClick = () => {
    setIsClicked(true);
    setIsMenuOpen(false);
  };

  const handleNavbarClick = () => {
    setIsClicked(true);
  };

  // Reset clicked state when user scrolls back to top on landing page
  useEffect(() => {
    if (location.pathname === '/' && window.scrollY === 0) {
      setIsClicked(false);
    }
  }, [isScrolled, location.pathname]);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${isScrolled || isClicked || isMenuOpen 
      ? 'bg-white shadow-lg' 
      : 'bg-transparent'
    }
  `;

  const textClasses = `
    transition-colors duration-300
    ${isScrolled || isClicked || isMenuOpen 
      ? 'text-gray-900' 
      : 'text-white'
    }
  `;

  const linkClasses = `
    transition-colors duration-200
    ${isScrolled || isClicked || isMenuOpen 
      ? 'text-gray-700 hover:text-green-600' 
      : 'text-white hover:text-green-200'
    }
  `;

  return (
    <nav className={navbarClasses} onClick={handleNavbarClick}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left - SpoilSpot */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
              <Leaf className={`h-12 w-12 transition-colors duration-300 ${isScrolled || isClicked || isMenuOpen ? 'text-green-600' : 'text-white'}`} />
              <span className={`text-4xl font-bold transition-colors duration-300 ${textClasses}`}>SpoilSpot</span>
            </Link>
          </div>

          {/* Middle - Dashboard */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/dashboard" 
              className={`px-4 py-2 rounded-md text-2xl font-medium transition-colors duration-200 ${linkClasses}`}
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
          </div>

          {/* Right - Login and Signup */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-md text-2xl font-medium transition-colors duration-200 ${linkClasses}`}
              onClick={handleLinkClick}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
              onClick={handleLinkClick}
            >
              Signup
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`p-2 transition-colors duration-200 ${linkClasses}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
                onClick={handleLinkClick}
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
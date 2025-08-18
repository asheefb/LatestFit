import React, { useState } from "react";
import {
  Menu,
  X,
  Ruler,
  Settings,
  User,
  Home,
  BarChart3,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [islogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handalRedirect = () => {
    if (islogin) {
      // navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "measurements", label: "Measurements", icon: Ruler },
    { id: "customers", label: "Customers", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LatestFit
              </h1>
              <p className="text-xs text-gray-500 sm:block">
                Professional Measurement Tool
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="md:flex space-x-1">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? "bg-blue-100 text-blue-700 shadow-md"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* User Profile */}
            <div className="sm:flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1">
              {/* <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Your Brother</span> */}

              {!islogin ? (
                <button
                  className="header-action-btn"
                  aria-label="Open shopping cart"
                  data-panel-btn="cart"
                  onClick={handalRedirect}
                >
                  <User className="h-6 w-6 text-gray-600" />
                </button>
              ) : (
                <div>hi</div>
              )}
            </div>

            {/* Settings Button */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Section Indicator */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>
    </header>
  );
}

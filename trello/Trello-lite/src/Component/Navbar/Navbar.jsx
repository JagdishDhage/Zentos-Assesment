import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CheckSquare } from "lucide-react";

function Navbar() {

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CheckSquare size={24} className="text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                Trello-Lite
              </span>
            </Link>
          </div>

          <div className="hidden md:flex">
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-1">
              <Link
                to="/"
                className="px-4 py-2 mx-1 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Tasks
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 mx-1 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button className="bg-gray-950  text-white font-medium py-2 px-4 rounded-full transition-colors">
              DarkMode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
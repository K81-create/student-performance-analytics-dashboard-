import React, { useState } from "react";
import { GraduationCap, UserCircle, Bell, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-wide">
          Student Dashboard
        </span>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors text-gray-700">
          <UserCircle className="w-6 h-6 text-gray-500" />
          <span className="font-medium hidden sm:block">Admin</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
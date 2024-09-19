import React from 'react';

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-bold">homways</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://www.homways.com/" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="https://www.homways.com/" className="text-gray-600 hover:text-gray-900">How</a>
        <a href="https://www.homways.com/pricing-plans" className="text-gray-600 hover:text-gray-900">Pricing</a>
        <a href="https://www.homways.com/" className="text-gray-600 hover:text-gray-900">Contact</a>
        <a href="https://www.homways.com/partners" className="text-gray-600 hover:text-gray-900">Partners</a>
        <a href="https://www.homways.com/" className="text-gray-600 hover:text-gray-900">Log In</a>
        <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};

export default Header;
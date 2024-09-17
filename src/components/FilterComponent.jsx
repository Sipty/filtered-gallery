import React, { useState, useEffect } from 'react';

const FilterComponent = ({ onFilterChange, initialFilters }) => {
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);
  const [bedroomRange, setBedroomRange] = useState(initialFilters.bedroomRange);
  const [showUnlisted, setShowUnlisted] = useState(initialFilters.showUnlisted);

  useEffect(() => {
    onFilterChange({ priceRange, bedroomRange, showUnlisted });
  }, [priceRange, bedroomRange, showUnlisted, onFilterChange]);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const handleBedroomChange = (e) => {
    const value = parseInt(e.target.value);
    setBedroomRange([value, 4]); // Assuming 4 is the maximum number of bedrooms
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms: {bedroomRange[0]}
          </label>
          <input
            type="range"
            min="0"
            max="4"
            value={bedroomRange[0]}
            onChange={handleBedroomChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4+</span>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showUnlisted"
            checked={showUnlisted}
            onChange={(e) => setShowUnlisted(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="showUnlisted" className="ml-2 block text-sm text-gray-900">
            Show properties without listed prices
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
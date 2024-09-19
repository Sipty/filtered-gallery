import React, { useState, useEffect } from 'react';
import { Droplet, Car, Utensils, Waves, Dumbbell, Briefcase, Package, Users, Dog } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = ({ onFilterChange, initialFilters }) => {
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);
  const [bedroomRange, setBedroomRange] = useState(initialFilters.bedroomRange);
  const [showUnlisted, setShowUnlisted] = useState(initialFilters.showUnlisted);
  const [moveInDate, setMoveInDate] = useState(null);
  const [amenities, setAmenities] = useState({
    wash_dry: initialFilters.wash_dry,
    parking: initialFilters.parking,
    dishwasher: initialFilters.dishwasher,
    pool: initialFilters.pool,
    fitness: initialFilters.fitness,
    cowork: initialFilters.cowork,
    package: initialFilters.package,
    community_space: initialFilters.community_space,
    pets: initialFilters.pets,
  });

  useEffect(() => {
    onFilterChange({ priceRange, bedroomRange, showUnlisted, ...amenities });
  }, [priceRange, bedroomRange, showUnlisted, amenities, onFilterChange]);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const handleBedroomChange = (e) => {
    const value = parseInt(e.target.value);
    setBedroomRange([0, value]);
  };

  const handleAmenityChange = (amenity) => {
    setAmenities(prev => ({ ...prev, [amenity]: !prev[amenity] }));
  };

  const amenityFilters = [
    { name: 'Washer/Dryer', key: 'wash_dry', icon: Droplet },
    { name: 'Parking', key: 'parking', icon: Car },
    { name: 'Dishwasher', key: 'dishwasher', icon: Utensils },
    { name: 'Pool', key: 'pool', icon: Waves },
    { name: 'Fitness Center', key: 'fitness', icon: Dumbbell },
    { name: 'Co-working Space', key: 'cowork', icon: Briefcase },
    { name: 'Package Service', key: 'package', icon: Package },
    { name: 'Community Space', key: 'community_space', icon: Users },
    { name: 'Pet-friendly', key: 'pets', icon: Dog },
  ];

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
            Bedrooms: Up to {bedroomRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={bedroomRange[1]}
            onChange={handleBedroomChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5+</span>
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

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Amenities</h3>
          <div className="space-y-2">
            {amenityFilters.map(({ name, key, icon: Icon }) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={amenities[key]}
                  onChange={() => handleAmenityChange(key)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-2 flex items-center text-sm text-gray-900">
                  <Icon size={16} className="mr-1" />
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Move-in Date</h3>
          <DatePicker
            selected={moveInDate}
            onChange={(date) => setMoveInDate(date)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select move-in date"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
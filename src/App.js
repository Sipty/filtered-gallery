import './App.css';
import React, { useState } from 'react';
import ImageGallery from './components/Gallery';
import Header from './components/Header';
import FilterComponent from './components/FilterComponent';
import { properties } from './data/propertyData';

function App() {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    bedroomRange: [0, 5],
    showUnlisted: true,
    wash_dry: false,
    parking: false,
    dishwasher: false,
    pool: false,
    fitness: false,
    cowork: false,
    package: false,
    community_space: false,
    pets: false
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProperties = properties.filter(property => {
    const isPriceUnlisted = property.price.toLowerCase().includes('call for information');

    if (isPriceUnlisted && !filters.showUnlisted) {
      return false;
    }

    const priceMatch = isPriceUnlisted || (() => {
      const priceNumbers = property.price.match(/\d+/g);
      if (!priceNumbers) return true;
      const minPrice = Math.min(...priceNumbers.map(Number));
      const maxPrice = Math.max(...priceNumbers.map(Number));
      return maxPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
    })();

    const bedroomMatch = 
      property.min_bedrooms <= filters.bedroomRange[1] && 
      property.max_bedrooms >= filters.bedroomRange[0];

    const amenityMatch = Object.keys(filters).every(key => {
      if (['priceRange', 'bedroomRange', 'showUnlisted'].includes(key)) {
        return true;
      }
      return !filters[key] || property[key];
    });

    return priceMatch && bedroomMatch && amenityMatch;
  });

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-['Outfit']">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 overflow-y-scroll p-4 bg-white shadow-md">
          <FilterComponent onFilterChange={handleFilterChange} initialFilters={filters} />
        </aside>
        <main className="w-3/4 overflow-y-scroll p-8">
          <h1 className="text-3xl font-bold mb-8">Featured Properties</h1>
          <ImageGallery properties={filteredProperties} />
        </main>
      </div>
    </div>
  );
}

export default App;
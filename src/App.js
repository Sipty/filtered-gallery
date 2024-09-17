import './App.css';
import React, { useState } from 'react';
import ImageGallery from './components/Gallery';
import Header from './components/Header';
import FilterComponent from './components/FilterComponent';

function App() {
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    bedroomRange: [0, 10],
    showUnlisted: true
  });

  const properties = [
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/11/1250-9th-St-NW-Washington-DC-print-003-DSC-4841-2-3-6-4200x2802-300dpi-scaled-e1703869612842-300x136.jpg',
      title: 'The Colonel',
      min_bedrooms: 2,
      max_bedrooms: 5,
      address: '1250 9th Street, NW',
      price: '$1950 - $3975'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2024/01/5008.jpg',
      title: 'The Corcoran',
      min_bedrooms: 3,
      max_bedrooms: 4,
      address: '1350 Corcoran Street, NW',
      price: 'Price: Call for Information'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/002_1255_22ND_ST_NW-_LEGACY_WEST_END_298465_547040-300x200.jpg',
      title: 'Legacy Apartments',
      min_bedrooms: 1,
      max_bedrooms: 4,
      address: '1255 22nd Street, NW',
      price: 'Price: Call for Information'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/11/modo-601-PH-08-scaled-1-300x200.webp',
      title: 'MODO Apartments',
      min_bedrooms: 1,
      max_bedrooms: 3,
      address: '3709 New Hampshire Avenue, NW',
      price: '$3450 - $3900'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5030.jpg',
      title: 'Madrona Apartments',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '2213-17 14th Street, NW',
      price: '$3599'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5028.jpg',
      title: 'Winston House',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '2140 L Street, NW',
      price: '$2450 - $3950'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5022.jpg',
      title: '2715 M Street',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '2715 M Street, NW',
      price: 'Price: Call for Information'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5020.jpg',
      title: '501 H Street, NE',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '501 H Street, NE',
      price: 'Price: Call for Information'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5018.jpg',
      title: 'Historic Row Apartments',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '515 9th Street, NW',
      price: 'Price: Call for Information'
    },
    {
      imageUrl: 'https://borgerresidential.com/wp-content/uploads/2023/12/5016.jpg',
      title: 'Tenley View Apartments',
      min_bedrooms: 1,
      max_bedrooms: 2,
      address: '4600 Wisconsin Avenue, NW',
      price: '$2250'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProperties = properties.filter(property => {
    const isPriceUnlisted = property.price === 'Price: Call for Information';

    if (isPriceUnlisted && !filters.showUnlisted) {
      return false;
    }

    const priceMatch = isPriceUnlisted || 
      (parseFloat(property.price.replace(/[^0-9.-]+/g, "")) >= filters.priceRange[0] &&
       parseFloat(property.price.replace(/[^0-9.-]+/g, "")) <= filters.priceRange[1]);

    const bedroomMatch = 
      property.min_bedrooms <= filters.bedroomRange[1] && 
      property.max_bedrooms >= filters.bedroomRange[0];

    return priceMatch && bedroomMatch;
  });


  return (
    <div className="bg-gray-100 h-screen flex flex-col">
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


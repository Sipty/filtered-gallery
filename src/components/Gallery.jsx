import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';

const ImageGallery = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No properties match your current filters. Please adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ImageGallery;
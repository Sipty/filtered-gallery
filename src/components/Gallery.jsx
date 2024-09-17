import React from 'react';
import PropertyCard from './PropertyCard';

const ImageGallery = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No properties match your current filters. Please adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          imageUrl={property.imageUrl}
          title={property.title}
          min_bedrooms={property.min_bedrooms}
          max_bedrooms={property.max_bedrooms}
          address={property.address}
          price={property.price}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
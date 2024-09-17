import React from 'react';

const PropertyCard = ({ imageUrl, title, min_bedrooms, max_bedrooms, address, price }) => {
  const getBedroomText = () => {
    if (min_bedrooms === max_bedrooms) {
      return `${min_bedrooms} ${min_bedrooms === 1 ? 'bedroom' : 'bedrooms'}`;
    } else {
      return `${min_bedrooms} - ${max_bedrooms} bedrooms`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative pb-[60%]">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{title}</h3>
        <p className="text-gray-600 text-sm mb-1">{getBedroomText()}</p>
        <p className="text-gray-600 text-sm mb-2 truncate">{address}</p>
        <p className="text-green-600 font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
import React from 'react';
import { Droplet, Car, Utensils, Waves, Dumbbell, Briefcase, Package, Users, Dog } from 'lucide-react';

const PropertyCard = ({ property, onCardClick }) => {
  const { imageUrl, title, min_bedrooms, max_bedrooms, address, price, wash_dry, parking, dishwasher, pool, fitness, cowork, package: packageService, community_space, pets } = property;

  const getBedroomText = () => {
    if (min_bedrooms === max_bedrooms) {
      return `${min_bedrooms} ${min_bedrooms === 1 ? 'bedroom' : 'bedrooms'}`;
    } else {
      return `${min_bedrooms} - ${max_bedrooms} bedrooms`;
    }
  };

  const amenities = [
    { name: 'Washer/Dryer', icon: Droplet, value: wash_dry },
    { name: 'Parking', icon: Car, value: parking },
    { name: 'Dishwasher', icon: Utensils, value: dishwasher },
    { name: 'Pool', icon: Waves, value: pool },
    { name: 'Fitness Center', icon: Dumbbell, value: fitness },
    { name: 'Co-working Space', icon: Briefcase, value: cowork },
    { name: 'Package Service', icon: Package, value: packageService },
    { name: 'Community Space', icon: Users, value: community_space },
    { name: 'Pet-friendly', icon: Dog, value: pets },
  ];

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => onCardClick(property)}
    >
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
        <p className="text-green-600 font-semibold mb-2">{price}</p>
        <div className="flex flex-wrap gap-2">
          {amenities.map(({ name, icon: Icon, value }) => value && (
            <div key={name} className="flex items-center text-xs text-gray-600" title={name}>
              <Icon size={16} className="mr-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
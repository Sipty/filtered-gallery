import React from 'react';
import { X, Droplet, Car, Utensils, Waves, Dumbbell, Briefcase, Package, Users, Dog, Phone } from 'lucide-react';

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  const amenities = [
    { name: 'Washer/Dryer', icon: Droplet, value: property.wash_dry },
    { name: 'Parking', icon: Car, value: property.parking },
    { name: 'Dishwasher', icon: Utensils, value: property.dishwasher },
    { name: 'Pool', icon: Waves, value: property.pool },
    { name: 'Fitness Center', icon: Dumbbell, value: property.fitness },
    { name: 'Co-working Space', icon: Briefcase, value: property.cowork },
    { name: 'Package Service', icon: Package, value: property.package },
    { name: 'Community Space', icon: Users, value: property.community_space },
    { name: 'Pet-friendly', icon: Dog, value: property.pets },
  ];

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleBackgroundClick}>
      <div className="bg-white w-[65%] h-[80%] my-[10vh] max-w-6xl rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="relative h-1/3 min-h-[200px]">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          <p className="text-gray-600 mb-2 text-lg">{property.address}</p>
          <p className="text-green-600 font-semibold text-2xl mb-4">{property.price}</p>
          <p className="text-gray-700 mb-4 text-xl">
            {property.min_bedrooms === property.max_bedrooms
              ? `${property.min_bedrooms} ${property.min_bedrooms === 1 ? 'bedroom' : 'bedrooms'}`
              : `${property.min_bedrooms} - ${property.max_bedrooms} bedrooms`}
          </p>
          <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {amenities.map(({ name, icon: Icon, value }) => (
              value && (
                <div key={name} className="flex items-center">
                  <Icon size={24} className="mr-3 text-blue-500" />
                  <span className="text-lg">{name}</span>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex">
          <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-2 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-gray-300 hover:via-gray-200 hover:to-gray-300">
            Enquire further
            <Phone size={20} className="ml-2" />
          </button>
          <button className="flex-[3] bg-green-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-600 hover:via-green-500 hover:to-green-600">
            APPLY NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
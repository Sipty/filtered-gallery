import React, { useEffect, useRef, useState } from 'react';
import { X, Droplet, Car, Utensils, Waves, Dumbbell, Briefcase, Package, Users, Dog, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import FloorPlan from './FloorPlan';

const PropertyModal = ({ property, onClose }) => {
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedBedroom, setSelectedBedroom] = useState('All');
  const images = [property.imageUrl, ...(property.additionalImages || [])];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

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

  const bedroomSizes = ['All', ...Array.from({ length: property.max_bedrooms - property.min_bedrooms + 1 }, (_, i) => property.min_bedrooms + i)];

  const renderAmenityList = () => (
    <ul className="list-none p-0 grid grid-cols-2 gap-2">
      {amenities.map(({ name, icon: Icon, value }) => value && (
        <li key={name} className="flex items-center mb-1">
          <Icon size={16} className="mr-1 text-blue-500" />
          <span className="text-sm">{name}</span>
        </li>
      ))}
    </ul>
  );

  const handleBedroomClick = (size) => {
    setSelectedBedroom(size);
  };

  const getBedroomPrice = (bedroomCount) => {
    if (bedroomCount === 'All') {
      const prices = bedroomSizes
        .filter(size => size !== 'All')
        .map(size => property[`price_bed_${size}`])
        .filter(price => price) // Filter out undefined prices
        .map(price => parseFloat(price.replace(/[^0-9.-]+/g, "")));
      
      if (prices.length === 0) return 'Price not available';
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      return `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`;
    } else {
      const specificPrice = property[`price_bed_${bedroomCount}`];
      if (!specificPrice) return 'Price not available';
      
      const prices = property[`units_bed_${bedroomCount}`]
        .map(unit => parseFloat(unit.price.replace(/[^0-9.-]+/g, "")));
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (minPrice === maxPrice) {
        return `$${minPrice.toFixed(0)}`;
      } else {
        return `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div ref={modalRef} className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-7/12 h-full flex flex-col animate-slide-in">
        <div className="flex-grow overflow-y-auto">
          <div className="relative h-3/5 min-h-[240px] shadow-md">
            <img
              src={images[currentImageIndex]}
              alt={`${property.title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover shadow-lg"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-1">{property.title}</h2>
            <p className="text-gray-600 mb-3 text-sm">{property.address}</p>
            
            <div className="mb-2">
              <div className="flex flex-wrap border-b border-gray-300">
                {bedroomSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleBedroomClick(size)}
                    className={`flex-1 px-3 py-1 text-center font-semibold text-sm ${
                      selectedBedroom === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size === 'All' ? 'All' : `${size} Bed`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-green-600 font-semibold text-xl mb-2">{getBedroomPrice(selectedBedroom)}</p>
              <div className="flex flex-col space-y-2">
              <div>
                <h4 className="text-sm font-semibold mb-1">Amenities:</h4>
                {renderAmenityList()}
              </div>
              <FloorPlan property={property} selectedBedroom={selectedBedroom} />
            </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-200 bg-white flex sticky bottom-0 z-10 shadow-md">
          <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg mr-2 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-gray-300 hover:via-gray-200 hover:to-gray-300 text-sm">
            Enquire further
            <Phone size={16} className="ml-1" />
          </button>
          <button className="flex-[3] bg-green-500 text-white py-2 px-3 rounded-lg font-bold transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-600 hover:via-green-500 hover:to-green-600 text-sm">
            APPLY NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
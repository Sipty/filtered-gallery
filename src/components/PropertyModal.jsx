import React, { useEffect, useRef, useState } from 'react';
import { X, Droplet, Car, Utensils, Waves, Dumbbell, Briefcase, Package, Users, Dog, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyModal = ({ property, onClose }) => {
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedBedroom, setSelectedBedroom] = useState(property.min_bedrooms);

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

  const bedroomSizes = Array.from({ length: property.max_bedrooms - property.min_bedrooms + 1 }, (_, i) => property.min_bedrooms + i);

  const renderAmenityList = () => (
    <ul className="list-none p-0 grid grid-cols-2 gap-4">
      {amenities.map(({ name, icon: Icon, value }) => value && (
        <li key={name} className="flex items-center mb-2">
          <Icon size={20} className="mr-2 text-blue-500" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );

  const handleBedroomClick = (size) => {
    setSelectedBedroom(size);
  };

  const getBedroomPrice = (bedroomCount) => {
    const specificPrice = property[`price_bed_${bedroomCount}`];
    return specificPrice || property.price;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div ref={modalRef} className="bg-white w-full sm:w-2/3 md:w-3/4 lg:w-4/5 h-full flex flex-col animate-slide-in">
        <div className="flex-grow overflow-y-auto">
          <div className="relative h-1/3 min-h-[200px] shadow-md">
            <img
              src={images[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
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
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-4 text-lg">{property.address}</p>
            
            <div className="mb-6">
              <div className="flex border-b border-gray-300">
                {bedroomSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleBedroomClick(size)}
                    className={`flex-1 px-4 py-2 text-center font-semibold ${
                      selectedBedroom === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size} Bedroom
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">{selectedBedroom} Bedroom Details</h3>
              <p className="text-green-600 font-semibold text-xl mb-4">{getBedroomPrice(selectedBedroom)}</p>
              <h4 className="text-lg font-semibold mb-2">Amenities:</h4>
              {renderAmenityList()}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white flex sticky bottom-0 z-10 shadow-md">
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
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700 transition-colors duration-300" 
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const FloorPlan = ({ property, selectedBedroom }) => {
  const [expandedFloorPlan, setExpandedFloorPlan] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const bedroomSizes = selectedBedroom === 'All'
    ? Array.from(
        { length: property.max_bedrooms - property.min_bedrooms + 1 },
        (_, i) => property.min_bedrooms + i
      )
    : [parseInt(selectedBedroom)];

  const toggleFloorPlanDetails = (bedrooms) => {
    setExpandedFloorPlan(expandedFloorPlan === bedrooms ? null : bedrooms);
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const calculateSqftRange = (units) => {
    if (!units || units.length === 0) return 'N/A';
    const sqfts = units.map(unit => parseInt(unit.sqft));
    const minSqft = Math.min(...sqfts);
    const maxSqft = Math.max(...sqfts);
    return minSqft === maxSqft ? `${minSqft}` : `${minSqft} - ${maxSqft}`;
  };

  return (
    <div className="mt-6">
      {bedroomSizes.map((bedrooms) => {
        const floorPlanKey = `floor_plan_${bedrooms}`;
        const priceKey = `price_bed_${bedrooms}`;
        const bathKey = `bath_bed_${bedrooms}`;
        const availableUnitsKey = `available_units_bed_${bedrooms}`;
        const unitsKey = `units_bed_${bedrooms}`;
        if (!property[floorPlanKey]) return null;

        const sqftRange = calculateSqftRange(property[unitsKey]);

        return (
          <div key={bedrooms} className="mb-6 border p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{bedrooms} Bedroom</h4>
                <p className="text-blue-600 font-semibold">{property[priceKey]}</p>
                <p className="text-sm text-gray-600">
                  {bedrooms} bed, {property[bathKey]} bath, {sqftRange} sq ft
                </p>
                <button
                  className="mt-2 text-blue-500 text-sm"
                  onClick={() => toggleFloorPlanDetails(bedrooms)}
                >
                  {expandedFloorPlan === bedrooms ? 'Hide Floor Plan Details ▲' : 'Show Floor Plan Details ▼'}
                </button>
              </div>
              <img
                src={property[floorPlanKey]}
                alt={`${bedrooms} Bedroom Floor Plan`}
                className="w-24 h-24 object-cover cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => openModal(property[floorPlanKey])}
              />
            </div>
            {expandedFloorPlan === bedrooms && property[unitsKey] && (
              <div className="mt-4 pt-4 border-t">
                <p className="font-semibold mb-2">
                  {property[availableUnitsKey]} Available Units
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Unit</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Sq Ft</th>
                      <th className="text-left py-2">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property[unitsKey].map((unit) => (
                      <tr key={unit.unit_number} className="border-b">
                        <td className="py-2">{unit.unit_number}</td>
                        <td className="py-2">{unit.price}</td>
                        <td className="py-2">{unit.sqft}</td>
                        <td className="py-2">{unit.availability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {property[unitsKey].length > 3 && (
                  <button className="mt-2 text-blue-500 text-sm">
                    Show More Units ({property[unitsKey].length - 3})
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
      <Modal isOpen={!!modalImage} onClose={closeModal}>
        <img src={modalImage} alt="Full-size Floor Plan" className="max-w-full max-h-[80vh] object-contain" />
      </Modal>
    </div>
  );
};

export default FloorPlan;
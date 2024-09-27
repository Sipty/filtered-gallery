import React, { useState } from 'react';

const FloorPlan = ({ property, selectedBedroom }) => {
  const [expandedFloorPlan, setExpandedFloorPlan] = useState(null);

  const bedroomSizes = selectedBedroom === 'All'
    ? Array.from(
        { length: property.max_bedrooms - property.min_bedrooms + 1 },
        (_, i) => property.min_bedrooms + i
      )
    : [parseInt(selectedBedroom)];

  const toggleFloorPlanDetails = (bedrooms) => {
    setExpandedFloorPlan(expandedFloorPlan === bedrooms ? null : bedrooms);
  };

  return (
    <div className="mt-6">
      {bedroomSizes.map((bedrooms) => {
        const floorPlanKey = `floor_plan_${bedrooms}`;
        const priceKey = `price_bed_${bedrooms}`;
        const sqftKey = `sqft_bed_${bedrooms}`;
        const bathKey = `bath_bed_${bedrooms}`;
        const availableUnitsKey = `available_units_bed_${bedrooms}`;
        const unitsKey = `units_bed_${bedrooms}`;

        if (!property[floorPlanKey]) return null;

        return (
          <div key={bedrooms} className="mb-6 border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{bedrooms} Bedroom</h4>
                <p className="text-blue-600 font-semibold">{property[priceKey]}</p>
                <p className="text-sm text-gray-600">
                  {bedrooms} bed, {property[bathKey]} bath, {property[sqftKey]}
                </p>
              </div>
              <img 
                src={property[floorPlanKey]} 
                alt={`${bedrooms} Bedroom Floor Plan`} 
                className="w-24 h-24 object-cover"
              />
            </div>
            <button 
              className="mt-2 text-blue-500 text-sm"
              onClick={() => toggleFloorPlanDetails(bedrooms)}
            >
              {expandedFloorPlan === bedrooms ? 'Hide Floor Plan Details ▲' : 'Show Floor Plan Details ▼'}
            </button>
            {expandedFloorPlan === bedrooms && property[unitsKey] && (
              <div className="mt-4">
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
    </div>
  );
};

export default FloorPlan;
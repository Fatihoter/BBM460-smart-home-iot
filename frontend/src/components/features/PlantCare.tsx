import React, { useEffect, useState } from 'react';
import { Droplet, BellRing } from 'lucide-react';
import Card from '../ui/Card';
import { useSmartHome } from '../../context/SmartHomeContext';

const PlantCare = () => {
  const { sensorData, error } = useSmartHome();
  const [showNotification, setShowNotification] = useState(false);

  const soilMoistureRaw = sensorData?.['home/plants/moisture'];
  const soilMoisture = soilMoistureRaw && !isNaN(parseFloat(soilMoistureRaw)) ? parseFloat(soilMoistureRaw) : null;

  useEffect(() => {
    if (soilMoisture !== null && soilMoisture < 30) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [soilMoisture]);

  const getMoistureStatus = () => {
    if (soilMoisture === null) return 'Reading...';
    if (soilMoisture < 30) return 'Low - Plant needs water!';
    if (soilMoisture < 60) return 'Adequate';
    return 'Optimal';
  };

  const getMoistureColor = () => {
    if (soilMoisture === null) return 'text-gray-500';
    if (soilMoisture < 30) return 'text-red-600';
    if (soilMoisture < 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBarColor = () => {
    if (soilMoisture === null) return 'bg-gray-300';
    if (soilMoisture < 30) return 'bg-red-500';
    if (soilMoisture < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card
      title="Plant Care System"
      icon={<Droplet className="text-teal-500" />}
      color="bg-teal-100"
    >
      {error && error.includes('Sensör') && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Soil Moisture Level</h3>
        
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-4 rounded-full ${getBarColor()} transition-all duration-500 ease-out`}
            style={{ width: `${soilMoisture ?? 0}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Dry</span>
          <span>Moist</span>
          <span>Wet</span>
        </div>

        <div className="mt-4 flex items-center">
          <p className="text-sm">Status: </p>
          <p className={`ml-2 text-sm font-medium ${getMoistureColor()}`}>
            {getMoistureStatus()}
          </p>
        </div>

        {showNotification && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex items-start">
            <BellRing className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Water needed!</p>
              <p className="text-xs text-yellow-700">
                Your plant's soil moisture is below the recommended level.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PlantCare;
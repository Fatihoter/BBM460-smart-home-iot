import React from 'react';
import { Thermometer, Droplet } from 'lucide-react';
import Card from '../ui/Card';
import Toggle from '../ui/Toggle';
import { useSmartHome } from '../../context/SmartHomeContext';

const ClimateControl = () => {
  const { deviceStates, sensorData, controlAc, loading, error } = useSmartHome();
  const isAcOn = deviceStates.ac;

  const temperature = sensorData['home/climate/temprature'] ?? 'N/A';
  const humidity = sensorData['home/climate/humidity'] ?? 'N/A';

  const handleToggle = () => {
    controlAc(!isAcOn);
  };

  return (
    <Card
      title="Climate Control"
      icon={<Thermometer className="text-blue-500" />}
      color="bg-blue-100"
    >
      {error && (error.includes('ac') || error.includes('Sensör')) && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center"><Thermometer size={14} className="mr-1"/>Temperature</p>
          <p className="text-2xl font-semibold text-gray-800">{temperature}°C</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center"><Droplet size={14} className="mr-1"/>Humidity</p>
          <p className="text-2xl font-semibold text-gray-800">{humidity}%</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Air Conditioning (AC)</h3>
            <p className="text-gray-500 text-sm">
              {isAcOn ? 'AC is ON' : 'AC is OFF'}
            </p>
          </div>
          <Toggle
            enabled={isAcOn}
            onChange={handleToggle}
          />
        </div>
      </div>
    </Card>
  );
};

export default ClimateControl;
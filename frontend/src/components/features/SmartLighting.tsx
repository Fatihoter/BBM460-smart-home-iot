import React from 'react';
import { Lightbulb } from 'lucide-react';
import Card from '../ui/Card';
import Toggle from '../ui/Toggle';
import { useSmartHome } from '../../context/SmartHomeContext';

const SmartLighting = () => {
  const { deviceStates, controlLed, loading, error } = useSmartHome();
  const isLedOn = deviceStates.led;

  const handleToggle = () => {
    controlLed(!isLedOn);
  };

  return (
    <Card
      title="Smart Lighting"
      icon={<Lightbulb className={`transition-colors ${isLedOn ? 'text-yellow-500' : 'text-gray-400'}`} />}
      color="bg-yellow-100"
    >
      {error && error.includes('led') && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Main Light (LED)</h3>
            <p className="text-gray-500 text-sm">
              {isLedOn ? 'Light is ON' : 'Light is OFF'}
            </p>
          </div>
          <Toggle
            enabled={isLedOn}
            onChange={handleToggle}
          />
        </div>
      </div>
    </Card>
  );
};

export default SmartLighting;
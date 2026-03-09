import React from 'react';
import { Power } from 'lucide-react';
import Card from '../ui/Card';
import Toggle from '../ui/Toggle';
import { useSmartHome } from '../../context/SmartHomeContext';

const EnergyManagement = () => {
  const { deviceStates, controlSmartPlug, loading, error } = useSmartHome();
  const isPlugOn = deviceStates.smartPlug;

  const handleToggle = () => {
    controlSmartPlug(!isPlugOn);
  };

  return (
    <Card
      title="Smart Plug"
      icon={<Power className={`transition-colors ${isPlugOn ? 'text-purple-600' : 'text-gray-400'}`} />}
      color="bg-purple-100"
    >
      {error && error.includes('Smartplug') && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Main Smart Plug</h3>
            <p className="text-gray-500 text-sm">
              {isPlugOn ? 'Plug is ON' : 'Plug is OFF'}
            </p>
          </div>
          <Toggle
            enabled={isPlugOn}
            onChange={handleToggle}
          />
        </div>
      </div>
    </Card>
  );
};

export default EnergyManagement;
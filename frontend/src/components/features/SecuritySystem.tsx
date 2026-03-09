import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import Card from '../ui/Card';
import { useSmartHome } from '../../context/SmartHomeContext';

const SecuritySystem = () => {
  const { deviceStates, controlDoor, loading, error } = useSmartHome();
  const isDoorLocked = deviceStates.door;

  const handleToggle = () => {
    controlDoor(!isDoorLocked);
  };

  return (
    <Card
      title="Security System"
      icon={isDoorLocked ? 
        <Lock className="text-green-500" /> : 
        <Unlock className="text-red-500" />}
      color="bg-green-100"
    >
      {error && error.includes('door') && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Front Door Lock</h3>
            <p className="text-gray-500 text-sm">
              {isDoorLocked ? 'Door is LOCKED' : 'Door is UNLOCKED'}
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center justify-center p-3 rounded-full transition-colors disabled:opacity-50 ${
              isDoorLocked
                ? 'bg-green-100 hover:bg-green-200 text-green-600'
                : 'bg-red-100 hover:bg-red-200 text-red-600'
            }`}
          >
            {isDoorLocked ? (
              <Lock className="h-6 w-6" />
            ) : (
              <Unlock className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            {isDoorLocked ? (
              <>
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm text-gray-700">Secure</p>
              </>
            ) : (
              <>
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <p className="text-sm text-gray-700">Unsecured - Lock recommended</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SecuritySystem;
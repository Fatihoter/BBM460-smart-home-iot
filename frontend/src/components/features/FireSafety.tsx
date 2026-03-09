import React from 'react';
import { Flame, AlertCircle, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';
import { useSmartHome } from '../../context/SmartHomeContext';

const FireSafety = () => {
  const { sensorData, error } = useSmartHome();

  const fireStatus = sensorData?.['home/safety/fire'] ?? 'N/A';
  const isAlerting = fireStatus === 'DETECTED';

  return (
    <Card
      title="Fire Safety System"
      icon={isAlerting ? <Flame className="text-red-500 animate-pulse" /> : <ShieldCheck className="text-green-500" />}
      color={isAlerting ? "bg-red-100" : "bg-green-100"}
    >
      {error && error.includes('Sensör') && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <div className="mt-4">
        <div className="flex items-center mb-4">
          <div className={`h-3 w-3 rounded-full mr-2 ${isAlerting ? 'bg-red-600 animate-pulse' : 'bg-green-500'}`}></div>
          <p className={`text-sm font-medium ${isAlerting ? 'text-red-600' : 'text-green-600'}`}>
            {fireStatus === 'N/A' ? 'Checking...' : (isAlerting ? 'SMOKE DETECTED!' : 'Area Clear')}
          </p>
        </div>

        {isAlerting && (
          <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <div>
                <p className="font-bold text-red-600">FIRE ALERT</p>
                <p className="text-sm text-red-700">
                  Smoke detected! Check the area immediately. Consider safety protocols.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {fireStatus === 'N/A' ? 'Waiting for sensor data...' : `Smoke sensor status: ${fireStatus}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FireSafety;
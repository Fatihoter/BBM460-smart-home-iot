import React from 'react';
import { Home } from 'lucide-react';
import SmartLighting from './features/SmartLighting';
import ClimateControl from './features/ClimateControl';
import SecuritySystem from './features/SecuritySystem';
import EnergyManagement from './features/EnergyManagement';
import FireSafety from './features/FireSafety';
import PlantCare from './features/PlantCare';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-center sm:justify-start mb-2">
          <Home className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">ESP32 Smart Home</h1>
        </div>
        <p className="text-center sm:text-left text-gray-600 max-w-2xl">
          Monitor and control your connected smart home devices
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SmartLighting />
        <ClimateControl />
        <SecuritySystem />
        <EnergyManagement />
        <FireSafety />
        <PlantCare />
      </div>
    </div>
  );
};

export default Dashboard;
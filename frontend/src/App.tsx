import React from 'react';
import Dashboard from './components/Dashboard';
import { SmartHomeProvider } from './context/SmartHomeContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <SmartHomeProvider>
        <Dashboard />
      </SmartHomeProvider>
    </div>
  );
}

export default App;
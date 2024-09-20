// src/App.tsx
import React from 'react';
import { TemperatureProvider } from './components/TemperatureContext';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <TemperatureProvider>
      <Dashboard />
    </TemperatureProvider>
  );
};

export default App;

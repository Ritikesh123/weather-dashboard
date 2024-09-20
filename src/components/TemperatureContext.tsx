// src/components/TemperatureContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the context type
interface TemperatureContextType {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

// Create the context with default values
export const TemperatureContext = createContext<TemperatureContextType>({
  unit: 'C', // Default is Celsius
  toggleUnit: () => {},
});

// Create the provider component
export const TemperatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

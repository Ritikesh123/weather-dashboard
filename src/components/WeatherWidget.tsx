import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface WeatherWidgetProps {
  id: string;
  onRemove: () => void;
}

// Define the shape of the weather data including unit
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  unit: 'C' | 'F'; // Add unit to the interface
}

// Random color generator
const getRandomColor = () => {
  const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFF9C4'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ id, onRemove }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Load weather data from localStorage on mount
  useEffect(() => {
    const savedWeather = localStorage.getItem(id);
    if (savedWeather) {
      setWeather(JSON.parse(savedWeather));
    } else {
      const locations = ['New York', 'California', 'Moscow', 'Singapore', 'Italy', 'Germany'];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];

      const conditions = ['Sunny', 'Rainy', 'Snowy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

      // Initialize weather data with type 'C' for unit
      const initialWeather: WeatherData = {
        location: randomLocation,
        temperature: Math.floor(Math.random() * 35), // Random temperature (Celsius)
        condition: randomCondition,
        unit: 'C', // Set unit explicitly as 'C'
      };

      setWeather(initialWeather);
    }
  }, [id]);

  // Save weather data to localStorage whenever it changes
  useEffect(() => {
    if (weather) {
      localStorage.setItem(id, JSON.stringify(weather));
    }
  }, [weather, id]);

  if (!weather) {
    return null; // Wait for weather data to be initialized
  }

  // Convert temperature to Fahrenheit if needed
  const displayTemperature = weather.unit === 'F' 
    ? (weather.temperature * 9 / 5 + 32).toFixed(1) // Convert Celsius to Fahrenheit
    : weather.temperature;

  // Get weather icon based on the condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <WbSunnyIcon />;
      case 'Rainy':
        return <UmbrellaIcon />;
      case 'Snowy':
        return <AcUnitIcon />;
      default:
        return null;
    }
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setWeather((prevWeather) => prevWeather ? { ...prevWeather, unit: prevWeather.unit === 'C' ? 'F' : 'C' } : null);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        backgroundColor: getRandomColor(), // Set a random background color
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5">{weather.location}</Typography>
        <Typography variant="h6">
          {displayTemperature} °{weather.unit}
        </Typography>
        <Typography>
          {weather.condition} {getWeatherIcon(weather.condition)}
        </Typography>
      </CardContent>

      <Button 
        variant="outlined" 
        onClick={toggleUnit} 
        sx={{ marginBottom: 2, alignSelf: 'center' }}
      >
        Switch to {weather.unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Button>

      <IconButton onClick={onRemove} aria-label="delete" sx={{ alignSelf: 'flex-end' }}>
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default WeatherWidget;

// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import WeatherWidget from './WeatherWidget';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    const savedWidgets = localStorage.getItem('widgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('widgets', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = () => {
    setWidgets([...widgets, `widget-${widgets.length}`]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget !== id));
    localStorage.removeItem(id); // Remove from localStorage as well
  };

  return (
    <Box 
      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
        <Typography
            variant="h4"
            gutterBottom
            sx={{fontWeight: 'bold', backgroundColor: '#ffad9c', color: 'black', padding: 2, borderRadius: 1, textAlign: 'center', width: '100%',}}
        >
            Weather Dashboard
        </Typography>

      <Button variant="contained" onClick={addWidget} sx={{ marginBottom: 2 }}>
        Add Widget
      </Button>

      <Grid 
        container 
        spacing={2} 
        sx={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: 1200 
        }}
      >
        {widgets.map(id => (
          <Grid item key={id}>
            <WeatherWidget id={id} onRemove={() => removeWidget(id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;

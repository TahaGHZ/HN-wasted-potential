import React, { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import LandingPage from './components/LandingPage';
import TrafficMap from './components/TrafficMap';
import './App.css';

// Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <APIProvider 
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={['visualization', 'geometry', 'places']}
    >
      <TrafficMap />
    </APIProvider>
  );
}

export default App;


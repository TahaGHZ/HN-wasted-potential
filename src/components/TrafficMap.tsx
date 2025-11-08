import React, { useState } from 'react';
import { Map } from '@vis.gl/react-google-maps';
import HeatmapLayer from './HeatmapLayer';
import RoutePlanner from './RoutePlanner';
import NotificationAlerts from './NotificationAlerts';
import Sidebar from './Sidebar';
import './TrafficMap.css';

// Default center: Berlin, Germany
const DEFAULT_CENTER = { lat: 52.52, lng: 13.405 };
const DEFAULT_ZOOM = 6;

const TrafficMap: React.FC = () => {
  const [mapId] = useState('DEMO_MAP_ID');
  const [activeFeature, setActiveFeature] = useState<'heatmap' | 'routes' | 'alerts'>('heatmap');

  return (
    <div className="traffic-map-container">
      <Sidebar 
        activeFeature={activeFeature}
        onFeatureChange={setActiveFeature}
      />
      <div className="map-wrapper">
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId={mapId}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {activeFeature === 'heatmap' && <HeatmapLayer />}
          {activeFeature === 'routes' && <RoutePlanner />}
          {activeFeature === 'alerts' && <NotificationAlerts />}
        </Map>
      </div>
    </div>
  );
};

export default TrafficMap;


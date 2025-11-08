import React, { useEffect, useMemo } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

// Placeholder data for Germany - major cities with traffic intensity
const GERMANY_TRAFFIC_DATA = [
  // Berlin area
  { lat: 52.52, lng: 13.405, weight: 0.9 },
  { lat: 52.51, lng: 13.40, weight: 0.85 },
  { lat: 52.53, lng: 13.41, weight: 0.8 },
  { lat: 52.50, lng: 13.39, weight: 0.75 },
  
  // Munich area
  { lat: 48.1351, lng: 11.5820, weight: 0.95 },
  { lat: 48.14, lng: 11.58, weight: 0.9 },
  { lat: 48.13, lng: 11.59, weight: 0.85 },
  
  // Hamburg area
  { lat: 53.5511, lng: 9.9937, weight: 0.88 },
  { lat: 53.55, lng: 9.99, weight: 0.82 },
  { lat: 53.56, lng: 10.00, weight: 0.78 },
  
  // Frankfurt area
  { lat: 50.1109, lng: 8.6821, weight: 0.92 },
  { lat: 50.11, lng: 8.68, weight: 0.87 },
  { lat: 50.12, lng: 8.69, weight: 0.83 },
  
  // Cologne area
  { lat: 50.9375, lng: 6.9603, weight: 0.86 },
  { lat: 50.94, lng: 6.96, weight: 0.81 },
  
  // Stuttgart area
  { lat: 48.7758, lng: 9.1829, weight: 0.84 },
  { lat: 48.78, lng: 9.18, weight: 0.79 },
  
  // Düsseldorf area
  { lat: 51.2277, lng: 6.7735, weight: 0.83 },
  { lat: 51.23, lng: 6.77, weight: 0.78 },
  
  // Dortmund area
  { lat: 51.5136, lng: 7.4653, weight: 0.8 },
  { lat: 51.51, lng: 7.47, weight: 0.75 },
  
  // Essen area
  { lat: 51.4556, lng: 7.0116, weight: 0.79 },
  
  // Leipzig area
  { lat: 51.3397, lng: 12.3731, weight: 0.77 },
  
  // Dresden area
  { lat: 51.0504, lng: 13.7373, weight: 0.76 },
  
  // Nuremberg area
  { lat: 49.4521, lng: 11.0767, weight: 0.75 },
  
  // Hanover area
  { lat: 52.3759, lng: 9.7320, weight: 0.74 },
  
  // Major highways (A1, A2, A3, A4, A5, A7, A8, A9)
  // A1 (Hamburg to Cologne)
  { lat: 53.55, lng: 9.99, weight: 0.7 },
  { lat: 52.37, lng: 9.73, weight: 0.68 },
  { lat: 51.51, lng: 7.47, weight: 0.72 },
  
  // A2 (Berlin to Dortmund)
  { lat: 52.52, lng: 13.405, weight: 0.65 },
  { lat: 51.51, lng: 7.47, weight: 0.7 },
  
  // A3 (Frankfurt to Cologne)
  { lat: 50.11, lng: 8.68, weight: 0.75 },
  { lat: 50.94, lng: 6.96, weight: 0.73 },
  
  // A5 (Frankfurt to Basel)
  { lat: 50.11, lng: 8.68, weight: 0.74 },
  { lat: 48.78, lng: 9.18, weight: 0.71 },
  
  // A7 (Hamburg to Munich)
  { lat: 53.55, lng: 9.99, weight: 0.69 },
  { lat: 48.14, lng: 11.58, weight: 0.76 },
  
  // A8 (Munich to Stuttgart)
  { lat: 48.14, lng: 11.58, weight: 0.77 },
  { lat: 48.78, lng: 9.18, weight: 0.72 },
  
  // A9 (Berlin to Munich)
  { lat: 52.52, lng: 13.405, weight: 0.66 },
  { lat: 48.14, lng: 11.58, weight: 0.75 },
];

const HeatmapLayer: React.FC = () => {
  const map = useMap();
  const visualizationLibrary = useMapsLibrary('visualization');

  const heatmapData = useMemo(() => {
    if (!visualizationLibrary) return null;
    
    return GERMANY_TRAFFIC_DATA.map(point => ({
      location: new google.maps.LatLng(point.lat, point.lng),
      weight: point.weight,
    }));
  }, [visualizationLibrary]);

  useEffect(() => {
    if (!map || !visualizationLibrary || !heatmapData) return;

    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      radius: 30,
      opacity: 0.6,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)',
      ],
    });

    return () => {
      heatmap.setMap(null);
    };
  }, [map, visualizationLibrary, heatmapData]);

  return null;
};

export default HeatmapLayer;


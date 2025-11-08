import React, { useState, useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import RouteForm from './RouteForm';
import './RoutePlanner.css';

interface RouteResult {
  duration: string;
  distance: string;
  delay: number; // in km/h
  estimatedArrival: string;
}

const RoutePlanner: React.FC = () => {
  const map = useMap();
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [departureTime, setDepartureTime] = useState<Date>(new Date());
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  // Initialize directions renderer
  useEffect(() => {
    if (!map) return;

    const renderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
    });
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [map]);

  // Calculate route when origin, destination, or departure time changes
  useEffect(() => {
    if (!directionsRenderer || !origin || !destination) {
      setRouteResult(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: departureTime,
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          
          // Calculate route details with placeholder delay
          const route = result.routes[0];
          const leg = route.legs[0];
          
          // Placeholder: Random delay between -10 and -2 km/h
          const delay = -(Math.random() * 8 + 2);
          
          // Calculate estimated arrival
          const durationInMs = leg.duration?.value ? leg.duration.value * 1000 : 0;
          const estimatedArrival = new Date(departureTime.getTime() + durationInMs);
          
          setRouteResult({
            duration: leg.duration?.text || 'N/A',
            distance: leg.distance?.text || 'N/A',
            delay: delay,
            estimatedArrival: estimatedArrival.toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          });
        } else {
          console.error('Directions request failed:', status);
          setRouteResult(null);
        }
      }
    );
  }, [origin, destination, departureTime, directionsRenderer]);

  const handleRouteSubmit = (
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
    time: Date
  ) => {
    setOrigin({ lat: originLat, lng: originLng });
    setDestination({ lat: destLat, lng: destLng });
    setDepartureTime(time);
  };

  return (
    <>
      <RouteForm onSubmit={handleRouteSubmit} routeResult={routeResult} />
      {origin && (
        <AdvancedMarker
          position={origin}
          title="Origin"
        />
      )}
      {destination && (
        <AdvancedMarker
          position={destination}
          title="Destination"
        />
      )}
    </>
  );
};

export default RoutePlanner;


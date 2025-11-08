import React, { useState } from 'react';
import './RouteForm.css';

// Major German cities for autocomplete
const GERMAN_CITIES = [
  { name: 'Berlin', lat: 52.52, lng: 13.405 },
  { name: 'Munich', lat: 48.1351, lng: 11.5820 },
  { name: 'Hamburg', lat: 53.5511, lng: 9.9937 },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  { name: 'Cologne', lat: 50.9375, lng: 6.9603 },
  { name: 'Stuttgart', lat: 48.7758, lng: 9.1829 },
  { name: 'Düsseldorf', lat: 51.2277, lng: 6.7735 },
  { name: 'Dortmund', lat: 51.5136, lng: 7.4653 },
  { name: 'Essen', lat: 51.4556, lng: 7.0116 },
  { name: 'Leipzig', lat: 51.3397, lng: 12.3731 },
  { name: 'Dresden', lat: 51.0504, lng: 13.7373 },
  { name: 'Nuremberg', lat: 49.4521, lng: 11.0767 },
  { name: 'Hanover', lat: 52.3759, lng: 9.7320 },
  { name: 'Bremen', lat: 53.0793, lng: 8.8017 },
  { name: 'Duisburg', lat: 51.4344, lng: 6.7623 },
];

interface RouteResult {
  duration: string;
  distance: string;
  delay: number;
  estimatedArrival: string;
}

interface RouteFormProps {
  onSubmit: (
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
    time: Date
  ) => void;
  routeResult: RouteResult | null;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, routeResult }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [originSuggestions, setOriginSuggestions] = useState<typeof GERMAN_CITIES>([]);
  const [destSuggestions, setDestSuggestions] = useState<typeof GERMAN_CITIES>([]);

  const filterCities = (query: string) => {
    if (!query) return [];
    return GERMAN_CITIES.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrigin(value);
    setOriginSuggestions(filterCities(value));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    setDestSuggestions(filterCities(value));
  };

  const selectCity = (
    city: typeof GERMAN_CITIES[0],
    type: 'origin' | 'destination'
  ) => {
    if (type === 'origin') {
      setOrigin(city.name);
      setOriginSuggestions([]);
    } else {
      setDestination(city.name);
      setDestSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const originCity = GERMAN_CITIES.find(
      c => c.name.toLowerCase() === origin.toLowerCase()
    );
    const destCity = GERMAN_CITIES.find(
      c => c.name.toLowerCase() === destination.toLowerCase()
    );

    if (originCity && destCity) {
      onSubmit(
        originCity.lat,
        originCity.lng,
        destCity.lat,
        destCity.lng,
        new Date(departureDate)
      );
    } else {
      alert('Please select valid German cities');
    }
  };

  return (
    <div className="route-form-container">
      <form className="route-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Plan Your Route</h3>
        
        <div className="form-group">
          <label htmlFor="origin">Departure Location</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={handleOriginChange}
              placeholder="e.g., Berlin"
              className="form-input"
              required
            />
            {originSuggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {originSuggestions.map((city) => (
                  <div
                    key={city.name}
                    className="suggestion-item"
                    onClick={() => selectCity(city, 'origin')}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="destination">Arrival Location</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="e.g., Munich"
              className="form-input"
              required
            />
            {destSuggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {destSuggestions.map((city) => (
                  <div
                    key={city.name}
                    className="suggestion-item"
                    onClick={() => selectCity(city, 'destination')}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="departure">Departure Date & Time</label>
          <input
            type="datetime-local"
            id="departure"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Calculate Route
        </button>
      </form>

      {routeResult && (
        <div className="route-result">
          <h4 className="result-title">Route Information</h4>
          <div className="result-item">
            <span className="result-label">Distance:</span>
            <span className="result-value">{routeResult.distance}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Duration:</span>
            <span className="result-value">{routeResult.duration}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Estimated Arrival:</span>
            <span className="result-value">{routeResult.estimatedArrival}</span>
          </div>
          <div className="result-item delay">
            <span className="result-label">Average Speed Delay:</span>
            <span className={`result-value ${routeResult.delay < 0 ? 'negative' : 'positive'}`}>
              {routeResult.delay.toFixed(1)} km/h
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteForm;


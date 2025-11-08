import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useMap } from '@vis.gl/react-google-maps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import './NotificationAlerts.css';

interface AlertZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number; // in meters
  reason: string;
  severity: 'low' | 'medium' | 'high';
  active: boolean;
}

// Placeholder alert zones for Germany
const ALERT_ZONES: AlertZone[] = [
  {
    id: '1',
    name: 'Berlin City Center',
    center: { lat: 52.52, lng: 13.405 },
    radius: 5000,
    reason: 'Heavy traffic due to construction on A100',
    severity: 'high',
    active: true,
  },
  {
    id: '2',
    name: 'Munich Ring Road',
    center: { lat: 48.1351, lng: 11.5820 },
    radius: 4000,
    reason: 'Accident on A99 causing delays',
    severity: 'medium',
    active: true,
  },
  {
    id: '3',
    name: 'Hamburg Port Area',
    center: { lat: 53.5511, lng: 9.9937 },
    radius: 3000,
    reason: 'Rush hour congestion expected',
    severity: 'medium',
    active: true,
  },
  {
    id: '4',
    name: 'Frankfurt Airport',
    center: { lat: 50.1109, lng: 8.6821 },
    radius: 6000,
    reason: 'High traffic volume - avoid if possible',
    severity: 'high',
    active: true,
  },
  {
    id: '5',
    name: 'Cologne City',
    center: { lat: 50.9375, lng: 6.9603 },
    radius: 3500,
    reason: 'Event traffic - expect delays',
    severity: 'low',
    active: true,
  },
  {
    id: '6',
    name: 'Stuttgart City Center',
    center: { lat: 48.7758, lng: 9.1829 },
    radius: 4000,
    reason: 'Road closure on main artery',
    severity: 'high',
    active: true,
  },
];

const NotificationAlerts: React.FC = () => {
  const map = useMap();
  const [alerts, setAlerts] = useState<AlertZone[]>(ALERT_ZONES);
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);

  // Create circles for alert zones
  useEffect(() => {
    if (!map) return;

    const newCircles = alerts
      .filter(alert => alert.active)
      .map(alert => {
        const circle = new google.maps.Circle({
          strokeColor: getSeverityColor(alert.severity),
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: getSeverityColor(alert.severity),
          fillOpacity: 0.15,
          map: map,
          center: new google.maps.LatLng(alert.center.lat, alert.center.lng),
          radius: alert.radius,
        });

        // Add click listener to show alert info
        circle.addListener('click', () => {
          showAlertInfo(alert);
        });

        return circle;
      });

    setCircles(newCircles);

    return () => {
      newCircles.forEach(circle => {
        google.maps.event.clearInstanceListeners(circle);
        circle.setMap(null);
      });
    };
  }, [map, alerts]);

  const getSeverityColor = (severity: 'low' | 'medium' | 'high'): string => {
    switch (severity) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffa94d';
      case 'low':
        return '#ffd43b';
      default:
        return '#ffd43b';
    }
  };

  const showAlertInfo = (alertZone: AlertZone) => {
    const message = `${alertZone.name}\n\n${alertZone.reason}\n\nSeverity: ${alertZone.severity.toUpperCase()}`;
    window.alert(message);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, active: false } : alert
    ));
  };

  return (
    <div className="notification-alerts-container">
      <div className="alerts-panel">
        <h3 className="alerts-title">Active Alerts</h3>
        <div className="alerts-list">
          {alerts
            .filter(alert => alert.active)
            .map(alert => (
              <div
                key={alert.id}
                className={`alert-item ${alert.severity}`}
                onClick={() => {
                  if (map) {
                    map.setCenter(new google.maps.LatLng(alert.center.lat, alert.center.lng));
                    map.setZoom(12);
                  }
                }}
              >
                <div className="alert-header">
                  <span className="alert-severity-badge">{alert.severity.toUpperCase()}</span>
                  <button
                    className="dismiss-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissAlert(alert.id);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="alert-name">{alert.name}</div>
                <div className="alert-reason">{alert.reason}</div>
              </div>
            ))}
        </div>
        {alerts.filter(alert => alert.active).length === 0 && (
          <div className="no-alerts">No active alerts</div>
        )}
      </div>

      {alerts
        .filter(alert => alert.active)
        .map(alert => (
          <AdvancedMarker
            key={alert.id}
            position={alert.center}
            title={alert.name}
          />
        ))}
    </div>
  );
};

export default NotificationAlerts;


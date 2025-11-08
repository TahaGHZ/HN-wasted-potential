import React from 'react';
import { FaFire, FaMapMarkedAlt, FaBell } from 'react-icons/fa';
import './Sidebar.css';
const wastedPotentialLogo = '/assets/Wasted-Potential-Logo.png';

interface SidebarProps {
  activeFeature: 'heatmap' | 'routes' | 'alerts';
  onFeatureChange: (feature: 'heatmap' | 'routes' | 'alerts') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeFeature, onFeatureChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img 
          src={wastedPotentialLogo} 
          alt="Wasted Potential" 
          className="sidebar-logo"
        />
        <h2 className="sidebar-title">Traffic Prediction</h2>
        <p className="sidebar-subtitle">Germany</p>
      </div>
      
      <nav className="sidebar-nav">
        <button
          className={`nav-button ${activeFeature === 'heatmap' ? 'active' : ''}`}
          onClick={() => onFeatureChange('heatmap')}
        >
          <span className="nav-icon"><FaFire /></span>
          <span className="nav-text">Heatmap Zones</span>
        </button>
        
        <button
          className={`nav-button ${activeFeature === 'routes' ? 'active' : ''}`}
          onClick={() => onFeatureChange('routes')}
        >
          <span className="nav-icon"><FaMapMarkedAlt /></span>
          <span className="nav-text">Route Planner</span>
        </button>
        
        <button
          className={`nav-button ${activeFeature === 'alerts' ? 'active' : ''}`}
          onClick={() => onFeatureChange('alerts')}
        >
          <span className="nav-icon"><FaBell /></span>
          <span className="nav-text">Alerts</span>
        </button>
      </nav>
      
      <div className="sidebar-footer">
        <p className="footer-text">Built by Wasted Potential</p>
        <p className="footer-text">Hack-Nation 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;


import React from 'react';
import { FaFire, FaMapMarkedAlt, FaBell } from 'react-icons/fa';
import './LandingPage.css';
const wastedPotentialLogo = '/assets/Wasted-Potential-Logo.png';
const hackNationLogo = '/assets/Hack-Nation-Logo.png';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logos">
          <img 
            src={wastedPotentialLogo} 
            alt="Wasted Potential Logo" 
            className="logo wasted-potential-logo"
          />
          <img 
            src={hackNationLogo} 
            alt="Hack-Nation Logo" 
            className="logo hack-nation-logo"
          />
        </div>
        
        <h1 className="landing-title">Traffic Prediction</h1>
        <h2 className="landing-subtitle">Real-time Congestion Analysis for Germany</h2>
        
        <div className="landing-description">
          <p>
            Navigate Germany's roads with confidence. Our AI-powered traffic prediction 
            system provides real-time congestion analysis, route optimization, and 
            intelligent alerts to help you avoid delays.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon"><FaFire /></span>
              <span>Heatmap Zones - Visualize traffic density across Germany</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"><FaMapMarkedAlt /></span>
              <span>Smart Routes - Get estimated arrival times with delay predictions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon"><FaBell /></span>
              <span>Real-time Alerts - Avoid congested zones before you reach them</span>
            </div>
          </div>
        </div>
        
        <button className="enter-button" onClick={onEnter}>
          Enter App
        </button>
        
        <p className="team-credit">
          Built by <strong>Wasted Potential</strong> at <strong>Hack-Nation</strong>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;


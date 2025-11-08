# Traffic Prediction App - Wasted Potential

A real-time traffic congestion prediction app for Germany, built for Hack-Nation hackathon.

## Features

- 🔥 **Heatmap Zones** - Visualize traffic density across Germany with interactive heatmaps
- 🗺️ **Smart Routes** - Get estimated arrival times with delay predictions based on departure time
- 🔔 **Real-time Alerts** - Receive notifications about congested zones to avoid delays

## Tech Stack

- React 18 with TypeScript
- [@vis.gl/react-google-maps](https://github.com/visgl/react-google-maps) - React components for Google Maps
- Google Maps JavaScript API

## Setup

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Set up Google Maps API Key:**
   - Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the following APIs:
     - Maps JavaScript API
     - Directions API
     - Geocoding API
   - Create a `.env` file in the root directory:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

3. **Run the development server:**
   ```powershell
   npm start
   ```

4. **Build for production:**
   ```powershell
   npm run build
   ```

## Project Structure

```
HN-wasted-potential/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx       # Landing page with project description
│   │   ├── TrafficMap.tsx        # Main map component
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── HeatmapLayer.tsx      # Heatmap visualization
│   │   ├── RoutePlanner.tsx      # Route planning with directions
│   │   ├── RouteForm.tsx         # Form for departure/arrival input
│   │   └── NotificationAlerts.tsx # Alert zones and notifications
│   ├── App.tsx                   # Main app component
│   ├── index.tsx                 # Entry point
│   └── index.css                 # Global styles
├── package.json
└── README.md
```

## Usage

### Heatmap Zones
- Click on "Heatmap Zones" in the sidebar
- View traffic density visualization across Germany
- Red zones indicate high congestion, blue zones indicate lower traffic

### Route Planner
- Click on "Route Planner" in the sidebar
- Enter departure and arrival locations (German cities)
- Select departure date and time
- View estimated arrival time and average speed delay

### Alerts
- Click on "Alerts" in the sidebar
- View active traffic alerts for different zones in Germany
- Click on alert zones on the map to see details
- Dismiss alerts by clicking the × button

## Placeholder Data

Currently, the app uses placeholder data for:
- Traffic heatmap points (major German cities and highways)
- Route delays (randomized between -10 and -2 km/h)
- Alert zones (predefined zones in major German cities)

## Team

**Wasted Potential** - Built for **Hack-Nation** 2025

## License

MIT

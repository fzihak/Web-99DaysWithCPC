import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Sample data for corruption incidents
const corruptionIncidents = [
  { location: [90.4125, 23.8103], intensity: 75 }, // Dhaka
  { location: [91.8313, 22.3569], intensity: 45 }, // Chittagong
  { location: [89.2332, 23.1685], intensity: 30 }, // Khulna
  { location: [88.6033, 24.3636], intensity: 25 }, // Rajshahi
  { location: [91.1711, 23.4607], intensity: 35 }, // Comilla
];

const CorruptionHeatmap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapToken, setMapToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [90.4125, 23.8103], // Center on Bangladesh
      zoom: 6
    });

    mapInstance.on('load', () => {
      // Add heatmap layer
      mapInstance.addSource('corruption-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: corruptionIncidents.map(incident => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: incident.location
            },
            properties: {
              intensity: incident.intensity
            }
          }))
        }
      });

      mapInstance.addLayer({
        id: 'corruption-heat',
        type: 'heatmap',
        source: 'corruption-data',
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            100, 1
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            9, 20
          ],
          'heatmap-opacity': 0.8
        }
      });
    });

    // Cleanup function
    return () => {
      mapInstance.remove();
    };
  }, [mapToken]); // Only re-run if mapToken changes

  return (
    <div className="space-y-4">
      {!mapToken && (
        <div className="p-4 bg-muted rounded-lg">
          <input
            type="text"
            placeholder="Enter your Mapbox public token"
            className="w-full p-2 border rounded"
            onChange={(e) => setMapToken(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Get your public token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mapbox</a>
          </p>
        </div>
      )}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
    </div>
  );
};

export default CorruptionHeatmap;
import React, { useEffect, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

const NewRouteMap = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const points = [
        [-73.9876, 40.7661], // Driver location
        [-73.9808, 40.7639], // Pickup location
        [-73.9754, 40.7685], // Drop location
      ];

      const locations = points.map(point => `${point[0]},${point[1]}`).join(';');

      try {
        const response = await fetch(
          `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${locations}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            qs: {
              access_token: 'YOUR_MAPBOX_ACCESS_TOKEN',
              annotations: 'duration,distance',
              sources: '0',
            },
          }
        );

        const data = await response.json();
        if (data && data.distances && data.durations) {
          setRouteCoordinates(points.map((point, index) => [point[0], point[1], data.distances[index]]));
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <MapboxGL.MapView style={{ flex: 1 }}>
      {/* Render route on the map */}
      <MapboxGL.ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: routeCoordinates }}>
        <MapboxGL.LineLayer id="routeLayer" style={{ lineColor: '#FF0000', lineWidth: 3 }} />
      </MapboxGL.ShapeSource>

      {/* Render markers for each point */}
      {routeCoordinates.map((coordinate, index) => (
        <MapboxGL.PointAnnotation key={index} id={`point-${index}`} coordinate={coordinate} />
      ))}
    </MapboxGL.MapView>
  );
};

export default NewRouteMap;

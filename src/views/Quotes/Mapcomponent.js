import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Haversine formula for distance calculation
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Destination selector on the map
function DestinationSelector({ setDestination }) {
  useMapEvents({
    click(e) {
      setDestination(e.latlng); // Set destination on map click
    }
  });
  return null;
}

export default function MapDistanceCalculator() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  // Fetch the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  // Calculate the distance
  const calculateDistance = () => {
    if (currentLocation && destination) {
      const dist = haversineDistance(currentLocation.lat, currentLocation.lng, destination.lat, destination.lng);
      setDistance(dist);
    }
  };

  return (
    <div>
      <h1>Map Distance Calculator</h1>
      <div style={{ height: '500px', width: '100%' }}>
        {currentLocation ? (
          <MapContainer center={currentLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <Marker position={currentLocation} />
            <DestinationSelector setDestination={setDestination} />
            {destination && <Marker position={destination} />}
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
      <button onClick={calculateDistance} disabled={!currentLocation || !destination} style={{ marginTop: '10px' }}>
        Calculate Distance
      </button>
      {distance !== null && <p>Distance: {distance.toFixed(2)} km</p>}
    </div>
  );
}

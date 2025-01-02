import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { getApi } from 'views/services/api';
const containerStyle = {
  width: '100%',
  height: '500px'
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapWithDistanceCalculator = (from, to) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCM_6HTgb78RYXf_IjBpJsdTJLBcZrJoUo'
  });
  console.log('from or from ', from);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const fetchQuotesData = async () => {
    try {
      const response = await getApi(`/getlatlen/${from}/${to}`);
      console.log('APIo Response: ', response);
      setLatitude(response.data.data);

      console.log('latitude are ', latitude);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchQuotesData();
  }, []);

  const handleMapClick = (e) => {
    setDestination(e.latLng);
  };

  const calculateDistance = () => {
    if (currentLocation && destination) {
      const dist = haversineDistance(currentLocation.lat, currentLocation.lng, destination.lat(), destination.lng());
      setDistance(dist);
    }
  };

  const handleDirectionsCallback = (response) => {
    if (response?.status === 'OK') {
      setDirectionsResponse(response);
    } else {
      console.error('Directions request failed:', response);
    }
  };

  if (!isLoaded || loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Map with Distance Calculator</h1>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={calculateDistance} disabled={!currentLocation || !destination}>
          Calculate Distance
        </button>
        {distance !== null && <p>Distance: {distance.toFixed(2)} km</p>}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={12} onClick={handleMapClick}>
        {/* Start Point Marker */}
        {currentLocation && <Marker position={currentLocation} label="Start" />}

        {/* End Point Marker */}
        {destination && <Marker position={destination} label="End" />}

        {/* Directions Service to render route */}
        {currentLocation && destination && (
          <DirectionsService
            options={{
              origin: currentLocation,
              destination: destination,
              travelMode: 'DRIVING'
            }}
            callback={handleDirectionsCallback}
          />
        )}

        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapWithDistanceCalculator;

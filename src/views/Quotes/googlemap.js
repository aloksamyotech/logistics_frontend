import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { getApi } from 'views/services/api';
import { t } from 'i18next';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const MapWithDistanceCalculator = (props) => {
  const { from, to } = props;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCM_6HTgb78RYXf_IjBpJsdTJLBcZrJoUo',
    libraries: ['geometry']
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routePolyline, setRoutePolyline] = useState(null);

  const fetchCoordinates = async () => {
    try {
      const response = await getApi(`/getlatlen/${from}/${to}`);
      const data = response?.data?.data;

      if (data) {
        setCurrentLocation({
          lat: data?.fromLatitude,
          lng: data?.fromLongitude
        });

        setDestination({
          lat: data?.toLatitude,
          lng: data?.toLongitude
        });
      } else {
        console.error('No data found for the given locations.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const fetchDirections = async () => {
    if (!currentLocation || !destination) return;

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${currentLocation.lng},${currentLocation.lat};${destination.lng},${destination.lat}?steps=true&geometries=polyline&overview=full`;

    try {
      const response = await fetch(osrmUrl);
      const data = await response.json();

      if (data?.routes?.length > 0) {
        const polyline = data.routes[0]?.geometry;
        setRoutePolyline(polyline);

        const routeDistance = data.routes[0]?.legs[0]?.distance / 1000;
        setDistance(routeDistance);
      } else {
        console.error('No route found.');
      }
    } catch (error) {
      console.error('Error fetching route from OSRM:', error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [from, to]);

  useEffect(() => {
    if (currentLocation && destination) {
      fetchDirections();
    }
  }, [currentLocation, destination]);

  if (!isLoaded) return <div>{t('Loading...')}</div>;

  return (
    <div>
      <h1>{t('Map with Distance Calculator')}</h1>
      <div style={{ marginBottom: '10px' }}>
        {distance !== null && (
          <p>
            {t('Distance:')} {distance?.toFixed(2)} km
          </p>
        )}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={currentLocation || { lat: 0, lng: 0 }} zoom={12}>
        {currentLocation && <Marker position={currentLocation} label="Start" />}
        {destination && <Marker position={destination} label="End" />}
        {routePolyline && (
          <Polyline
            path={google.maps.geometry.encoding.decodePath(routePolyline)}
            options={{
              strokeColor: 'red',
              strokeOpacity: 1.0,
              strokeWeight: 5
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapWithDistanceCalculator;

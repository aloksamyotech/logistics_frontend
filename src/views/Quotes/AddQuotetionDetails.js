import React, { useState } from 'react';
import axios from 'axios';

const AddQuotationDetails = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState('');

  const calculateDistance = async () => {
    try {
      setError(''); // Clear previous errors
      setDistance(null);

      if (!from || !to) {
        setError("Please enter both 'From' and 'To' locations.");
        return;
      }

      const response = await axios.post('http://localhost:5000/calculate-distance', { from, to });
      const { distanceInKilometers, distanceInMiles } = response.data;

      setDistance({
        km: distanceInKilometers.toFixed(2),
        miles: distanceInMiles.toFixed(2)
      });
    } catch (error) {
      console.error('Error calculating distance:', error.message);
      setError('Failed to calculate distance. Please try again.');
    }
  };

  return (
    <div>
      <h1>Calculate Distance</h1>
      <div>
        <input type="text" placeholder="From Location" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To Location" value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={calculateDistance}>Calculate Distance</button>
      </div>

      {distance && (
        <div>
          <p>
            Distance: {distance.km} km ({distance.miles} miles)
          </p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddQuotationDetails;

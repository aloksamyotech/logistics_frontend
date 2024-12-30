import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditShipmentDialog = ({ open, onClose, shipmentData, onUpdate }) => {
  const [formData, setFormData] = useState({ ...shipmentData });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchSenderReceiverNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/customer');

        setCustomers(response.data.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to load customer data');
      }
    };

    fetchSenderReceiverNames();

    if (shipmentData) {
      setFormData({ ...shipmentData });
    }
  }, [shipmentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/shipment/update_shipment/${shipmentData._id}`, formData);
      if (response.status === 200) {
        toast.success('Shipment updated successfully');
        onUpdate(formData);
        onClose();
      }
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast.error('Error updating shipment');
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Shipment</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            name="shipmentdate"
            label="Shipment Date"
            type="date"
            fullWidth
            value={formatDate(formData.shipmentdate)}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="expecteddate"
            label="Expected Delivery Date"
            type="date"
            fullWidth
            value={formatDate(formData.expecteddate)}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </Box>

        <Box mb={2}>
          <TextField
            select
            name="senderId"
            label="Sender Name"
            fullWidth
            value={formData.senderId || ''}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          >
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No customers available</MenuItem>
            )}
          </TextField>
        </Box>

        {/* Receiver Name Select */}
        <Box mb={2}>
          <TextField
            select
            name="receiverId"
            label="Receiver Name"
            fullWidth
            value={formData.receiverId || ''}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          >
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No customers available</MenuItem>
            )}
          </TextField>
        </Box>

        {/* Other fields */}
        <Box mb={2}>
          <TextField
            name="deliveryAddress"
            label="Delivery Address"
            fullWidth
            value={formData.deliveryAddress || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="contactPersonName"
            label="Contact Person Name"
            fullWidth
            value={formData.contactPersonName || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="contactPersonNumber"
            label="Contact Person Number"
            fullWidth
            value={formData.contactPersonNumber || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="fullLoad"
            label="Full Load"
            fullWidth
            value={formData.fullLoad || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="package_pickup_address"
            label="Package Pickup Address"
            fullWidth
            value={formData.package_pickup_address || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="transport_driver_vehicledetails"
            label="Transport Driver Vehicle Details"
            fullWidth
            value={formData.transport_driver_vehicledetails || ''}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditShipmentDialog;

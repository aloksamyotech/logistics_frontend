import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { t } from 'i18next';
import { postApi } from 'views/services/api';
import MapWithDistanceCalculator from './googlemap.js'; // Import the MapWithDistanceCalculator component

const AddQuotationDetails = (props) => {
  const { open, handleClose, setMoreDetails } = props;
  const [formValues, setFormValues] = useState({
    from: '',
    to: '',
    description: '',
    size: '',
    weight: '',
    ETA: '',
    rate: '',
    advance: '',
    distance: null // Add distance to form state
  });
  const [km, setKm] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false); // State to control map visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear specific field error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.from) newErrors.from = t('From Location is Required');
    if (!formValues.to) newErrors.to = t('To Location is Required');
    if (!formValues.description) newErrors.description = t('Description is Required');
    if (!formValues.size) newErrors.size = t('Size is Required');
    if (!formValues.weight) newErrors.weight = t('Weight is Required');
    if (!formValues.ETA) newErrors.ETA = t('ETA is Required');
    if (!formValues.rate) newErrors.rate = t('Rate is Required');
    if (!formValues.advance) newErrors.advance = t('Advance is Required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDistance = async (from, to) => {
    try {
      if (!from || !to) {
        setKm(null); // Reset distance if inputs are invalid
        setFormValues((prev) => ({ ...prev, distance: null }));
        return;
      }

      setError(''); // Clear previous errors

      const response = await postApi('/calculate-distance', { from, to });

      const { distanceInKilometers, distanceInMiles } = response.data;

      setKm(distanceInKilometers);

      // Store distance in form state
      setFormValues((prev) => ({
        ...prev,
        distance: {
          km: distanceInKilometers.toFixed(2),
          miles: distanceInMiles.toFixed(2)
        }
      }));
    } catch (error) {
      console.log(error);
      setKm(null); // Reset distance on error
      setFormValues((prev) => ({ ...prev, distance: null })); // Reset distance in form state
    }
  };

  useEffect(() => {
    calculateDistance(formValues.from, formValues.to);
  }, [formValues.from, formValues.to]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitted values:', formValues);
      setMoreDetails(formValues); // Save all data including distance
      setShowMap(true); // Show the map after form submission
      handleClose();
    }
  };

  return (
    <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="xs">
      <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{t('Add Quotation Details')}</Typography>
        <Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="from"
                  name="from"
                  label={t('From')}
                  size="small"
                  fullWidth
                  value={formValues.from}
                  onChange={handleInputChange}
                  error={!!errors.from}
                  helperText={errors.from}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="to"
                  name="to"
                  label={t('To')}
                  size="small"
                  fullWidth
                  value={formValues.to}
                  onChange={handleInputChange}
                  error={!!errors.to}
                  helperText={errors.to}
                />
              </Grid>

              {km && (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Distance: {km} km ({formValues.distance?.miles} miles)
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} md={12}>
                <TextField
                  id="description"
                  name="description"
                  label={t('Description')}
                  size="small"
                  fullWidth
                  value={formValues.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="size"
                  name="size"
                  label={t('Size')}
                  size="small"
                  type="number"
                  fullWidth
                  value={formValues.size}
                  onChange={handleInputChange}
                  error={!!errors.size}
                  helperText={errors.size}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="weight"
                  name="weight"
                  label={t('Weight')}
                  size="small"
                  type="number"
                  fullWidth
                  value={formValues.weight}
                  onChange={handleInputChange}
                  error={!!errors.weight}
                  helperText={errors.weight}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="ETA"
                  name="ETA"
                  label={t('ETA')}
                  size="small"
                  type="number"
                  fullWidth
                  value={formValues.ETA}
                  onChange={handleInputChange}
                  error={!!errors.ETA}
                  helperText={errors.ETA}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="rate"
                  name="rate"
                  label={t('Rate')}
                  size="small"
                  type="number"
                  fullWidth
                  value={formValues.rate}
                  onChange={handleInputChange}
                  error={!!errors.rate}
                  helperText={errors.rate}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="advance"
                  name="advance"
                  label={t('Advance')}
                  size="small"
                  type="number"
                  fullWidth
                  value={formValues.advance}
                  onChange={handleInputChange}
                  error={!!errors.advance}
                  helperText={errors.advance}
                />
              </Grid>
            </Grid>
          </DialogContentText>

          <DialogActions>
            <Button onClick={handleClose}>{t('Cancel')}</Button>
            <Button type="submit" variant="contained">
              {t('Save')}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      {/* Render MapWithDistanceCalculator immediately after form submission */}
      {showMap && <MapWithDistanceCalculator from={formValues.from} to={formValues.to} />}
    </Dialog>
  );
};

export default AddQuotationDetails;

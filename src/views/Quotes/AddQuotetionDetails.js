import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';
import { postApi } from 'views/services/api';
import { display } from '@mui/system';

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
    distance: null
  });
  const [km, setKm] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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
    if (!km) newErrors.distance = t('Please calculate the distance first');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDistance = async () => {
    const { from, to } = formValues;

    if (!from || !to) {
      setKm(null);
      setFormValues((prev) => ({ ...prev, distance: null }));
      setErrors((prev) => ({
        ...prev,
        from: !from ? t('Please enter a valid From location') : '',
        to: !to ? t('Please enter a valid To location') : ''
      }));
      return;
    }

    try {
      const response = await postApi('/calculate-distance', { from, to });

      const distanceInKilometers = response.data?.distanceInKilometers ?? null;
      const distanceInMiles = response.data?.distanceInMiles ?? null;

      if (!distanceInKilometers) {
        throw new Error('Invalid address');
      }

      setKm(distanceInKilometers);
      setFormValues((prev) => ({
        ...prev,
        distance: {
          km: distanceInKilometers.toFixed(2),
          miles: distanceInMiles ? distanceInMiles.toFixed(2) : 'N/A'
        }
      }));
      setErrors((prev) => ({
        ...prev,
        from: '',
        to: ''
      }));
    } catch (error) {
      setKm(null);
      setFormValues((prev) => ({ ...prev, distance: null }));
      setErrors((prev) => ({
        ...prev,
        from: t('Please provide a valid From location'),
        to: t('Please provide a valid To location')
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitted values:', formValues);
      setMoreDetails(formValues);
      handleClose();
    }
  };

  return (
    <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="xs">
      <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{t('Add Quotation Details')}</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
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
                    {t('Distance')}: {km} km ({formValues.distance?.miles || 'N/A'} miles)
                  </Typography>
                </Grid>
              )}
              <Button onClick={calculateDistance} size="small" sx={{ marginLeft: 'auto', height: 20, marginTop: 2 }}>
                {t('Calculate Distance')}
              </Button>

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
            {errors.distance && (
              <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                {errors.distance}
              </Typography>
            )}
          </DialogContentText>

          <DialogActions>
            <Button onClick={handleClose}>{t('Cancel')}</Button>

            <Button type="submit" variant="contained">
              {t('Save')}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuotationDetails;

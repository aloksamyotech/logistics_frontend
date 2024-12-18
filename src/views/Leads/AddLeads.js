/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormLabel } from '@mui/material';
import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Divider } from '@mui/material';
import { postApi } from 'views/services/api';
import { useEffect } from 'react';
import { patchApi } from 'views/services/api';

const AddLeads = (props) => {
  const { open, handleClose, editData } = props;
  console.log("props ====>",props);
  
  const validationSchema = yup.object({});

  // -----------   initialValues
  const initialValues = {
    name: '',
    email: '',
    type: '',
    forecastclose: '',
    contact: '',
    source: '',
    region: '',
    country: '',
    potentialopportunity: '',
    chancesale: '',
    weightedforecast: '',
    query: '',
    pickuppincode: '',
    deliverypincode: '',
    consignmentDescription: '',
    weight: '',
    dimension: ''
  };

  useEffect(() => {
    if (open && editData) {
      formik.setValues({
        name: editData.name || '',
        email: editData.email || '',
        type: editData.type || '',
        forecastclose: editData.forecastclose || '',
        contact: editData.contact || '',
        source: editData.source || '',
        region: editData.region || '',
        country: editData.country || '',
        potentialopportunity: editData.potentialopportunity || '',
        chancesale: editData.chancesale || '',
        weightedforecast: editData.weightedforecast || '',
        query: editData.query || '',
        pickuppincode: editData.pickuppincode || '',
        deliverypincode: editData.deliverypincode || '',
        consignmentDescription: editData.consignmentDescription || '',
        weight: editData.weight || '',
        dimension: editData.dimension || '',
      });
    }
  }, [open, editData]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log('values===>', values);
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);

        if (editData) {
          console.log('/lead/updatelead/${editData._id}==>', `/lead/updatelead/${editData._id}`);

          patchApi(`/lead/updatelead/${editData._id}`, values)
            .then((response) => {
              console.log('response ==>', response);
            })
            .catch((error) => {
              console.log('error ', error);
            });
        } else {
          postApi('/lead/add', values)
            .then((response) => {
              console.log('response ==>', response);
            })
            .catch((error) => {
              console.log('error ', error);
            });
        }
      } catch (error) {
        console.error(error);
      }

      handleClose();
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Create Lead</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  {/* <FormLabel>Email</FormLabel> */}
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  {/* <FormLabel>Password</FormLabel> */}
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormLabel>Type</FormLabel>
                  <TextField
                    select
                    id="type"
                    name="type"
                    size="type"
                    fullWidth
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  >
                    <MenuItem value="sender1">Hot Lead</MenuItem>
                    <MenuItem value="sender1">Warm Lead</MenuItem>
                    <MenuItem value="sender1">Cold Lead</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormLabel>ForeCast Close</FormLabel>
                  <TextField
                    select
                    id="forecastclose"
                    name="forecastclose"
                    size="forecastclose"
                    fullWidth
                    value={formik.values.forecastclose}
                    onChange={formik.handleChange}
                    error={formik.touched.forecastclose && Boolean(formik.errors.forecastclose)}
                    helperText={formik.touched.forecastclose && formik.errors.forecastclose}
                  >
                    <MenuItem value="sender1">Jan</MenuItem>
                    <MenuItem value="sender1">Feb</MenuItem>
                    <MenuItem value="sender1">Mar</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Email</FormLabel> */}
                  <TextField
                    id="contact"
                    name="contact"
                    label="Contact"
                    size="small"
                    fullWidth
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                    helperText={formik.touched.contact && formik.errors.contact}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Email</FormLabel> */}
                  <TextField
                    id="source"
                    name="source"
                    label="Source"
                    size="small"
                    fullWidth
                    value={formik.values.source}
                    onChange={formik.handleChange}
                    error={formik.touched.source && Boolean(formik.errors.source)}
                    helperText={formik.touched.source && formik.errors.source}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Email</FormLabel> */}
                  <TextField
                    id="region"
                    name="region"
                    label="Region"
                    size="small"
                    fullWidth
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    error={formik.touched.region && Boolean(formik.errors.region)}
                    helperText={formik.touched.region && formik.errors.region}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Email</FormLabel> */}
                  <TextField
                    id="country"
                    name="country"
                    label="Country"
                    size="small"
                    fullWidth
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormLabel>Potential Opportunity</FormLabel>
                  <TextField
                    id="potentialopportunity"
                    name="potentialopportunity"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.potentialopportunity}
                    onChange={formik.handleChange}
                    error={formik.touched.potentialopportunity && Boolean(formik.errors.potentialopportunity)}
                    helperText={formik.touched.potentialopportunity && formik.errors.potentialopportunity}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormLabel>Chance of Sale</FormLabel>
                  <TextField
                    id="chancesale"
                    name="chancesale"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.chancesale}
                    onChange={formik.handleChange}
                    error={formik.touched.chancesale && Boolean(formik.errors.chancesale)}
                    helperText={formik.touched.chancesale && formik.errors.chancesale}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Weighted forecast</FormLabel>
                  <TextField
                    id="weightedforecast"
                    name="weightedforecast"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.weightedforecast}
                    onChange={formik.handleChange}
                    error={formik.touched.weightedforecast && Boolean(formik.errors.weightedforecast)}
                    helperText={formik.touched.weightedforecast && formik.errors.weightedforecast}
                  />
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Query Form</FormLabel>
                  <TextField
                    id="query"
                    name="query"
                    size="small"
                    fullWidth
                    value={formik.values.query}
                    onChange={formik.handleChange}
                    error={formik.touched.query && Boolean(formik.errors.query)}
                    helperText={formik.touched.query && formik.errors.query}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Pickup Pincode</FormLabel> */}
                  <TextField
                    id="pickuppincode"
                    name="pickuppincode"
                    label="Pickup Pincode"
                    size="small"
                    fullWidth
                    value={formik.values.pickuppincode}
                    onChange={formik.handleChange}
                    error={formik.touched.pickuppincode && Boolean(formik.errors.pickuppincode)}
                    helperText={formik.touched.pickuppincode && formik.errors.pickuppincode}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Delivery Pincode</FormLabel> */}
                  <TextField
                    id="deliverypincode"
                    name="deliverypincode"
                    label="Delivery Pincode"
                    size="small"
                    fullWidth
                    value={formik.values.deliverypincode}
                    onChange={formik.handleChange}
                    error={formik.touched.deliverypincode && Boolean(formik.errors.deliverypincode)}
                    helperText={formik.touched.deliverypincode && formik.errors.deliverypincode}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="consignmentDescription"
                    label="Consignment Description"
                    name="consignmentDescription"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={formik.values.consignmentDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.consignmentDescription && Boolean(formik.errors.consignmentDescription)}
                    helperText={formik.touched.consignmentDescription && formik.errors.consignmentDescription}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Weight</FormLabel> */}
                  <TextField
                    id="weight"
                    name="weight"
                    label="Weight"
                    size="small"
                    fullWidth
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Pickup Pincode</FormLabel> */}
                  <TextField
                    id="dimension"
                    name="dimension"
                    label="Dimension/Truck Size"
                    size="small"
                    fullWidth
                    value={formik.values.dimension}
                    onChange={formik.handleChange}
                    error={formik.touched.dimension && Boolean(formik.errors.dimension)}
                    helperText={formik.touched.dimension && formik.errors.dimension}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="primary">
            Save
          </Button>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Reset
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLeads;

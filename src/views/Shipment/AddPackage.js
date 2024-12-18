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
import { postApi, patchApi } from 'views/services/api';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AddPackage = (props) => {
  const { open, handleClose, packageData, editData } = props;
  console.log('props : ', props);
  console.log('editData for package  : ', editData);

  const validationSchema = yup.object({
    description: yup.string().required('Description is required'),
    invoiceNumber: yup.string().required('Invoice Number is required'),
    size: yup.string().required('Size is required'),
    weight: yup.string().required('Weight is required'),
    quantity: yup.number().required('Quantity is required'),
    declaredValue: yup.number().required('Declared Value is required')
  });

  // -----------   initialValues
  const initialValues = {
    description: '',
    invoiceNumber: '',
    size: '',
    weight: '',
    quantity: '',
    declaredValue: ''
  };

  useEffect(() => {
    if (open && editData) {
      formik.setValues({
        description: editData.description || '',
        invoiceNumber: editData.invoiceNumber || '',
        size: editData.size || '',
        weight: editData.weight || '',
        quantity: editData.quantity || '',
        declaredValue: editData.value || ''
      });
    }
  }, [open, editData]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log('Values before submitting:', values);

      values.created_by = JSON.parse(localStorage.getItem('user'))._id;
      values.shipmentIdentifier = props.shipmentIdentifier; // Include shipment identifier

      console.log('Values with shipmentIdentifier:', values);

      if (editData) {
        console.log('Editing existing data:', editData);
      }

      const response = await postApi('/shipment/packages/add', values);

      console.log('Response from API:', response);

      packageData(values);
      handleClose();
      resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="sm">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Package Details</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  {/* <FormLabel>Description</FormLabel> */}
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  {/* <FormLabel>Invoice Number</FormLabel> */}
                  <TextField
                    id="invoiceNumber"
                    name="invoiceNumber"
                    label="Invoice Number"
                    size="small"
                    fullWidth
                    value={formik.values.invoiceNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                    helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  {/* <FormLabel>Size</FormLabel> */}
                  <TextField
                    id="size"
                    name="size"
                    size="small"
                    label="Size"
                    fullWidth
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  {/* <FormLabel>Weight</FormLabel> */}
                  <TextField
                    id="weight"
                    name="weight"
                    size="small"
                    label="Weight"
                    fullWidth
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  {/* <FormLabel>Quantity</FormLabel> */}
                  <TextField
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    size="small"
                    fullWidth
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  {/* <FormLabel>Declared Value</FormLabel> */}
                  <TextField
                    id="declaredValue"
                    name="declaredValue"
                    size="small"
                    label="Declared Value"
                    fullWidth
                    value={formik.values.declaredValue}
                    onChange={formik.handleChange}
                    error={formik.touched.declaredValue && Boolean(formik.errors.declaredValue)}
                    helperText={formik.touched.declaredValue && formik.errors.declaredValue}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
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

export default AddPackage;

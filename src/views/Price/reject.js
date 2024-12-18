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
import { FormLabel } from '@mui/material';
import { postApi } from 'views/services/api';
import { useEffect } from 'react';
import { patchApi } from 'views/services/api';

const AddPrice = (props) => {
  const { open, handleClose, editData } = props;
  console.log('editData ==>', editData);

  const validationSchema = yup.object({
    from: yup.number().required('Location is required').min(0, 'should min from 0').max(0, 'should not gratter than 0'),
    to: yup.string().required('Location is required'),
    lcv: yup.number().required('LCV Price is required'),
    openTruck: yup.number().required('Open Truck Price is required')
  });

  const initialValues = {
    from: '',
    to: '',
    lcv: '',
    openTruck: ''
  };

  useEffect(() => {
    if (open && editData) {
      formik.setValues({
        from: editData.from || '',
        to: editData.to || '',
        lcv: editData.lcvrate || '',
        openTruck: editData.opentruckrate || ''
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
          console.log(`/price/updateprice/${editData._id}==>`, `/price/updateprice/${editData._id}`);

          patchApi(`/price/updateprice/${editData._id}`, values)
            .then((response) => {
              console.log('response ==>', response);
            })
            .catch((error) => {
              console.log('error ', error);
            });
        } else {
          postApi('/price/add', values)
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

  useEffect(() => {
    if (open && !editData) {
      formik.resetForm();
    }
  }, [open]);

  const calculateLCVPrice = (distance) => {
    const pricePerKm = 10;
    return pricePerKm * distance;
  };

  const handleDistanceChange = (e) => {
    const distance = parseInt(e.target.value, 10);

    if (!isNaN(distance) && distance >= 0) {
      const calculatedLCVPrice = calculateLCVPrice(distance);
      formik.setFieldValue('lcv', calculatedLCVPrice);
    } else {
      formik.setFieldValue('lcv', 0);
    }

    // Call formik's handleChange to ensure other fields are still handled
    formik.handleChange(e);
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add Price </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12}>
                  <FormLabel>From</FormLabel>
                  <TextField
                    id="from"
                    name="from"
                    size="small"
                    fullWidth
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    error={formik.touched.from && Boolean(formik.errors.from)}
                    helperText={formik.touched.from && formik.errors.from}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>To (Distance in km)</FormLabel>
                  <TextField
                    id="to"
                    name="to"
                    size="small"
                    fullWidth
                    type="number"
                    value={formik.values.to}
                    onChange={handleDistanceChange} // Handle distance change
                    error={formik.touched.to && Boolean(formik.errors.to)}
                    helperText={formik.touched.to && formik.errors.to}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>LCV Price</FormLabel>
                  <TextField
                    id="lcv"
                    name="lcv"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.lcv}
                    onChange={formik.handleChange}
                    error={formik.touched.lcv && Boolean(formik.errors.lcv)}
                    helperText={formik.touched.lcv && formik.errors.lcv}
                    disabled // LCV Price is auto-calculated based on the distance
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>28Fit Open Truck Price</FormLabel>
                  <TextField
                    id="openTruck"
                    name="openTruck"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.openTruck}
                    onChange={formik.handleChange}
                    error={formik.touched.openTruck && Boolean(formik.errors.openTruck)}
                    helperText={formik.touched.openTruck && formik.errors.openTruck}
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

export default AddPrice;
s;

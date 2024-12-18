import React from 'react';
import { Box, Grid, TextField, Typography, Button, Divider, Switch } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import { postApi } from 'views/services/api';

const CreateCustomer = (props) => {
  const { open, handleClose } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      companyName: '',
      gstNo: '',
      phoneno: '',
      pincode: '',
      address: '',
      userNotes: '',
      showRates: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      // companyName: Yup.string().required('Required'),
      // gstNo: Yup.string().required('Required'),
      phoneno: Yup.string().required('Required'),
      // pincode: Yup.number().required('Required'),
      address: Yup.string().required('Required')
      // userNotes: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      console.log('values : ', values);
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);

        postApi('/user/add', values)
          .then((response) => {
            console.log('response ==>', response);
            resetForm();
          })
          .catch((error) => {
            console.log('error ', error);
          });
      } catch (error) {
        console.error(error);
      }

      handleClose();
      resetForm();
      toast.success('Admin added successfully!!');
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Create Customer</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer', float: 'right' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Name"
                name="companyName"
                fullWidth
                variant="outlined"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="GST No"
                name="gstNo"
                fullWidth
                variant="outlined"
                value={formik.values.gstNo}
                onChange={formik.handleChange}
                error={formik.touched.gstNo && Boolean(formik.errors.gstNo)}
                helperText={formik.touched.gstNo && formik.errors.gstNo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="PhoneNo Number"
                name="phoneno"
                fullWidth
                variant="outlined"
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                helperText={formik.touched.phoneno && formik.errors.phoneno}
              />
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid item xs={12} md={6}>
              <TextField
                label="Enter pincode to fetch address automatically"
                name="pincode"
                fullWidth
                variant="outlined"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                name="address"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="User Notes - For internal use only."
                name="userNotes"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.userNotes}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item>
                <Typography>Show Rates</Typography>
              </Grid>
              <Grid item>
                <Switch checked={formik.values.showRates} onChange={(e) => formik.setFieldValue('showRates', e.target.checked)} />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
          Add Customer
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCustomer;

import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

const EditVendorProfile = () => {
  const formik = useFormik({
    initialValues: {
      shipmentdate: '',
      passwordexpecteddate: '',
      senderInfo: '',
      receiverInfo: '',
      deliveryAddress: '',
      contactPersonName: '',
      phone: '',
      fullLoad: '',
      pickupAddress: ''
    },
    validationSchema: Yup.object({
      shipmentdate: Yup.string().required('Required'),
      expecteddate: Yup.string().required('Required'),
      senderInfo: Yup.string().required('Required'),
      receiverInfo: Yup.string().required('Required'),
      deliveryAddress: Yup.string().required('Required'),
      contactPerson: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      fullLoad: Yup.string().required('Required'),
      pickupAddress: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <Box sx={{ borderRadius: '4px', backgroundColor: '#fff' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              placeholder="Email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phone"
              placeholder="phone"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              placeholder="Name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="companyName"
              placeholder="Company Name"
              fullWidth
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="GSTNo"
              placeholder="GST Number"
              fullWidth
              value={formik.values.GSTNo}
              onChange={formik.handleChange}
              error={formik.touched.GSTNo && Boolean(formik.errors.GSTNo)}
              helperText={formik.touched.GSTNo && formik.errors.GSTNo}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} />

          <Grid item xs={12} md={12}>
            <TextField
              placeholder="Address"
              name="userNotes"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={formik.values.userNotes}
              onChange={formik.handleChange}
              error={formik.touched.userNotes && Boolean(formik.errors.userNotes)}
              helperText={formik.touched.userNotes && formik.errors.userNotes}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3, mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            {/* <Button variant="outlined" color="secondary" type="reset">
             Return to the dashboard
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditVendorProfile;

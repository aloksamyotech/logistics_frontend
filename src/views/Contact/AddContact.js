

import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import RadioGroup from '@mui/material/RadioGroup';

import FormControl from '@mui/material/FormControl';

import { Switch } from '@mui/material';

const AddContact = () => {
  const formik = useFormik({
    initialValues: {
      shipmentdate: '',
      expecteddate: '',
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
    <Box sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
              Customer Info
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Email" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Password" type="password" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Name" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Company Name" fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="GST No" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Phone Number" fullWidth variant="outlined" />
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid item xs={12} md={6}>
            <TextField label="Enter pincode to fetch address automatically" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6} />

          <Grid item xs={12} md={6}>
            <TextField label="Address" multiline rows={4} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="User Notes - For internal use only." multiline rows={4} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} container alignItems="center">
            <Grid item>
              <Typography>Show Rates</Typography>
            </Grid>
            <Grid item>
              <Switch />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary">
                Add Customer
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Return to the dashboard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>

    // <Grid container spacing={2} padding={3}>
    //   <Grid item xs={12}>
    //     <Typography variant="h5" gutterBottom>
    //       Add Customer
    //     </Typography>
    //   </Grid>

    //   <Grid item xs={12} md={6}>
    //     <TextField label="Email" fullWidth variant="outlined" />
    //   </Grid>
    //   <Grid item xs={12} md={6}>
    //     <TextField label="Password" type="password" fullWidth variant="outlined" />
    //   </Grid>

    //   <Grid item xs={12} md={6}>
    //     <TextField label="Name" fullWidth variant="outlined" />
    //   </Grid>
    //   <Grid item xs={12} md={6}>
    //     <TextField label="Company Name" fullWidth variant="outlined" />
    //   </Grid>

    //   <Grid item xs={12} md={6}>
    //     <TextField label="GST No" fullWidth variant="outlined" />
    //   </Grid>
    //   <Grid item xs={12} md={6}>
    //     <TextField label="Phone Number" fullWidth variant="outlined" />
    //   </Grid>

    //   <Grid item xs={12}>
    //     <TextField label="Enter pincode to fetch address automatically" fullWidth variant="outlined" />
    //   </Grid>
    //   <Grid item xs={12}>
    //     <TextField label="Address" multiline rows={4} fullWidth variant="outlined" />
    //   </Grid>

    //   <Grid item xs={12}>
    //     <TextField label="User Notes - For internal use only." multiline rows={4} fullWidth variant="outlined" />
    //   </Grid>

    //   <Grid item xs={12} container alignItems="center">
    //     <Grid item>
    //       <Typography>Show Rates</Typography>
    //     </Grid>
    //     <Grid item>
    //       <Switch />
    //     </Grid>
    //   </Grid>

    //   <Grid item xs={12} container spacing={2}>
    //     <Grid item>
    //       <Button variant="contained" color="primary">
    //         Add Customer
    //       </Button>
    //     </Grid>
    //     <Grid item>
    //       <Button variant="outlined" color="primary">
    //         Return to the dashboard
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
};

export default AddContact;

import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider, Link, Breadcrumbs, Container } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { postApi } from 'views/services/api';
import HomeIcon from '@mui/icons-material/Home';
import { Stack } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const AddStaff = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phoneno: '',
      role: '',
      usernote: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is Required'),
      password: Yup.string().required('Password is Required'),
      name: Yup.string().required('Name is Required'),
      phoneno: Yup.string().required('Phone is Required'),
      role: Yup.string().required('Role is Required'),
      usernote: Yup.string().required('usernote is Required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('values ==========>', values);

      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);

        postApi('/user/add', values)
          .then((response) => {
            console.log('response ==>', response);
            toast.success('Deleted Successfully');
            resetForm();
          })
          .catch((error) => {
            console.log('error ', error);
          });
      } catch (error) {
        console.error(error);
      }
      formik.resetForm();
      toast.success('Staff added successfully!!');
      resetForm();
    }
  });
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Info
    </Typography>
  ];

  return (
    <>
      <card>
        <Container
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0.5
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.3rem' }}>
              Staff Info
            </Typography>
            <Stack spacing={2}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Stack>
        </Container>
      </card>

      <Box mt={2} sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
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
                name="password"
                placeholder="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
                name="phoneno"
                placeholder="Phone"
                fullWidth
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                helperText={formik.touched.phoneno && formik.errors.phoneno}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormLabel>Select Role</FormLabel>
              <TextField
                select
                name="role"
                placeholder="Employee"
                fullWidth
                variant="outlined"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="">Roles</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
              </TextField>
            </Grid>

            {/* <Grid item xs={12} md={6} /> */}

            <Grid item xs={12} md={6}>
              <TextField
                label="User Notes - For Internal use Only"
                name="usernote"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.usernote}
                onChange={formik.handleChange}
                error={formik.touched.usernote && Boolean(formik.errors.usernote)}
                helperText={formik.touched.usernote && formik.errors.usernote}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3, mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add Staff
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddStaff;

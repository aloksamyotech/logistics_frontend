import React from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  FormLabel,
  Divider,
  Link,
  Breadcrumbs,
  Switch,
  Stack,
  Container
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postApi } from 'views/services/api';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';

import { toast } from 'react-toastify';
const AddCustomer = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      companyname: '',
      gstno: '',
      phoneno: '',
      address: '',
      usernote: '',
      showRates: 0
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('email')).required(t('email')),
      password: Yup.string().required(t('password')),
      name: Yup.string().required(t('name')),
      companyname: Yup.string().required(t('companyName')),
      gstno: Yup.string().required(t('gstNo')),
      phoneno: Yup.string()
        .matches(/^[0-9]+$/, t('phoneNo'))
        .min(10, t('phoneNo'))
        .required(t('phoneNo')),
      address: Yup.string().required(t('address')),
      usernote: Yup.string()
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        await postApi('/user/add', values);
        toast.success('user added Successfully');
        resetForm();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Customer')}
    </Typography>
  ];

  return (
    <>
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
            {t('Customer Info')}
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Container>

      <Box mt={2} sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                name="email"
                label={t('email')}
                size="small"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="password"
                name="password"
                label={t('password')}
                size="small"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                name="name"
                label={t('name')}
                size="small"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="companyname"
                name="companyname"
                label={t('company Name')}
                size="small"
                fullWidth
                value={formik.values.companyname}
                onChange={formik.handleChange}
                error={formik.touched.companyname && Boolean(formik.errors.companyname)}
                helperText={formik.touched.companyname && formik.errors.companyname}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="gstno"
                name="gstno"
                label={t('gst No')}
                size="small"
                fullWidth
                value={formik.values.gstno}
                onChange={formik.handleChange}
                error={formik.touched.gstno && Boolean(formik.errors.gstno)}
                helperText={formik.touched.gstno && formik.errors.gstno}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="phoneno"
                name="phoneno"
                label={t('phone No')}
                size="small"
                fullWidth
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                helperText={formik.touched.phoneno && formik.errors.phoneno}
              />
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                rows={3}
                id="address"
                name="address"
                label={t('address')}
                size="small"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="usernote"
                name="usernote"
                label={t('user Notes')}
                multiline
                rows={3}
                size="small"
                fullWidth
                value={formik.values.usernote}
                onChange={formik.handleChange}
                error={formik.touched.usernote && Boolean(formik.errors.usernote)}
                helperText={formik.touched.usernote && formik.errors.usernote}
              />
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item>
                <Typography>{t('show Rates')}</Typography>
              </Grid>
              <Grid item>
                <Switch />
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  {t('Add Customer')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddCustomer;

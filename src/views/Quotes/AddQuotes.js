import React, { useState, useEffect } from 'react';
import { IconHome } from '@tabler/icons-react';

import {
  Box,
  Stack,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Breadcrumbs,
  Link
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddQuotetionDetails from './AddQuotetionDetails';
import { postApi, getApi } from 'views/services/api';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';

const AddQuotes = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCustomers = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      const filterCustomer = response.data.data.filter((item) => item.role === 'Customer');
      setCustomers(filterCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddQuoteDetails = (details) => {
    setQuoteDetails((prevDetails) => [...prevDetails, details]);
  };

  const formik = useFormik({
    initialValues: {
      customer: '',
      date: '',
      remark: ''
    },
    validationSchema: Yup.object({
      customer: Yup.string().required(t('customerRequired')),
      date: Yup.string().required(t('dateRequired')),
      remark: Yup.string().required(t('remarkRequired'))
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        values.created_by = user._id;
        const response = await postApi('/quote/add', values);
        const quoteid = response.data.data._id;

        if (quoteDetails) {
          const updatedQuoteDetails = quoteDetails.map((detail) => ({
            ...detail,
            created_by: user._id,
            quoteId: quoteid
          }));

          await postApi('/quote/addquotedetails', updatedQuoteDetails);
        }

        resetForm();
        setQuoteDetails([]);
      } catch (error) {
        console.error(error);
      }

      handleCloseAdd();
      formik.resetForm();
    }
  });

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('quotation')}
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
            {t('Quotation Form')}
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Stack>
      </Container>

      <AddQuotetionDetails open={openAdd} handleClose={handleCloseAdd} setMoreDetails={handleAddQuoteDetails} />

      <Box mt={2} sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormLabel>{t('selectCustomer')}</FormLabel>
              <TextField
                select
                name="customer"
                fullWidth
                variant="outlined"
                value={formik.values.customer}
                onChange={formik.handleChange}
                error={formik.touched.customer && Boolean(formik.errors.customer)}
                helperText={formik.touched.customer && formik.errors.customer}
              >
                {customers.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormLabel>{t('date')}</FormLabel>
              <TextField
                type="date"
                name="date"
                fullWidth
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0]
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                label={t('remark')}
                name="remark"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.remark}
                onChange={formik.handleChange}
                error={formik.touched.remark && Boolean(formik.errors.remark)}
                helperText={formik.touched.remark && formik.errors.remark}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('quotationDetails')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="Quotation Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>{t('from')}</TableCell>
                      <TableCell>{t('to')}</TableCell>
                      <TableCell>{t('description')}</TableCell>
                      <TableCell>{t('size')}</TableCell>
                      <TableCell>{t('weight')}</TableCell>
                      <TableCell>{t('eta')}</TableCell>
                      <TableCell>{t('advance')}</TableCell>
                      <TableCell>{t('action')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quoteDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{detail.from}</TableCell>
                        <TableCell>{detail.to}</TableCell>
                        <TableCell>{detail.description}</TableCell>
                        <TableCell>{detail.size}</TableCell>
                        <TableCell>{detail.weight}</TableCell>
                        <TableCell>{detail.ETA}</TableCell>
                        <TableCell>{detail.advance}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                  {t('addQuotationDetails')}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  {t('save')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddQuotes;

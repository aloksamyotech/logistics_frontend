import React from 'react';
import {
  Card,
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  FormLabel,
  Divider,
  FormHelperText,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import AddCustomer from 'views/Customer/AddCustomer';
import CreateCustomer from './CreateCustomer';
import { useState, useEffect } from 'react';
import { bgcolor, Container, Stack } from '@mui/system';
import AddVendor from 'views/Vendors/VendorList/AddVendor';
import AddPackage from './AddPackage';
import AddInsurance from './AddInsurance';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { getApi, postApi } from 'views/services/api';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { t } from 'i18next';
const AddShipment = () => {
  const { t } = useTranslation();
  const [open, setOpenAdd] = useState(false);
  const [openVendor, setOpenAddForVendor] = useState(false);
  const [openPackage, setOpenAddForPackage] = useState(false);
  const [openInsurance, setOpenAddForInsurance] = useState(false);
  const [packageDetails, setPackageDetails] = useState([]);
  const [insuranceDetails, setInsuranceDetails] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();
  console.log('location : ', location);

  const { shipment, mode } = location.state || {};
  console.log('location.state : ', location.state);
  console.log('shipment : ', shipment);
  console.log('mode : ', mode);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenAddForVendor = () => {
    setOpenAddForVendor(true);
  };

  const handleCloseAddForVendor = () => {
    setOpenAddForVendor(false);
  };

  const handleOpenAddForPackage = () => {
    setOpenAddForPackage(true);
  };

  const handleCloseAddForPackage = () => {
    setOpenAddForPackage(false);
  };

  const handleOpenAddForInsurance = () => {
    setOpenAddForInsurance(true);
  };

  const handleCloseAddForInsurance = () => {
    setOpenAddForInsurance(false);
  };

  const handleAddPackageData = (details) => {
    console.log('details ==================--->', details);
    setPackageDetails(details);
  };
  console.log('packageDetails ===>', packageDetails);

  const handleAddInsurance = (details) => {
    console.log('details--->', details);
    setInsuranceDetails(details);
  };
  console.log('insuranceDetails :', insuranceDetails);

  const fetchVendors = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      const filterVendors = response.data.data.filter((item) => item.role === 'Vendor');
      const filterCustomer = response.data.data.filter((item) => item.role === 'Customer');

      console.log('filterVendors :', filterVendors);
      console.log('filterCustomer :', filterCustomer);

      setVendorData(filterVendors);
      setCustomerData(filterCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (shipment && mode) {
      formik.setValues({
        shipmentdate: moment(shipment.shipmentdate).format('YYYY-MM-DD') || '',
        expecteddate: moment(shipment.expectedDeliveryDate).format('YYYY-MM-DD') || '',
        senderInfo: shipment.customerdata1._id || '',
        receiverInfo: shipment.customerdata2._id || '',
        deliveryAddress: shipment.deliveryAddress || '',

        contactPersonName: shipment.package_contact_person_name || '',
        contactPersonNumber: shipment.package_contact_person_phone || '',
        fullLoad: shipment.package_transaction_type || '',
        pickupAddress: shipment.package_pickup_address || '',

        driverName: shipment.transport_driver_name || '',
        driverNumber: shipment.transport_driver_phone || '',
        vehicleDetails: shipment.transport_driver_vehicledetails || '',
        userNotes: shipment.usernote || '',

        vendor: shipment.data._id || '',
        memoNumber: shipment.vendordata.memoNumber || '',
        commission: shipment.vendordata.commission || '',
        cash: shipment.vendordata.cash || '',
        total: shipment.vendordata.total || '',
        advance: shipment.vendordata.advance || '',

        transportation: shipment.charge_transportation || '',
        handling: shipment.charge_handling || '',
        halting: shipment.charge_halting || '',
        insurance: shipment.charge_insurance || '',
        cartage: shipment.charge_cartage || '',
        overweight: shipment.charge_over_weight || '',
        odcCharges: shipment.charge_odc || '',
        taxPercent: shipment.charge_tax_percent || '',
        advancePaid: shipment.charge_advance_paid || '',
        discount: shipment.discount || '',

        total_tax: shipment.total_tax || '',
        total_amount: shipment.total_amount || '',
        total_balance: shipment.total_balance || '',

        remarks: shipment.remarks || '',
        billToOption: shipment.bill_to || ''
      });
    }
    // setPackageDetails(shipment.packagedata);
  }, [shipment, mode]);

  const formik = useFormik({
    initialValues: {
      shipmentdate: '',
      expecteddate: '',
      senderInfo: '',
      receiverInfo: '',
      deliveryAddress: '',

      contactPersonName: '',
      contactPersonNumber: '',
      fullLoad: '',
      pickupAddress: '',

      driverName: '',
      driverNumber: '',
      vehicleDetails: '',
      userNotes: '',

      vendor: '',
      memoNumber: '',
      commission: '',
      cash: '',
      total: '',
      advance: '',

      transportation: '',
      handling: '',
      halting: '',
      insurance: '',
      cartage: '',
      overweight: '',
      odcCharges: '',
      taxPercent: '',
      advancePaid: '',
      discount: '',

      remarks: '',
      billToOption: ''
    },
    validationSchema: Yup.object({
      shipmentdate: Yup.string().required(t('Shipment Date is Required')),
      expecteddate: Yup.string().required(t('Expected Date is Required')),
      senderInfo: Yup.string().required(t('Sender Info is Required')),
      receiverInfo: Yup.string().required(t('Receiver Info is Required')),
      deliveryAddress: Yup.string().required(t('Delivery Address is Required')),

      contactPersonName: Yup.string().required(t('Contact Person Name is Required')),
      contactPersonNumber: Yup.string().required(t('Contact Person Number is Required')),
      fullLoad: Yup.string().required(t('Load Type is Required')),
      pickupAddress: Yup.string().required(t('Pickup Address is Required')),

      driverName: Yup.string().required(t('Driver Name is Required')),
      driverNumber: Yup.string().required(t('Driver Number is Required')),
      vehicleDetails: Yup.string().required(t('Vehicle Details is Required')),
      userNotes: Yup.string().required(t('User Notes is Required')),

      vendor: Yup.string().required(t('Vendor is Required')),
      memoNumber: Yup.string().required(t('Memo Number is Required')),
      commission: Yup.string().required(t('Commission is Required')),
      cash: Yup.string().required(t('Cash is Required')),
      total: Yup.string().required(t('Total is Required')),
      advance: Yup.string().required(t('Advance is Required')),

      transportation: Yup.string().required(t('Transportation is Required')),
      handling: Yup.string().required(t('Handling is Required')),
      halting: Yup.string().required(t('Halting is Required')),
      insurance: Yup.string().required(t('Insurance is Required')),
      cartage: Yup.string().required(t('Cartage is Required')),
      overweight: Yup.string().required(t('Over Weight Charges is Required')),
      odcCharges: Yup.string().required(t('ODC Charges is Required')),
      taxPercent: Yup.string().required(t('Tax Percent is Required')),
      advancePaid: Yup.string().required(t('Advance Paid Amount is Required')),
      discount: Yup.string().required(t('Discount is Required'))
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log('values===>', values);
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);
        console.log('final values ====================>', values);

        if (shipment && mode) {
          console.log('api hit for edit only .................');
        } else {
          postApi('/shipment/add', values)
            .then((response) => {
              console.log('response ====>', response);
              resetForm();
              toast.success('shipment added successecfully');
            })
            .catch((error) => {
              console.log('error ', error);
            });
        }
      } catch (error) {
        console.error(error);
      }

      resetForm();
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);

    const values = { ...formik.values, [name]: value };

    // Calculate total
    const total =
      values.transportation + values.handling + values.halting + values.insurance + values.cartage + values.overweight + values.odcCharges;

    // Calculate tax
    const taxPercent = (total * values.taxPercent) / 100;
    formik.setFieldValue('total_tax', taxPercent);

    const totalAfterAddTax = total + taxPercent;

    formik.setFieldValue('total_amount', totalAfterAddTax - values.discount);

    formik.setFieldValue('total_balance', totalAfterAddTax - values.discount - values.advancePaid);
  };

  const handleEditClickForPackage = () => {
    console.log('Edit button clicked for package');
    if (shipment && mode) {
      setOpenAddForPackage(true);
      setPackageDetails(shipment.packagedata);
    }
  };

  const handleEditClickForInsurance = () => {
    if (shipment && mode) {
      setOpenAddForInsurance(true);
      setInsuranceDetails(shipment.insurancedata);
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Shipment')}
    </Typography>
  ];

  return (
    <>
      <CreateCustomer open={open} handleClose={handleCloseAdd} />
      <AddVendor open={openVendor} handleClose={handleCloseAddForVendor} />
      <AddPackage open={openPackage} handleClose={handleCloseAddForPackage} packageData={handleAddPackageData} editData={packageDetails} />
      <AddInsurance
        open={openInsurance}
        handleClose={handleCloseAddForInsurance}
        insuranceData={handleAddInsurance}
        editData={insuranceDetails}
      />

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
            {t('Shipment Info')}
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Stack>
      </Container>

      <Box mt={2} sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormLabel>{t('Shipment Date')}</FormLabel>
              <TextField
                type="date"
                name="shipmentdate"
                fullWidth
                value={formik.values.shipmentdate}
                onChange={formik.handleChange}
                error={formik.touched.shipmentdate && Boolean(formik.errors.shipmentdate)}
                helperText={formik.touched.shipmentdate && formik.errors.shipmentdate}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0] // sets the min date to today
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>{t('Expected Delivery Date')}</FormLabel>
              <TextField
                type="date"
                name="expecteddate"
                fullWidth
                value={formik.values.expecteddate}
                onChange={formik.handleChange}
                error={formik.touched.expecteddate && Boolean(formik.errors.expecteddate)}
                helperText={formik.touched.expecteddate && formik.errors.expecteddate}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0] // sets the max date to today
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>{t('Sender Info')}</FormLabel>
              <TextField
                select
                name="senderInfo"
                fullWidth
                variant="outlined"
                value={formik.values.senderInfo}
                onChange={formik.handleChange}
                error={formik.touched.senderInfo && Boolean(formik.errors.senderInfo)}
                helperText={formik.touched.senderInfo && formik.errors.senderInfo}
              >
                {customerData.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>{t('Receiver Info')}</FormLabel>
              <TextField
                select
                name="receiverInfo"
                fullWidth
                variant="outlined"
                value={formik.values.receiverInfo}
                onChange={formik.handleChange}
                error={formik.touched.receiverInfo && Boolean(formik.errors.receiverInfo)}
                helperText={formik.touched.receiverInfo && formik.errors.receiverInfo}
              >
                {customerData.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                {t('Add Sender')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                {t('Add Receiver')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={t('Delivery Address')}
                name="deliveryAddress"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.deliveryAddress}
                onChange={formik.handleChange}
                error={formik.touched.deliveryAddress && Boolean(formik.errors.deliveryAddress)}
                helperText={formik.touched.deliveryAddress && formik.errors.deliveryAddress}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Package Pickup Location')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label={t('contactPersonName')} // Translated label for "Contact Person Name"
                name="contactPersonName"
                fullWidth
                variant="outlined"
                value={formik.values.contactPersonName}
                onChange={formik.handleChange}
                error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label={t('contactPersonNumber')} // Translated label for "Contact Number"
                name="contactPersonNumber"
                fullWidth
                variant="outlined"
                value={formik.values.contactPersonNumber}
                onChange={formik.handleChange}
                error={formik.touched.contactPersonNumber && Boolean(formik.errors.contactPersonNumber)}
                helperText={formik.touched.contactPersonNumber && formik.errors.contactPersonNumber}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                label={t('fullLoad')} // Translated label for "Full Load"
                name="fullLoad"
                fullWidth
                variant="outlined"
                value={formik.values.fullLoad}
                onChange={formik.handleChange}
                error={formik.touched.fullLoad && Boolean(formik.errors.fullLoad)}
                helperText={formik.touched.fullLoad && formik.errors.fullLoad}
              >
                <MenuItem value="FullLoad">{t('fullLoad')}</MenuItem> {/* Translated "Full Load" */}
                <MenuItem value="PartLoad">{t('partLoad')}</MenuItem> {/* Translated "Part Load" */}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('Pickup Address')}
                name="pickupAddress"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.pickupAddress}
                onChange={formik.handleChange}
                error={formik.touched.pickupAddress && Boolean(formik.errors.pickupAddress)}
                helperText={formik.touched.pickupAddress && formik.errors.pickupAddress}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Transport Details')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label={t('Driver Name')}
                name="driverName"
                fullWidth
                variant="outlined"
                value={formik.values.driverName}
                onChange={formik.handleChange}
                error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                helperText={formik.touched.driverName && formik.errors.driverName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label={t('Driver Phone Number')}
                name="driverNumber"
                fullWidth
                variant="outlined"
                value={formik.values.driverNumber}
                onChange={formik.handleChange}
                error={formik.touched.driverNumber && Boolean(formik.errors.driverNumber)}
                helperText={formik.touched.driverNumber && formik.errors.driverNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={t('Vehicle Details')}
                name="vehicleDetails"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.vehicleDetails}
                onChange={formik.handleChange}
                error={formik.touched.vehicleDetails && Boolean(formik.errors.vehicleDetails)}
                helperText={formik.touched.vehicleDetails && formik.errors.vehicleDetails}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={t('User Notes - For Internal use Only')}
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

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Vendor Details')} {/* Translated label for "Vendor Details" */}
              </Typography>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <FormLabel>{t('Select Vendor')}</FormLabel> {/* Translated label for "Select Vendor" */}
                <TextField
                  select
                  name="vendor"
                  fullWidth
                  variant="outlined"
                  value={formik.values.vendor}
                  onChange={formik.handleChange}
                  error={formik.touched.vendor && Boolean(formik.errors.vendor)}
                  helperText={formik.touched.vendor && formik.errors.vendor}
                >
                  {vendorData.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormLabel>{t('Memo Number')}</FormLabel> {/* Translated label for "Memo Number" */}
                <TextField
                  name="memoNumber"
                  fullWidth
                  variant="outlined"
                  value={formik.values.memoNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.memoNumber && Boolean(formik.errors.memoNumber)}
                  helperText={formik.touched.memoNumber && formik.errors.memoNumber}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormLabel>{t('Commission')}</FormLabel>
                <TextField
                  name="commission"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.commission}
                  onChange={formik.handleChange}
                  error={formik.touched.commission && Boolean(formik.errors.commission)}
                  helperText={formik.touched.commission && formik.errors.commission}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormLabel>{t('Cash')}</FormLabel>
                <TextField
                  name="cash"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.cash}
                  onChange={formik.handleChange}
                  error={formik.touched.cash && Boolean(formik.errors.cash)}
                  helperText={formik.touched.cash && formik.errors.cash}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormLabel>{t('Total')}</FormLabel>
                <TextField
                  name="total"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.total}
                  onChange={formik.handleChange}
                  error={formik.touched.total && Boolean(formik.errors.total)}
                  helperText={formik.touched.total && formik.errors.total}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormLabel>{t('Advance')}</FormLabel>
                <TextField
                  name="advance"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.advance}
                  onChange={formik.handleChange}
                  error={formik.touched.advance && Boolean(formik.errors.advance)}
                  helperText={formik.touched.advance && formik.errors.advance}
                />
              </Grid>

              <Grid item xs={12} md={3} container alignItems="center">
                <Button variant="contained" color="primary" onClick={handleOpenAddForVendor}>
                  {t('Add Vendor')}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Additional Expenses')}
              </Typography>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <FormLabel>{t('Transportation')}</FormLabel>
                <TextField
                  name="transportation"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.transportation}
                  onChange={formik.handleChange}
                  error={formik.touched.transportation && Boolean(formik.errors.transportation)}
                  helperText={formik.touched.transportation && formik.errors.transportation}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Handling')}</FormLabel>
                <TextField
                  name="handling"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.handling}
                  onChange={formik.handleChange}
                  error={formik.touched.handling && Boolean(formik.errors.handling)}
                  helperText={formik.touched.handling && formik.errors.handling}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Halting')}</FormLabel>
                <TextField
                  name="halting"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.halting}
                  onChange={formik.handleChange}
                  error={formik.touched.halting && Boolean(formik.errors.halting)}
                  helperText={formik.touched.halting && formik.errors.halting}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Insurance')}</FormLabel>
                <TextField
                  name="insurance"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.insurance}
                  onChange={formik.handleChange}
                  error={formik.touched.insurance && Boolean(formik.errors.insurance)}
                  helperText={formik.touched.insurance && formik.errors.insurance}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Cartage')}</FormLabel>
                <TextField
                  name="cartage"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.cartage}
                  onChange={formik.handleChange}
                  error={formik.touched.cartage && Boolean(formik.errors.cartage)}
                  helperText={formik.touched.cartage && formik.errors.cartage}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Over weight')}</FormLabel>
                <TextField
                  name="overweight"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.overweight}
                  onChange={formik.handleChange}
                  error={formik.touched.overweight && Boolean(formik.errors.overweight)}
                  helperText={formik.touched.overweight && formik.errors.overweight}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <FormLabel>{t('ODC Charges')}</FormLabel>
                <TextField
                  name="odcCharges"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.odcCharges}
                  onChange={formik.handleChange}
                  error={formik.touched.odcCharges && Boolean(formik.errors.odcCharges)}
                  helperText={formik.touched.odcCharges && formik.errors.odcCharges}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Tax Percent (%)')}</FormLabel>
                <TextField
                  name="taxPercent"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.taxPercent}
                  onChange={handleChange}
                  error={formik.touched.taxPercent && Boolean(formik.errors.taxPercent)}
                  helperText={formik.touched.taxPercent && formik.errors.taxPercent}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Advance Paid')}</FormLabel>
                <TextField
                  name="advancePaid"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.advancePaid}
                  onChange={handleChange}
                  error={formik.touched.advancePaid && Boolean(formik.errors.advancePaid)}
                  helperText={formik.touched.advancePaid && formik.errors.advancePaid}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormLabel>{t('Discount')}</FormLabel>
                <TextField
                  name="discount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.discount}
                  onChange={handleChange}
                  error={formik.touched.discount && Boolean(formik.errors.discount)}
                  helperText={formik.touched.discount && formik.errors.discount}
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Package Details')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label={t('Package Details')}>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell>{t('Description')}</TableCell>
                      <TableCell>{t('Invoice No')}</TableCell>
                      <TableCell>{t('Size')}</TableCell>
                      <TableCell>{t('Weight')}</TableCell>
                      <TableCell>{t('Quantity')}</TableCell>
                      <TableCell>{t('Cost')}</TableCell>
                      <TableCell>{t('Action')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mode ? (
                      <>
                        <TableRow>
                          <TableCell>{shipment?.packagedata?.description || t('N/A')}</TableCell>
                          <TableCell>{shipment?.packagedata?.invoiceNumber || t('N/A')}</TableCell>
                          <TableCell>{shipment?.packagedata?.size || t('N/A')}</TableCell>
                          <TableCell>{shipment?.packagedata?.weight || t('N/A')}</TableCell>
                          <TableCell>{shipment?.packagedata?.quantity || t('N/A')}</TableCell>
                          <TableCell>{shipment?.packagedata?.value || t('N/A')}</TableCell>
                          {packageDetails ? (
                            <>
                              <TableCell>
                                <IconButton aria-label="edit" onClick={handleEditClickForPackage}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="clear">
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell>{t('No Action Available')}</TableCell>
                          )}
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell>{packageDetails?.description || t('N/A')}</TableCell>
                          <TableCell>{packageDetails?.invoiceNumber || t('N/A')}</TableCell>
                          <TableCell>{packageDetails?.size || t('N/A')}</TableCell>
                          <TableCell>{packageDetails?.weight || t('N/A')}</TableCell>
                          <TableCell>{packageDetails?.quantity || t('N/A')}</TableCell>
                          <TableCell>{packageDetails?.declaredValue || t('N/A')}</TableCell>
                          {packageDetails ? (
                            <>
                              <TableCell>
                                <IconButton aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="clear">
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell>{t('No Action Available')}</TableCell>
                          )}
                        </TableRow>
                      </>
                    )}
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Button variant="contained" onClick={handleOpenAddForPackage}>
                          {t('Add')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          {/* <Divider sx={{ my: 4 }} /> */}

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Insurance Details')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label={t('Package Details')}>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell>{t('Eway Bill')}</TableCell>
                      <TableCell>{t('Insurance No')}</TableCell>
                      <TableCell>{t('Insurance Agent')}</TableCell>
                      <TableCell>{t('Action')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mode ? (
                      <>
                        <TableRow>
                          <TableCell>{shipment.insurancedata.eway_bill || t('N/A')}</TableCell>
                          <TableCell>{shipment.insurancedata.insurance_no || t('N/A')}</TableCell>
                          <TableCell>{shipment.insurancedata.insurance_agent || t('N/A')}</TableCell>
                          {insuranceDetails ? (
                            <>
                              <TableCell>
                                <IconButton aria-label="edit" onClick={handleEditClickForInsurance}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="clear">
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell>{t('No Action Available')}</TableCell>
                          )}
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell>{insuranceDetails?.ewayBill || t('N/A')}</TableCell>
                          <TableCell>{insuranceDetails?.insuranceNo || t('N/A')}</TableCell>
                          <TableCell>{insuranceDetails?.insuranceAgent || t('N/A')}</TableCell>
                          {insuranceDetails ? (
                            <>
                              <TableCell>
                                <IconButton aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="clear">
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell>{t('No Action Available')}</TableCell>
                          )}
                        </TableRow>
                      </>
                    )}
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Button variant="contained" onClick={handleOpenAddForInsurance}>
                          {t('Add')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                {t('Text Details')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                {t('Total Taxes')}
              </Typography>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                {t('Total')}
              </Typography>
              <Typography variant="subtitle1" align="left" sx={{ mb: 2, fontSize: '1rem' }}>
                {t('Balance')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} container justifyContent="flex-end">
              <Grid item xs={12} md={2} />

              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  type="number"
                  value={formik.values.total_tax}
                  defaultValue="0"
                  inputProps={{ style: { textAlign: 'left' } }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  type="number"
                  value={formik.values.total_amount}
                  defaultValue="0"
                  inputProps={{ style: { textAlign: 'left' } }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  type="number"
                  value={formik.values.total_balance}
                  defaultValue="0"
                  inputProps={{ style: { textAlign: 'left' } }}
                  sx={{ mb: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                label={t('Remarks')}
                name="remarks"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={formik.touched.remarks && formik.errors.remarks}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12} md={2}>
              <FormControl component="fieldset">
                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontSize: '1rem' }} variant="subtitle1">
                  {t('Bill To')}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="billToOption"
                  value={formik.values.billToOption}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="Consignor" control={<Radio />} label={t('Consignor')} />
                  <FormControlLabel value="Consignee" control={<Radio />} label={t('Consignee')} />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3, mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                {t('Save')}
              </Button>
              <Button variant="outlined" color="secondary" type="reset">
                {t('Reset')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddShipment;

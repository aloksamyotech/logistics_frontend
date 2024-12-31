import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { getApi } from 'views/services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { t } from 'i18next';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ViewShipmentDetails() {
  const { id } = useParams();
  console.log('id ==>', id);

  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [shipmentData, setShipmentData] = useState([]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEditlead = () => setOpenEdit(true);
  const handleCloseEditlead = () => setOpenEdit(false);
  const handleOpenDeleteLead = () => setDeleteDialogOpen(true);
  const handleCloseDeleteLead = () => setDeleteDialogOpen(false);

  const fetchShipmetData = async () => {
    try {
      console.log('==>', `/shipment/shipments_details/${id}`);

      await getApi(`/shipment/shipments_details/${id}`)
        .then((response) => {
          console.log('response data :', response);
          setShipmentData(response?.data?.data[0]);
        })
        .catch((error) => {
          console.log('error :', error);
        });
    } catch (error) {
      console.log('error :', error);
    }
  };

  useEffect(() => {
    fetchShipmetData();
  }, []);

  console.log('shipmentData :   ==========>', shipmentData);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3
          }}
        >
          <Typography variant="h4">{t('shipment Basic Information')}</Typography>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
            {t('Back')}
          </Button>
        </Grid>
        {/* <hr /> */}
        <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h4" fontWeight="bold">
                  {t('Basic Details')}
                </Typography>
                <hr />

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Date :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.shipmentdate ? moment(shipmentData.shipmentdate).format('YYYY-MM-DD') : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Expected Date :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.expectedDeliveryDate ? moment(shipmentData.expectedDeliveryDate).format('YYYY-MM-DD') : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Delivery Address :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.deliveryAddress ? shipmentData.deliveryAddress : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={6}>
                    <Typography variant="h5">{t('Sender :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.customerdata1?.name ? shipmentData.customerdata1.name : 'N/A'}
                    </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.customerdata1?.phoneno ? shipmentData.customerdata1.phoneno : 'N/A'}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography variant="h5">{t('Receiver :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.customerdata2?.name ? shipmentData.customerdata2.name : 'N/A'}
                    </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.customerdata2?.phoneno ? shipmentData.customerdata2.phoneno : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h4" fontWeight="bold">
                  {t('Pickup Location Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Person Name :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.package_contact_person_name ? shipmentData.package_contact_person_name : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Person Contact :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.package_contact_person_phone ? shipmentData.package_contact_person_phone : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Transaction Type :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.package_transaction_type ? shipmentData.package_transaction_type : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Pickup Address :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.package_pickup_address ? shipmentData.package_pickup_address : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, marginTop: '10px', overflowX: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Transport Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Driver Name :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.transport_driver_name ? shipmentData.transport_driver_name : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Driver Contact :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.transport_driver_phone ? shipmentData.transport_driver_phone : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Vehicle Details :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.transport_driver_vehicledetails ? shipmentData.transport_driver_vehicledetails : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Note :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.usernote ? shipmentData.usernote : 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Vendor Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Vendor Name :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.data?.name ? shipmentData.data.name : 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.data?.phoneno ? shipmentData.data.phoneno : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Memo Number :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.vendordata?.memoNumber ? shipmentData.vendordata.memoNumber : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Commission :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.vendordata?.commission ? shipmentData.vendordata.commission : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Cash :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.vendordata?.cash ? shipmentData?.vendordata?.cash : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Total :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.vendordata?.total ? shipmentData?.vendordata?.total : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Advance :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.vendordata?.advance ? shipmentData?.vendordata?.advance : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, marginTop: '10px', overflowX: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Additional Expenses')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Transportation :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_transportation ? shipmentData.charge_transportation : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Handling :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_handling ? shipmentData.charge_handling : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Halting :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.charge_halting ? shipmentData.charge_halting : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Insurance :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_insurance ? shipmentData.charge_insurance : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Cartage :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.charge_cartage ? shipmentData.charge_cartage : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Overweight :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_over_weight ? shipmentData.charge_over_weight : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('ODC Charges :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.charge_odc ? shipmentData.charge_odc : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Tax Percent :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_tax_percent ? shipmentData.charge_tax_percent : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Advance Paid :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.charge_advance_paid ? shipmentData.charge_advance_paid : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Discount :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.discount ? shipmentData.discount : 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Package Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('InvoiceNumber :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.invoiceNumber ? shipmentData.packagedata.invoiceNumber : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Size :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.size ? shipmentData.packagedata.size : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Weight :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.weight ? shipmentData.packagedata.weight : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Quantity :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.quantity ? shipmentData.packagedata.quantity : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Declared Value :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.value ? shipmentData.packagedata.value : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <Typography variant="h5">{t('Description :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.packagedata?.description ? shipmentData.packagedata.description : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, marginTop: '10px', overflowX: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Insurance Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Eway Bill :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.insurancedata?.eway_bill ? shipmentData.insurancedata.eway_bill : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Insurance No :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.insurancedata?.insurance_no ? shipmentData.insurancedata.insurance_no : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Insurance Agent :')} </Typography>
                    <Typography style={{ color: 'black' }}>
                      {shipmentData?.insurancedata?.insurance_agent ? shipmentData.insurancedata.insurance_agent : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
              <Item>
                <Typography variant="h5" fontWeight="bold">
                  {t('Tax Details')}
                </Typography>
                <hr />
                <Grid container spacing={2} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Total Tax :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.total_tax ? shipmentData.total_tax : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Total Amount :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.total_amount ? shipmentData.total_amount : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="h5">{t('Total Balance :')} </Typography>
                    <Typography style={{ color: 'black' }}>{shipmentData?.total_balance ? shipmentData.total_balance : 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

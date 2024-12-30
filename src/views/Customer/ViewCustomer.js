import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getApi } from 'views/services/api';
import { t } from 'i18next'; // Importing t for translations

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ViewCustomer() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const { id } = useParams();

  const fetchCustomerData = async () => {
    try {
      const response = await getApi(`/user/getuser/${id}`);
      setCustomerData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Grid>
          <Item>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">{t('Customer Basic Information')}</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                {t('Back')}
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('Company Name')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.companyname || t('N/A')}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('Email Id')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.email || t('N/A')}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('Name')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.name || t('N/A')}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('Phone Number')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.phoneno || t('N/A')}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('Address')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.address || t('N/A')}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('GST Number')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.gstno || t('N/A')}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">{t('User Note')}</Typography>
                <Typography style={{ color: 'black' }}>{customerData?.usernote || t('N/A')}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}

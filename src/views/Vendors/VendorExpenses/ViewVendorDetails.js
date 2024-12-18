import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { getApi } from 'views/services/api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ViewVendorDetails() {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({}); 
  const { id } = useParams();
  console.log('id found in view leads ==>', id);

  const fetchVendorDetails = async () => {
    try {
      const response = await getApi(`/vendor/getvendor_expensedata/${id}`);
      console.log('response    =====> fetchVendorDetails  =====>', response);
      setVendorData(response?.data?.data[0]);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVendorDetails();
  }, []);
  console.log("vendorData ====>",vendorData);
  

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Grid>
          <Item>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h4">Vendor Basic Information</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Name</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.name ? vendorData?.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Amount</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.amount ? vendorData?.amount : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Vendor Name</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.vendordata?.name ? vendorData?.vendordata?.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Email Id</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.vendordata?.email ? vendorData?.vendordata?.email : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Phone Number</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.vendordata?.phoneno ? vendorData?.vendordata?.phoneno : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Note</Typography>
                <Typography style={{ color: 'black' }}>{vendorData?.note ? vendorData?.note : 'N/A'}</Typography>
              </Grid>
            </Grid>

           



           
          </Item>
        </Grid>
      </Box>
    </>
  );
}

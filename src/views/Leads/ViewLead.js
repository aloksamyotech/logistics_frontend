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

export default function ViewLead() {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState([]); 
  const { id } = useParams();
  console.log('id found in view leads ==>', id);

  const fetchLeadData = async () => {
    try {
      const response = await getApi(`/lead/getlead/${id}`);
      console.log('response =====>', response);
      setLeadData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeadData();
  }, []);

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
              <Typography variant="h4">Lead Basic Information</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Name</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.name ? leadData?.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Email Id</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.email ? leadData?.email : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Type</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.type ? leadData?.type : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Forecast Close</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.forecastclose ? leadData?.forecastclose : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Phone Number</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.contact ? leadData?.contact : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Source</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.source ? leadData?.source : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Region</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.region ? leadData?.region : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Country</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.country ? leadData?.country : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Potential Opportunity</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.potentialopportunity ? leadData?.potentialopportunity : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Chance sale</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.chancesale ? leadData?.chancesale : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Weighted Forecast</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.weightedforecast ? leadData?.weightedforecast : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Query</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.query ? leadData?.query : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Pickup Pincode</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.pickuppincode ? leadData?.pickuppincode : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Delivery Pincode</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.deliverypincode ? leadData?.deliverypincode : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Consignment Description</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.consignmentDescription ? leadData?.consignmentDescription : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Weight</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.weight ? leadData?.weight : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Dimension</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.dimension ? leadData?.dimension : 'N/A'}</Typography>
              </Grid>
              {/* <Grid item xs={6} md={6}>
                <Typography variant="h5">Weight</Typography>
                <Typography style={{ color: 'black' }}>{leadData?.weight ? leadData?.weight : 'N/A'}</Typography>
              </Grid> */}
            </Grid>



           
          </Item>
        </Grid>
      </Box>
    </>
  );
}

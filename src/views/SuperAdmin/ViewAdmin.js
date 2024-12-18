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

export default function ViewAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]); 
  const { id } = useParams();
  console.log('id ==>', id);

  const fetchAdminData = async () => {
    try {
      const response = await getApi(`/user/getuser/${id}`);
      console.log('response ==>', response);
      setAdminData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdminData();
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
              <Typography variant="h4">Admin Basic Information</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Company Name</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.companyname ? adminData?.companyname : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Email Id</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.email ? adminData?.email : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Name</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.name ? adminData?.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Phone Number</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.phoneno ? adminData?.phoneno : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Address</Typography>
                <Typography style={{ color: 'black' }}>{adminData?.address ? adminData?.address : 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}

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
import { getApi } from 'views/services/api';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ViewQuotesDetails() {
  const navigate = useNavigate();
  const [quote, setQuoteData] = useState({});

  const { id } = useParams();
  console.log('id ==>', id);

  const fetchQuoteData = async () => {
    try {
      const response = await getApi(`/quote/getquotedetails/${id}`);
      console.log('response =================>', response);
      setQuoteData(response?.data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuoteData();
  }, []);

  console.log('quote ===========>', quote);

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
              <Typography variant="h4">Quote Basic Information</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            <hr />

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Customer Name</Typography>
                <Typography style={{ color: 'black' }}>{quote?.customerdata?.name ? quote.customerdata.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Quotation Number</Typography>
                <Typography style={{ color: 'black' }}> {quote?.quotationNo ? quote?.quotationNo : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Date</Typography>
                <Typography style={{ color: 'black' }}> {quote?.date ? moment(quote.date).format('DD-MM-YYYY') : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Form</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.from ? quote.quotedata.from : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">To</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.to ? quote?.quotedata?.to : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Description :</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.description ? quote.quotedata.description : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Size</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.size ? quote.quotedata.size : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">weight</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.weight ? quote.quotedata.weight : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">ETA</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.ETA ? quote.quotedata.ETA : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Rate</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.rate ? quote.quotedata.rate : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h5">Advance</Typography>
                <Typography style={{ color: 'black' }}>{quote?.quotedata?.advance ? quote.quotedata.advance : 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </>
  );
}

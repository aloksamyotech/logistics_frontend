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
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ViewExpenses() {
  const navigate = useNavigate();
  const [expense, setExpenseData] = useState([{}]); 

  const { id } = useParams();
  console.log('id ==>', id);

  const fetchExpensesData = async () => {
    try {
      const response = await getApi(`/expense/getoneexpense/${id}`);
      console.log('response =================>', response);
      setExpenseData(response?.data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpensesData();
  }, []);

  console.log("expense ==>",expense);
  

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
              <Typography variant="h4">Expense Basic Information</Typography>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} color="primary" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            <hr />

             <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Expense Category Name</Typography>
                <Typography style={{ color: 'black' }}>{expense?.expenseCategory?.name ? expense.expenseCategory.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Expense Direction</Typography>
                <Typography style={{ color: 'black' }}> {expense?.expenseCategory?.description ? expense.expenseCategory.description : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Name</Typography>
                <Typography style={{ color: 'black' }}>{expense?.name ? expense.name : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Note</Typography>
                <Typography style={{ color: 'black' }}>{expense?.note ? expense.note : 'N/A'}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'between', alignItems: 'center', marginTop: '1px' }}>
              <Grid item xs={6} md={6}>
              <Typography variant="h5">Amount</Typography>
              <Typography style={{ color: 'black' }}>{expense?.amount ? expense.amount : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5">Date</Typography>
                <Typography style={{ color: 'black' }}>{expense?.date ? moment(expense.date).format('DD-MM-YYYY') : 'N/A'}</Typography>
              </Grid>
            </Grid> 
          </Item>
        </Grid>
      </Box>
    </>
  );
}

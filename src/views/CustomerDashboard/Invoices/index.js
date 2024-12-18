import React from 'react';
import { Box, Typography, Stack, Grid, Card } from '@mui/material';
import OutStandingInvoices from './outstandingInvoice';
import PaidInvoice from './paidInvoice';
import TotalInvoice from './totalInvoice';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const Invoices = () => {
    const leadData = [
        {
          id: 1,
          name: 'Jonny Doe',
          email: 'jonny@gmail.com',
          phone: '9981923587'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '9876543210'
        }
      ];
    const columns = [
        {
          field: 'id',
          headerName: 'Id'
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell name-column--cell--capitalize'
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
          cellClassName: 'name-column--cell--capitalize'
        },
        {
          field: 'phone',
          headerName: 'Phone',
          flex: 1
        },
        
      ];
  return (
    <>
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        padding: '20px',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Grid container spacing={5}>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <OutStandingInvoices  isLoading={false} />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <PaidInvoice isLoading={false} />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <TotalInvoice isLoading={false} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }} width="100%">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Invoice Details
        </Typography>
        <Card sx={{ height: 'auto'}}>
          <DataGrid
            rows={leadData}
            columns={columns}
            // checkboxSelection
            // getRowId={(row) => row.id}
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{ toolbar: { showQuickFilter: true } }}
          />
        </Card>

        {/* <InvoicesTable /> */}
      </Box>
    </Box>
    </>
  );
};

export default Invoices;

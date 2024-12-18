import React from 'react';
import { Box, Typography, Grid, Card, TextField, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { RequestQuote } from '@mui/icons-material';

const RequestQuotes = () => {
  const leadData = [
    {
      id: 1,
      date: 'Jonny Doe',
      status: 'jonny@gmail.com',
      location: '9981923587'
    }
  ];
  const columns = [
    {
      field: 'id',
      headerName: 'Id'
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1
    }
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
        <Box width="100%">
          <Stack direction="row" flex={1} justifyContent="flex-end" spacing={2}>
            <TextField name="date" value={''} type='date' variant="outlined" size="small" />
            <Button variant="contained">Search</Button>
          </Stack>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Quotetion Details
          </Typography>
          <Card sx={{ height: 'auto' }}>
            <DataGrid
              rows={leadData}
              columns={columns}
              // checkboxSelection
              // getRowId={(row) => row.id}
              // components={{ Toolbar: GridToolbar }}
              // componentsProps={{ toolbar: { showQuickFilter: true } }}
            />
          </Card>

          <Stack direction="row" flex={1} justifyContent="flex-start" spacing={2} sx={{mt : 2}}>
            <Button variant="contained">Add</Button>
            <Button variant="contained">Return to Dashborad</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default RequestQuotes;

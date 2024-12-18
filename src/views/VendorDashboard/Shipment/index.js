import React from 'react';
import { Box, Typography, Grid, Card, TextField, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { RequestQuote } from '@mui/icons-material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const Shipment = () => {
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
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1cc88a' }}
              startIcon={<CloudDownloadIcon />}
              // onClick={handleOpenAdd} // Uncomment if needed
            >
              Excel
            </Button>
          </Stack>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipment Details
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

         
        </Box>
      </Box>
    </>
  );
};

export default Shipment;

import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import TableStyle from 'ui-component/TableStyle';
import Iconify from 'ui-component/iconify/Iconify';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from 'views/Quotes/Searchbar';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';

// ----------------------------------------------------------------------

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
  // Add more data as needed
];

const ShowVendorPayments = () => {
  // State to manage the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete clicked for:', selectedRow);
    handlePopoverClose();
  };

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: t('Id') // Use translation for "Id"
    },
    {
      field: 'name',
      headerName: t('Name'), // Use translation for "Name"
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: t('Email'), // Use translation for "Email"
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phone',
      headerName: t('Phone'), // Use translation for "Phone"
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Action'), // Use translation for "Action"
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) => handlePopoverOpen(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      )
    }
  ];

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')} {/* Use translation for "Dashboard" */}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Payment')} {/* Use translation for "Payment" */}
    </Typography>
  ];

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <card>
        <Container
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0.5
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.3rem' }}>
              {t('Vendor Payment')} {/* Use translation for "Vendor Payment" */}
            </Typography>
            <Stack spacing={2}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Stack>
        </Container>
      </card>
      <Box mt={2}>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <SearchBar></SearchBar>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#e02d1b', width: 10, height: 25 }}
                  startIcon={<SimCardDownloadIcon />}
                >
                  {t('PDF')} {/* Use translation for "PDF" */}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#1cc88a', width: 10, height: 25 }}
                  startIcon={<CloudDownloadIcon />}
                >
                  {t('Excel')}
                </Button>
              </Stack>
              <DataGrid rows={leadData} columns={columns} getRowId={(row) => row.id} />
            </Card>
          </Box>
        </TableStyle>

        {/* Popover for Action Menu */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} />
            {t('Edit')} {/* Use translation for "Edit" */}
          </MenuItem>
          <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1, color: 'green' }} />
            {t('View')} {/* Use translation for "View" */}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1, color: 'red' }} />
            {t('Delete')} {/* Use translation for "Delete" */}
          </MenuItem>
        </Popover>
      </Box>
    </>
  );
};

export default ShowVendorPayments;

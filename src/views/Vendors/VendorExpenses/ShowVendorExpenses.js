import React from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import AddVendorExpenses from './AddVendorExpenses';
import Iconify from 'ui-component/iconify/Iconify';
import TableStyle from 'ui-component/TableStyle';
import { getApi } from 'views/services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteVendorExpense from './DeleteVendorExpense';
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
];

const ShowVendorExpenses = () => {
  // State to manage the popover
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [vendorExpenseData, setVendorExpenseData] = useState([]);

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    console.log('Edit clicked for:', selectedRow);
    if (selectedRow) {
      setOpenAdd(true);
    }
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for =====>', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view_vendor_details/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete clicked for:', selectedRow);
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchVendorData = async () => {
    try {
      getApi(`/vendor/getallvendor_expense/${user._id}`)
        .then((response) => {
          console.log('response =============>', response);
          setVendorExpenseData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, [open, openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'vendordata.name',
      headerName: t('Vendor Name'),
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => <Typography>{params.row.vendordata ? params.row.vendordata.name : 'N/A'}</Typography>
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1
    },
    {
      field: 'amount',
      headerName: t('Amount'),
      flex: 1
    },
    {
      field: 'note',
      headerName: t('Note'),
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Action'),
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

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Expenses')}
    </Typography>
  ];

  return (
    <>
      <AddVendorExpenses open={open} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeleteVendorExpense open={openDelete} handleClose={handleCloseDelete} vendorid={selectedRow?._id} />

      {/* <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between"> */}
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
              {t('Vendor Expenses')}
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
          <Box width="100%" mt={2}>
            <Card sx={{ height: 600 }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <SearchBar></SearchBar>
                <Button
                  size="small"
                  sx={{ width: 190, height: 25 }}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleOpenAdd} // Uncomment if needed
                >
                  {t('Add Expenses')}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#e02d1b', width: 10, height: 25 }}
                  startIcon={<SimCardDownloadIcon />}
                  // onClick={handleOpenAdd} // Uncomment if needed
                >
                  {t('PDF')}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#1cc88a', width: 10, height: 25 }}
                  startIcon={<CloudDownloadIcon />}
                  // onClick={handleOpenAdd} // Uncomment if needed
                >
                  {t('Excel')}
                </Button>
              </Stack>
              {/* </Stack> */}
              <DataGrid
                rows={vendorExpenseData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                // components={{ Toolbar: GridToolbar }}
                // componentsProps={{ toolbar: { showQuickFilter: true } }}
              />
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
            {t('Edit')}
          </MenuItem>
          <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1, color: 'green' }} />
            {t('View')}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1, color: 'red' }} />
            {t('Delete')}
          </MenuItem>
        </Popover>
      </Box>
    </>
  );
};

export default ShowVendorExpenses;

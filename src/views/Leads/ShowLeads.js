import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from 'ui-component/TableStyle';
import Iconify from 'ui-component/iconify/Iconify';
import AddLeads from './AddLeads';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import DeleteLead from './deleteLead';
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

const ShowLeads = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===>', user);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [leadData, setLeadData] = useState([]);

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
    // Implement edit functionality
    console.log('Edit clicked for:', selectedRow);
    setOpenAdd(true);
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view_leads/${selectedRow._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete clicked for:', selectedRow);
    setOpenDelete(true);
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: t('Email'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'contact',
      headerName: t('Phone'),
      flex: 1
    },
    {
      field: 'source',
      headerName: t('Source'),
      flex: 1
    },
    {
      field: 'potentialopportunity',
      headerName: t('Potential Opportunity'),
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

  const fetchLeadData = async () => {
    try {
      getApi(`/lead/getallleads/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setLeadData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchLeadData();
  }, [open, openDelete]);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Leads')}
    </Typography>
  ];

  return (
    <>
      <AddLeads open={open} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeleteLead open={openDelete} handleClose={handleCloseDelete} leadid={selectedRow?._id} />
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
              {t('Leads')}
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
                  sx={{ width: 190, height: 25 }}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleOpenAdd}
                >
                  {t('Add Lead')}
                </Button>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
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
              </Stack>

              <DataGrid
                rows={leadData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                componentsProps={{ toolbar: { showQuickFilter: true } }}
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

export default ShowLeads;

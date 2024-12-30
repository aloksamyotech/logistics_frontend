import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditStaff from './EditStaff';
import DeleteCustomer from 'views/Customer/DeleteCustomer';
import HomeIcon from '@mui/icons-material/Home';
import { text } from '@fortawesome/fontawesome-svg-core';
import SearchBar from 'views/Quotes/Searchbar';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';
// ----------------------------------------------------------------------

const StaffList = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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
      setOpenEdit(true);
    }
    handlePopoverClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    handlePopoverClose();
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for:', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view_customer/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const fetchStaffData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setStaffData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [openEdit, openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'role',
      headerName: t('Role'),
      flex: 1
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: t('Email'),
      flex: 1
    },
    {
      field: 'phoneno',
      headerName: t('Phone Number'),
      flex: 1
    },
    {
      field: 'usernote',
      headerName: t('User Note'),
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

  const breadcrumbs = [
    <Link underline="hover" key={1} color={'inherit'}>
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key={2} color={'inherit'} to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Link underline="hover" key={3} sx={{ color: 'text.primary' }}>
      {t('StaffList')}
    </Link>
  ];

  return (
    <>
      <DeleteCustomer open={openDelete} handleClose={handleCloseDelete} customerid={selectedRow?._id} />
      <EditStaff open={openEdit} handleClose={handleCloseEdit} data={selectedRow} />

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
              {t('Staff List')}
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
                <SearchBar />
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#1cc88a', width: 10, height: 25 }}
                  startIcon={<CloudDownloadIcon />}
                >
                  {t('Excel')}
                </Button>
              </Stack>
              <DataGrid rows={staffData} columns={columns} checkboxSelection getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>

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

export default StaffList;

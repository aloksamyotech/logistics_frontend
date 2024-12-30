import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { getApi } from 'views/services/api';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedRow) {
      setEditOpen(true);
    }
    handlePopoverClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleView = () => {
    navigate(`/admin/view_customer/${selectedRow?._id}`);
    handlePopoverClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setDeleteOpen(true);
    }
    handlePopoverClose();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const fetchCustomerData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          const filterData = response.data.data.filter((user) => user.role === 'Customer');
          setCustomerData(filterData);
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [editOpen, deleteOpen]);

  const columns = [
    {
      field: 'companyname',
      headerName: t('companyName'),
      flex: 1
    },
    {
      field: 'name',
      headerName: t('name'),
      flex: 1
    },
    {
      field: 'email',
      headerName: t('email'),
      flex: 1
    },
    {
      field: 'phoneno',
      headerName: t('phoneNo'),
      flex: 1
    },
    {
      field: 'status',
      headerName: t('status'),
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params?.value === 1 ? '#01B574' : 'red',
            color: 'white',
            padding: '4px',
            borderRadius: '5px'
          }}
        >
          {params?.value === 1 ? t('active') : t('inactive')}
        </Box>
      )
    },
    {
      field: 'action',
      headerName: t('action'),
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handlePopoverOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      )
    }
  ];

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={RouterLink} to="/admin/dashboard">
      {t('dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('List')}
    </Typography>
  ];

  return (
    <>
      <EditCustomer open={editOpen} handleClose={handleEditClose} data={selectedRow} />
      <DeleteCustomer
        open={deleteOpen}
        handleClose={handleDeleteClose} // Ensure this is passed properly
        customerid={selectedRow?._id} // Pass the selected row's ID
      />
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
            {t('Customer List')}
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Stack>
      </Container>
      <Box mt={2}>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600 }}>
              <DataGrid
                rows={customerData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{ toolbar: { showQuickFilter: true } }}
              />
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
            {t('edit')}
          </MenuItem>
          <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1, color: 'green' }} />
            {t('view')}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1, color: 'red' }} />
            {t('delete')}
          </MenuItem>
        </Popover>
      </Box>
    </>
  );
};

export default CustomerList;

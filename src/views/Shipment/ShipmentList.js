import React from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { shipment } from 'menu-items/dashboard';
import { getApi } from 'views/services/api';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Link as RouterLink } from 'react-router-dom';
import { Try } from '@mui/icons-material';
import axios from 'axios';
import EditShipmentDialog from './EditShipmentDialog'; // Import EditShipmentDialog
import DeleteShipment from './Deleteshipment';
import { t } from 'i18next';
const ShipmentList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([{}]);
  const [shipments, setShipments] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

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

  const handleUpdate = (updatedShipment) => {
    setShipments((prevShipments) => prevShipments.map((shipment) => (shipment._id === updatedShipment._id ? updatedShipment : shipment)));
  };
  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    if (selectedRow) {
      navigate(`/admin/shipment_details/${selectedRow?._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    if (selectedRow) {
      setDeleteOpen(true);
    }
    handlePopoverClose();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const fetchShipmentData = async () => {
    try {
      getApi(`/shipment/allshipments_details/${user._id}`)
        .then((response) => {
          console.log('all shipments here ======>', response);
          setShipments(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.error('Error fetching shipment data:', error);
    }
  };

  useEffect(() => {
    fetchShipmentData();
  }, [openDelete, editOpen]);

  const columns = [
    { field: 'sender_name', headerName: 'Sender Name', flex: 1 },
    { field: 'receiver_name', headerName: 'Receiver Name', flex: 1 },
    { field: 'shipmentdate', headerName: 'Shipment Date', flex: 1 },
    { field: 'expectedDeliveryDate', headerName: 'Expected Date', flex: 1 },
    { field: 'package_pickup_address', headerName: 'Pickup Address', flex: 1 },
    { field: 'deliveryAddress', headerName: 'Delivery Address', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.5,
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
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('List')}
    </Typography>
  ];

  return (
    <>
      <DeleteShipment open={openDelete} handleClose={handleDeleteClose} shipmentid={selectedRow?._id}></DeleteShipment>

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
            {t('Shipment List')}
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
                rows={shipments}
                columns={columns}
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
      {selectedRow && (
        <EditShipmentDialog open={editOpen} onClose={() => setEditOpen(false)} shipmentData={selectedRow} onUpdate={handleUpdate} />
      )}
    </>
  );
};

export default ShipmentList;

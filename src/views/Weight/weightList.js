import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import Iconify from '../../ui-component/iconify';
import AddWeightPrice from './Addweight.js';
import { getApi } from 'views/services/api';
import DeleteWeightPrice from './DeleteWeight.js';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from 'views/Quotes/Searchbar';
import { t } from 'i18next';
import { Link as RouterLink } from 'react-router-dom';
const WeightPriceList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [weightPriceData, setWeightPriceData] = useState([]);

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenAdd(true);
    handlePopoverClose();
  };

  const handleView = () => {
    handlePopoverClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchWeightPriceData = async () => {
    try {
      getApi(`/weightprice/getallweightprice/${user._id}`)
        .then((response) => {
          setWeightPriceData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeightPriceData();
  }, [openAdd, openDelete]);

  const columns = [
    {
      field: 'min_weight',
      headerName: t('Min Weight'),
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'max_weight',
      headerName: t('Max Weight'),
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'price',
      headerName: t('Price'),
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton aria-label={t('More')} onClick={(event) => handlePopoverOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      )
    }
  ];

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Weight Price List')}
    </Typography>
  ];

  return (
    <>
      <AddWeightPrice open={openAdd} handleClose={handleCloseAdd} editData={selectedRow} />
      <DeleteWeightPrice open={openDelete} handleClose={handleCloseDelete} weightPriceId={selectedRow?._id} />

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
            {t('Weight Price List')}
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
              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} padding={0.1}>
                <SearchBar />
                <Button
                  size="small"
                  sx={{ width: 100, height: 25 }}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleOpenAdd}
                >
                  {t('Add')}
                </Button>
              </Stack>
              <DataGrid rows={weightPriceData} columns={columns} checkboxSelection getRowId={(row) => row._id} />
            </Card>
          </Box>
        </TableStyle>
      </Box>

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
    </>
  );
};

export default WeightPriceList;

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from 'ui-component/TableStyle';
import Iconify from 'ui-component/iconify/Iconify';
import AddAdmin from './AddAdmin';
import EditAdmin from './EditAdmin';
import { getApi } from 'views/services/api';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import DeleteAdmin from './DeleteAdmin';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from 'views/Quotes/Searchbar';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';

// ----------------------------------------------------------------------

const SuperAdmin = () => {
  // State to manage the popover

  const params = useParams();
  console.log('params ==>', params._id);

  // const leadId = params.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [adminData, setAdminData] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user ===>', user);

  const navigate = useNavigate();

  // Function to handle opening the popover
  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    console.log('selected row =>', row);
  };

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  // Click handlers for menu items
  const handleEdit = () => {
    console.log('on handleEdit seleted row==>', selectedRow);
    if (selectedRow) {
      setOpenEdit(true);
    }
    handlePopoverClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleView = () => {
    // Implement view functionality
    console.log('View clicked for==>', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view/${selectedRow._id}`);
    }
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('on handleDelete seleted row==>', selectedRow);
    if (selectedRow) {
      setOpenDelete(true);
    }
    handlePopoverClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'companyname',
      headerName: t('Company Name'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: t('Email'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phoneno',
      headerName: t('Phone No'),
      flex: 1
    },
    {
      field: 'status',
      headerName: t('Status'),
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={
              params?.value == 1
                ? {
                    backgroundColor: '#01B574',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
                : {
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px',
                    borderRadius: '5px'
                  }
            }
          >
            {params?.value === 1 ? 'Active' : 'Inactive'}
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
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

  const fetchSuperAdminData = async () => {
    try {
      getApi(`/user/getalluser_byId/${user._id}`)
        .then((response) => {
          console.log('response ==>', response);
          setAdminData(response.data.data);
          console.log('response.data.data ==>,response.data.data');
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };
  console.log('adminData ==>', adminData);

  useEffect(() => {
    fetchSuperAdminData();
  }, [open, openEdit, openDelete]);

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
      {t('Admin List')}
    </Typography>
  ];

  return (
    <>
      <AddAdmin open={open} handleClose={handleCloseAdd} />
      <EditAdmin open={openEdit} handleClose={handleCloseEdit} data={selectedRow} />
      <DeleteAdmin open={openDelete} handleClose={handleCloseDelete} data={selectedRow} />
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
              {t('Admin List')}
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
                  sx={{ width: 150, height: 25 }}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleOpenAdd} // Uncomment if needed
                >
                  {t('Add Admin')}
                </Button>
              </Stack>
              <DataGrid
                rows={adminData}
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

export default SuperAdmin;

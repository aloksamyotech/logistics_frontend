import React from 'react';
import { Stack, Button, Container, Typography, Box, Card, IconButton, Popover, MenuItem, Link, Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';
import { getApi } from 'views/services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditQuote from './EditQuote';
import DeleteQuote from './DeleteQuote';
import SearchBar from './Searchbar';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';
// ----------------------------------------------------------------------

const QuotesList = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  // State to manage the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [quotesData, setQuotesData] = useState([]);
  const [openEdit, setEditOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

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
    console.log('Edit clicked ============>', selectedRow);
    if (selectedRow) {
      setEditOpen(true);
    }
    handlePopoverClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    if (selectedRow) {
      navigate(`/admin/view_quote_details/${selectedRow?._id}`);
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

  const fetchQuotesData = async () => {
    try {
      getApi(`/quote/getallquotes/${user._id}`)
        .then((response) => {
          console.log('all quotes here ======>', response);
          setQuotesData(response.data.data);
        })
        .catch((error) => {
          console.log('error ==>', error);
        });
    } catch (error) {
      console.log('error ==>', error);
    }
  };
  console.log('quotesData ==>', quotesData);

  useEffect(() => {
    fetchQuotesData();
  }, [openEdit, openDelete]);

  // Columns definition for DataGrid
  const columns = [
    {
      field: 'quotationNo',
      headerName: t('Quotation Number'),
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'customerdata.name',
      headerName: t('Customer Name'),
      flex: 1,
      renderCell: (params) => <Typography>{params.row.customerdata ? params.row.customerdata.name : 'N/A'}</Typography>
    },
    {
      field: 'from',
      headerName: t('From'),
      flex: 1,
      renderCell: (params) => <Typography>{params.row.quotedata ? params.row.quotedata.from : 'N/A'}</Typography>
    },
    {
      field: 'to',
      headerName: t('To'),
      flex: 1,
      renderCell: (params) => <Typography>{params.row.quotedata ? params.row.quotedata.to : 'N/A'}</Typography>
    },
    {
      field: 'status',
      headerName: t('Status'),
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

  // Breadcrumbs with dynamic translations
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      <HomeIcon color="secondary" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('List')}
    </Typography>
  ];

  return (
    <>
      <EditQuote open={openEdit} handleClose={handleEditClose} data={selectedRow} />
      <DeleteQuote open={openDelete} handleClose={handleDeleteClose} quoteid={selectedRow?._id} />

      <Card>
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
              {t('Quotation List')}
            </Typography>
            <Stack spacing={2}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Stack>
        </Container>
      </Card>
      <TableStyle>
        <Box width="100%" mt={2}>
          <Card sx={{ height: 600 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <SearchBar></SearchBar>
              <Stack sx={{ padding: 0.3 }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#1cc88a', width: 10, height: 25 }}
                  startIcon={<CloudDownloadIcon />}
                >
                  {t('Excel')}
                </Button>
              </Stack>
            </Stack>
            <DataGrid rows={quotesData} columns={columns} getRowId={(row) => row._id} />
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
    </>
  );
};

export default QuotesList;

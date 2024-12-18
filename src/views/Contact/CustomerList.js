// /* eslint-disable react/prop-types */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from 'react';
// // @mui
// import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
// import TableStyle from '../../ui-component/TableStyle';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// import Iconify from '../../ui-component/iconify';
// import AddContact from './AddContact';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// // ----------------------------------------------------------------------

// const leadData = [
//   {
//     id: 1,
//     name: 'jonny doe',
//     email: 'jonny@gmail.com',
//     phone: '9981923587',
//     location: 'abc road xyz city',
//     action: 'Edit'
//   }
// ];
// const CustomerList = () => {
//   const [openAdd, setOpenAdd] = useState(false);
//   const columns = [
//     {
//       field: 'name',
//       headerName: 'Name',
//       flex: 1,
//       cellClassName: 'name-column--cell name-column--cell--capitalize'
//     },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       cellClassName: 'name-column--cell--capitalize'
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone',
//       flex: 1
//     },
//     {
//       field: 'location',
//       headerName: 'Location',
//       flex: 1
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       flex: 1
//     }
//   ];

//   const handleOpenAdd = () => setOpenAdd(true);
//   const handleCloseAdd = () => setOpenAdd(false);
//   return (
//     <>
//       <Container>
//         <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
//           <Typography variant="h4">Customer-Management</Typography>
//           <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
//             <Button variant="contained" sx={{backgroundColor : '#1cc88a'}} startIcon={<CloudDownloadIcon/>} onClick={handleOpenAdd}>
//               Excel
//             </Button>
//           </Stack>
//         </Stack>
//         <TableStyle>
//           <Box width="100%">
//             <Card style={{ height: '600px', paddingTop: '15px' }}>
//               <DataGrid
//                 rows={leadData}
//                 columns={columns}
//                 checkboxSelection
//                 getRowId={(row) => row.id}
//                 slots={{ toolbar: GridToolbar }}
//                 slotProps={{ toolbar: { showQuickFilter: true } }}
//               />
//             </Card>
//           </Box>
//         </TableStyle>
//       </Container>
//     </>
//   );
// };

// export default CustomerList;



/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  IconButton,
  Popover,
  MenuItem
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../ui-component/TableStyle';

// ----------------------------------------------------------------------

const leadData = [
  {
    id: 1,
    name: 'Jonny Doe',
    email: 'jonny@gmail.com',
    phone: '9981923587',
    location: 'ABC Road, XYZ City'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
    location: '123 Main St, Anytown'
  }
  // Add more data as needed
];

const CustomerList = () => {
  // State to manage the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

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
        headerName: 'Id',
  
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1
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

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          mb={5}
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
              Customer List
            </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1cc88a' }}
              startIcon={<CloudDownloadIcon />}
              // onClick={handleOpenAdd} // Uncomment if needed
            >
            Excel
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card sx={{ height: 600,}}>
              <DataGrid
                rows={leadData}
                columns={columns}
                // checkboxSelection
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
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
            Edit
          </MenuItem>
          <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1, color: 'green' }} />
            View
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1, color: 'red' }} />
            Delete
          </MenuItem>
        </Popover>
      </Container>
    </>
  );
};

export default CustomerList;


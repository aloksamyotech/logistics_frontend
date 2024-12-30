import React, { useState } from 'react';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Popover,
  MenuItem,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Link,
  Breadcrumbs
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { t } from 'i18next';

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

const GeneralReport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpenAdd] = useState(false);
  const [tabValue, setTabValue] = useState('1');

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleView = () => {
    console.log('View clicked for:', selectedRow);
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedRow);
    handlePopoverClose();
  };

  const columns = [
    {
      field: 'id',
      headerName: t('Id'),
      width: 90
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1
    },
    {
      field: 'email',
      headerName: t('Email'),
      flex: 1
    },
    {
      field: 'phone',
      headerName: t('Phone'),
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

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const breadcrumbs = [
    <Link underline="hover" key={1} color={'inherit'}>
      <HomeIcon color="primary"></HomeIcon>
    </Link>,
    <Link underline="hover" key={2} color={'inherit'} to="/admin/dashboard" component={RouterLink}>
      {t('Dashboard')}
    </Link>,
    <Link underline="hover" key={3} sx={{ color: 'text.primary' }}>
      {t('Reports')}
    </Link>
  ];
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
              {t('Exprenses')}
            </Typography>
            <Stack spacing={2}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Stack>
        </Container>
      </card>
      <Box mt={2} sx={{ p: 2, backgroundColor: '#fff', borderRadius: '5px', boxShadow: 'inherit' }}>
        <TabContext value={tabValue}>
          <TabList onChange={handleChange} aria-label="report tabs">
            <Tab label={t('Reports')} value="1" />
            <Tab label={t('Payment Log')} value="2" />
          </TabList>
          <TabPanel value="1">
            {/* Design from the image in the first tab */}
            <Card>
              <Box p={2}>
                <Stack direction="row" spacing={1} justifyContent="right">
                  <Button variant="contained" color="error">
                    {t('PDF')}
                  </Button>
                  <Button variant="contained" color="success">
                    {t('Excel')}
                  </Button>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="right" sx={{ pt: 3, m: 0 }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>{t('Time')}</InputLabel>
                    <Select label="Time" defaultValue="This year Finar">
                      <MenuItem value="This year Finar">{t('This year Finar')}</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>{t('Status')}</InputLabel>
                    <Select label="Status" defaultValue="All">
                      <MenuItem value="All">{t('All')}</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>{t('Sender')}</InputLabel>
                    <Select label="Sender" defaultValue="All">
                      <MenuItem value="sender 1">{t('ender 1')}</MenuItem>
                      <MenuItem value="sender 2">{t('ender 2')}</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Stack>

                {/* <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Time</InputLabel>
                    <Select label="Time" defaultValue="This year Finar">
                      <MenuItem value="This year Finar">This year Finar</MenuItem>
                     
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" defaultValue="All">
                      <MenuItem value="All">All</MenuItem>
                     
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>sender</InputLabel>
                    <Select label="Sender" defaultValue="All">
                      <MenuItem value="sender 1">ender 1</MenuItem>
                      <MenuItem value="sender 2">ender 2</MenuItem>
                      
                    </Select>
                  </FormControl> */}
              </Box>
            </Card>
          </TabPanel>
          <TabPanel value="2">
            {/* Table in the second tab */}
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={leadData} columns={columns} pageSize={5} />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default GeneralReport;

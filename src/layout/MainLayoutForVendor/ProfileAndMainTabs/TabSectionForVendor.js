import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Shipment from 'views/VendorDashboard/Shipment';
import EditVendorProfile from 'views/VendorDashboard/EditVendorProfile';

const TabSectionForVendor = () => {
  const [value, setValue] = useState('1');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Navigate to the corresponding route
    if (newValue === '1') navigate('/vendor/shipment');
    if (newValue === '2') navigate('/vendor/edit/profile');
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#fff'
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="dashboard tabs">
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <CurrencyRupeeIcon sx={{ marginRight: 1 }} /> */}
                  Shipment
                </Box>
              }
              value="1"
            />
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <ReceiptLongIcon sx={{ marginRight: 1 }} /> */}
                  Edit
                </Box>
              }
              value="2"
            />
          </TabList>
        </Box>

        {/* Render the components based on the route */}
        <TabPanel value="1">
          <Shipment />
        </TabPanel>
        <TabPanel value="2">
          <EditVendorProfile />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabSectionForVendor;

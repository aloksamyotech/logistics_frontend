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
import Invoices from 'views/CustomerDashboard/Invoices';
import Quotes from 'views/CustomerDashboard/Quotes';
import TrackShipment from 'views/CustomerDashboard/TrackShipment';
import RequestQuotes from 'views/CustomerDashboard/RequestQuotes';
// Import other components (Quotes, TrackShipment, RequestQuote) here

const TabSection = () => {
  const [value, setValue] = useState('1');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Navigate to the corresponding route
    if (newValue === '1') navigate('/customer/invoices');
    if (newValue === '2') navigate('/customer/quotes');
    if (newValue === '3') navigate('/customer/track/shipment');
    if (newValue === '4') navigate('/customer/quote/create');
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
        backgroundColor: '#fff',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="dashboard tabs">
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CurrencyRupeeIcon sx={{ marginRight: 1 }} />
                  Invoices
                </Box>
              }
              value="1"
            />
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ReceiptLongIcon sx={{ marginRight: 1 }} />
                  Quotes
                </Box>
              }
              value="2"
            />
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShippingIcon sx={{ marginRight: 1 }} />
                  Track Shipment
                </Box>
              }
              value="3"
            />
            <Tab
              iconPosition="start"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ marginRight: 1 }} />
                  Request Quote
                </Box>
              }
              value="4"
            />
          </TabList>
        </Box>

        {/* Render the components based on the route */}
        <TabPanel value="1">
         <Invoices/>
        </TabPanel>
        <TabPanel value="2">
          <Quotes/>
        </TabPanel>
        <TabPanel value="3">
          <TrackShipment/>
        </TabPanel>
        <TabPanel value="4">
          <RequestQuotes/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabSection;


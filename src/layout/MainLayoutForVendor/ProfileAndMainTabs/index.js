import React from 'react';
import { Grid, Box } from '@mui/material';
// import CustomerProfile from './ProfileSection';
// import TabSection from './TabSection';

import VendorProfile from './ProfileSection';
import TabSectionForVendor from './TabSectionForVendor';

const Vendordashboard = () => {
    return (
        <Box >
            <Grid container spacing={-5} >
                <Grid item xs={12} md={4}>
                    <VendorProfile />
                </Grid>
                <Grid item xs={12} md={8}>
                    <TabSectionForVendor />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Vendordashboard;

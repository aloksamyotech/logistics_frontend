import React from 'react';
import { Grid, Box } from '@mui/material';
import CustomerProfile from './ProfileSection';
import TabSection from './TabSection';

const Customerdashboard = () => {
    return (
        <Box >
            <Grid container spacing={-5} >
                <Grid item xs={12} md={4}>
                    <CustomerProfile />
                </Grid>
                <Grid item xs={12} md={8}>
                    <TabSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Customerdashboard;

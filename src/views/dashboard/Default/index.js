import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
//import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import { display, fontSize } from '@mui/system';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TotalSales from './TotalEarning';
import TotalShipment from './TotalShipment';
import PendingDelivery from './PendingDelivery';
import TotalQuotation from './TotalQutations';

import TotalCustomer from './TotalCustomer';
import PendingPayment from './PendingPayments';
import UpcomingExpenses from './UpcomingExpenses';
import FinancialEarning from './FinancialEarning';

import LastFinancialEarning from './LastFinancialEarning';
import ShipmentsOverview from './ShipmentOverview';
import PaymentReceived from './PaymentReceived';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid container item xs={12}>
        <Grid item xs={6} spacing={gridSpacing}>
          <Typography sx={{ fontSize: '2.3rem', fontFamily: 'inherit',color : '#5a5c69' }}>Dashboard</Typography>
        </Grid>
        {/* <Grid item xs={6}>
          <Grid sx={{ display: 'flex', mt: 2 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<LocalShippingRoundedIcon />}
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#e74a3b' }}
              >
                Create Shipment
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<PersonAddAltRoundedIcon />}
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#33ff74' }}
              >
                Create Customer
              </Button>
            </Grid>
          </Grid>

          <Grid sx={{ display: 'flex', mt: 2 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<NoteAltRoundedIcon />}
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#4169E1' }}
              >
                Create Quotes
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" startIcon={<AddRoundedIcon />} size="large" sx={{ fontSize: '1rem', backgroundColor: '#2a96a5' }}>
                Create Staff
              </Button>
            </Grid>
          </Grid>
        </Grid> */}

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<LocalShippingRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#e74a3b' }}
              >
                Create Shipment
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<PersonAddAltRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#33ff74' }}
              >
                Create Customer
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<NoteAltRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#4169E1' }}
              >
                Create Quotes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#2a96a5' }}
              >
                Create Staff
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalSales isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalShipment isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <PendingDelivery isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalQuotation isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalCustomer isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <PendingPayment isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <UpcomingExpenses isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <FinancialEarning isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <LastFinancialEarning isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
            <ShipmentsOverview/>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
            <PaymentReceived/>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 }
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          </Grid>
        </Grid>
      </Grid> */}

      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={5}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />
                }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' }
              ]}
            />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;

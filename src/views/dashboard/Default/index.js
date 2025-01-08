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
import { t } from 'i18next';
import { useNavigate } from 'react-router';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleButtonClick = () => {
    navigate('/admin/shipment/add'); // Navigate to CreateShipment component
  };
  const handelecreatcustomer = () => {
    navigate('/admin/customer/add');
  };
  const handelcreateQuate = () => {
    navigate('/admin/quotes/add');
  };
  const handelcreatestaff = () => {
    navigate('/admin/staff/add');
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid container item xs={12}>
        <Grid item xs={6} spacing={gridSpacing}>
          <Typography sx={{ fontSize: '2.3rem', fontFamily: 'inherit', color: '#5a5c69' }}>{t('Dashboard')}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<LocalShippingRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#e74a3b' }}
                onClick={handleButtonClick}
              >
                {t('Create Shipment')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<PersonAddAltRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#33ff74' }}
                onClick={handelecreatcustomer}
              >
                {t('Create Customer')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<NoteAltRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#4169E1' }}
                onClick={handelcreateQuate}
              >
                {t(' Create Quotes')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                fullWidth
                size="large"
                sx={{ fontSize: '1rem', backgroundColor: '#2a96a5' }}
                onClick={handelcreatestaff}
              >
                {t(' Create Staff ')}
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
            <ShipmentsOverview />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
            <PaymentReceived />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { t } from 'i18next';
import { getApi } from 'views/services/api';
import { useEffect } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2),
  borderLeft: `5px solid #f6c23e`,
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(0)
  }
}));

const TotalCustomer = ({ isLoading }) => {
  const theme = useTheme();
  const [customer, setTotalcustomer] = useState([]);
  const countCustomer = async () => {
    try {
      const response = await getApi('/counterCustomer');
      if (response) {
        console.log(response, 'response is coming or not');

        setTotalcustomer(response.data.data);
      }
    } catch (error) {
      throw new error(error);
    }
  };
  useEffect(() => {
    countCustomer();
  });

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box>
            <Grid container direction="column" sx={{ marginY: 2 }}>
              <Grid item>
                <Typography variant="h6" sx={{ color: '#f6c23e', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {t('TOTAL CUSTOMERS')}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={6} container direction="column">
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <CurrencyRupeeIcon fontSize="small" sx={{ color: '#5D3FD3' }} /> */}
                      <Typography variant="h6" sx={{ display: 'inline-block', fontSize: '1.2rem', fontWeight: 400, color: '#5a5c69' }}>
                        {customer}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container direction="column" alignItems="flex-end">
                    <PersonRoundedIcon
                      sx={{
                        color: '#D3D3D3',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        transform: 'scale(1.5)'
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalCustomer.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalCustomer;

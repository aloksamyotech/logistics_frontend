import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import AssignmentIcon from '@mui/icons-material/Assignment';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2),
  borderLeft: `5px solid #36b9cc`,
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(0)
  }
}));

const RejectedQuotes = ({ isLoading }) => {
//   const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} sx={{width : '200px', marginLeft : '100px'}}>
          <Box >
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#36b9cc',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  REJECTED QUOTES
                </Typography>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  {/* <CurrencyRupeeIcon fontSize="small" sx={{ color: '#5a5c69' }} /> */}
                  <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 400, color: '#5a5c69', marginLeft: 0.5 }}>
                    100
                  </Typography>
                </Box>
                <AssignmentIcon
                  sx={{
                    color: '#D3D3D3',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    transform: 'scale(1.5)'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

RejectedQuotes.propTypes = {
  isLoading: PropTypes.bool
};

export default RejectedQuotes;

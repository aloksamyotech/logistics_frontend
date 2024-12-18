import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';


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

const TotalQuotation = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box>
            <Grid container direction="column" sx={{ marginY : 2}}>
              <Grid item>
                <Typography variant="h6" sx={{ color: '#36b9cc', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  TOTAL QUOTATIONS
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={6} container >
                    <Typography variant="h6" sx={{display : 'flex', alignItems: 'center'}}>
                      {/* <CurrencyRupeeIcon fontSize="small" sx={{ color: '#5D3FD3' }} /> */}
                      <Typography variant="h6" sx={{ display: 'inline-block', fontSize: '1.2rem', fontWeight: 400, color: '#5a5c69' }}>
                       0
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container direction="column" alignItems="flex-end">
                    <TextSnippetRoundedIcon
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

TotalQuotation.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalQuotation;


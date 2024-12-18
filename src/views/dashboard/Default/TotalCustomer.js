// import PropTypes from 'prop-types';
// import { useState } from 'react';

// // material-ui
// import { useTheme, styled } from '@mui/material/styles';
// import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// // third-party
// import Chart from 'react-apexcharts';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// // assets
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.dark,
//   color: '#fff',
//   overflow: 'hidden',
//   position: 'relative',
//   '&>div': {
//     position: 'relative',
//     zIndex: 5
//   },
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.primary[800],
//     borderRadius: '50%',
//     zIndex: 1,
//     top: -85,
//     right: -95,
//     [theme.breakpoints.down('sm')]: {
//       top: -105,
//       right: -140
//     }
//   },
//   '&:before': {
//     content: '""',
//     position: 'absolute',
//     zIndex: 1,
//     width: 210,
//     height: 210,
//     background: theme.palette.primary[800],
//     borderRadius: '50%',
//     top: -125,
//     right: -15,
//     opacity: 0.5,
//     [theme.breakpoints.down('sm')]: {
//       top: -155,
//       right: -70
//     }
//   }
// }));

// // ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

// const TotalOrderLineChartCard = ({ isLoading }) => {
//   const theme = useTheme();

//   const [timeValue, setTimeValue] = useState(false);
//   const handleChangeTime = (event, newValue) => {
//     setTimeValue(newValue);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonTotalOrderCard />
//       ) : (
//         <CardWrapper border={false} content={false}>
//           <Box sx={{ p: 2.25 }}>
//             <Grid container direction="column">
//               <Grid item>
//                 <Grid container justifyContent="space-between">
//                   <Grid item>
//                     <Avatar
//                       variant="rounded"
//                       sx={{
//                         ...theme.typography.commonAvatar,
//                         ...theme.typography.largeAvatar,
//                         backgroundColor: theme.palette.primary[800],
//                         color: '#fff',
//                         mt: 1
//                       }}
//                     >
//                       <LocalMallOutlinedIcon fontSize="inherit" />
//                     </Avatar>
//                   </Grid>
//                   <Grid item>
//                     <Button
//                       disableElevation
//                       variant={timeValue ? 'contained' : 'text'}
//                       size="small"
//                       sx={{ color: 'inherit' }}
//                       onClick={(e) => handleChangeTime(e, true)}
//                     >
//                       Month
//                     </Button>
//                     <Button
//                       disableElevation
//                       variant={!timeValue ? 'contained' : 'text'}
//                       size="small"
//                       sx={{ color: 'inherit' }}
//                       onClick={(e) => handleChangeTime(e, false)}
//                     >
//                       Year
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item sx={{ mb: 0.75 }}>
//                 <Grid container alignItems="center">
//                   <Grid item xs={6}>
//                     <Grid container alignItems="center">
//                       <Grid item>
//                         {timeValue ? (
//                           <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$108</Typography>
//                         ) : (
//                           <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$961</Typography>
//                         )}
//                       </Grid>
//                       <Grid item>
//                         <Avatar
//                           sx={{
//                             ...theme.typography.smallAvatar,
//                             cursor: 'pointer',
//                             backgroundColor: theme.palette.primary[200],
//                             color: theme.palette.primary.dark
//                           }}
//                         >
//                           <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
//                         </Avatar>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Typography
//                           sx={{
//                             fontSize: '1rem',
//                             fontWeight: 500,
//                             color: theme.palette.primary[200]
//                           }}
//                         >
//                           Total Leads
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={6}>
//                     {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardWrapper>
//       )}
//     </>
//   );
// };

// TotalOrderLineChartCard.propTypes = {
//   isLoading: PropTypes.bool
// };

// export default TotalOrderLineChartCard;

// import PropTypes from 'prop-types';
// import { useState } from 'react';

// // material-ui
// import { useTheme, styled } from '@mui/material/styles';
// import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// // third-party
// import Chart from 'react-apexcharts';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// // assets
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   // backgroundColor: theme.palette.primary.dark,
//   // color: '#fff',
//   // overflow: 'hidden',
//   // position: 'relative',
//   // '&>div': {
//   //   position: 'relative',
//   //   zIndex: 5
//   // },
//   // '&:after': {
//   //   content: '""',
//   //   position: 'absolute',
//   //   width: 210,
//   //   height: 210,
//   //   background: theme.palette.primary[800],
//   //   borderRadius: '50%',
//   //   zIndex: 1,
//   //   top: -85,
//   //   right: -95,
//   //   [theme.breakpoints.down('sm')]: {
//   //     top: -105,
//   //     right: -140
//   //   }
//   // },
//   // '&:before': {
//   //   content: '""',
//   //   position: 'absolute',
//   //   zIndex: 1,
//   //   width: 210,
//   //   height: 210,
//   //   background: theme.palette.primary[800],
//   //   borderRadius: '50%',
//   //   top: -125,
//   //   right: -15,
//   //   opacity: 0.5,
//   //   [theme.breakpoints.down('sm')]: {
//   //     top: -155,
//   //     right: -70
//   //   }
//   // }
// }));

// // ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

// const TotalOrderLineChartCard = ({ isLoading }) => {
//   const theme = useTheme();

//   const [timeValue, setTimeValue] = useState(false);
//   const handleChangeTime = (event, newValue) => {
//     setTimeValue(newValue);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonTotalOrderCard />
//       ) : (
//         <CardWrapper border={false} content={false}>
//           <Box sx={{ p: 2.25 }}>
//             <Grid container direction="column">
//               <Grid item>
//                 <Grid container justifyContent="space-between">
//                   {/* <Grid item>
//                     <Avatar
//                       variant="rounded"
//                       sx={{
//                         ...theme.typography.commonAvatar,
//                         ...theme.typography.largeAvatar,
//                         backgroundColor: theme.palette.primary[800],
//                         color: '#fff',
//                         mt: 1
//                       }}
//                     >
//                       <LocalMallOutlinedIcon fontSize="inherit" />
//                     </Avatar>
//                   </Grid> */}
//                   {/* <Grid item>
//                     <Button
//                       disableElevation
//                       variant={timeValue ? 'contained' : 'text'}
//                       size="small"
//                       sx={{ color: 'inherit' }}
//                       onClick={(e) => handleChangeTime(e, true)}
//                     >
//                       Month
//                     </Button>
//                     <Button
//                       disableElevation
//                       variant={!timeValue ? 'contained' : 'text'}
//                       size="small"
//                       sx={{ color: 'inherit' }}
//                       onClick={(e) => handleChangeTime(e, false)}
//                     >
//                       Year
//                     </Button>
//                   </Grid> */}
//                 </Grid>
//               </Grid>

//               <Grid item sx={{ mb: 0.75 }}>
//                 <Grid container alignItems="center">
//                   <Grid item xs={6}>
//                     <Grid container alignItems="center">
//                       <Grid item xs={12}>
//                         <Typography
//                           sx={{
//                             fontSize: '1rem',
//                             fontWeight: 500,
//                             color: theme.palette.primary[200]
//                           }}
//                         >
//                           Total Leads
//                         </Typography>
//                       </Grid>

//                       <Grid item>
//                         <Typography sx={{ fontSize: '2rem', fontWeight: 50,  }}>$961</Typography>from $240.94
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardWrapper>
//       )}
//     </>
//   );
// };

// TotalOrderLineChartCard.propTypes = {
//   isLoading: PropTypes.bool
// };
// export default TotalOrderLineChartCard;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

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

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box>
            <Grid container direction="column" sx={{ marginY : 2}}>
              <Grid item>
                <Typography variant="h6" sx={{ color: '#f6c23e', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  TOTAL CUSTOMERS
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={6} container direction="column">
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center'}}>
                      {/* <CurrencyRupeeIcon fontSize="small" sx={{ color: '#5D3FD3' }} /> */}
                      <Typography variant="h6" sx={{ display: 'inline-block', fontSize: '1.2rem', fontWeight: 400, color : '#5a5c69' }}>
                        25
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

// import PropTypes from 'prop-types';
// import { useState } from 'react';

// // material-ui
// import { styled, useTheme } from '@mui/material/styles';
// import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// // assets
// import EarningIcon from 'assets/images/icons/earning.svg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
// import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
// import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
// import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//   backgroundColor: theme.palette.secondary.dark,
//   color: '#fff',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
//     borderRadius: '50%',
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
//     width: 210,
//     height: 210,
//     background: theme.palette.secondary[800],
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

// // ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

// const EarningCard = ({ isLoading }) => {
//   const theme = useTheme();

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonEarningCard />
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
//                         backgroundColor: theme.palette.secondary[800],
//                         mt: 1
//                       }}
//                     >
//                       <img src={EarningIcon} alt="Notification" />
//                     </Avatar>
//                   </Grid>
//                   <Grid item>
//                     <Avatar
//                       variant="rounded"
//                       sx={{
//                         ...theme.typography.commonAvatar,
//                         ...theme.typography.mediumAvatar,
//                         backgroundColor: theme.palette.secondary.dark,
//                         color: theme.palette.secondary[200],
//                         zIndex: 1
//                       }}
//                       aria-controls="menu-earning-card"
//                       aria-haspopup="true"
//                       onClick={handleClick}
//                     >
//                       <MoreHorizIcon fontSize="inherit" />
//                     </Avatar>
//                     <Menu
//                       id="menu-earning-card"
//                       anchorEl={anchorEl}
//                       keepMounted
//                       open={Boolean(anchorEl)}
//                       onClose={handleClose}
//                       variant="selectedMenu"
//                       anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'right'
//                       }}
//                       transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right'
//                       }}
//                     >
//                       <MenuItem onClick={handleClose}>
//                         <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
//                       </MenuItem>
//                       <MenuItem onClick={handleClose}>
//                         <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
//                       </MenuItem>
//                       <MenuItem onClick={handleClose}>
//                         <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
//                       </MenuItem>
//                       <MenuItem onClick={handleClose}>
//                         <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
//                       </MenuItem>
//                     </Menu>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item>
//                 <Grid container alignItems="center">
//                   <Grid item>
//                     <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$50.0</Typography>
//                   </Grid>
//                   <Grid item>
//                     <Avatar
//                       sx={{
//                         cursor: 'pointer',
//                         ...theme.typography.smallAvatar,
//                         backgroundColor: theme.palette.secondary[200],
//                         color: theme.palette.secondary.dark
//                       }}
//                     >
//                       <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item sx={{ mb: 1.25 }}>
//                 <Typography
//                   sx={{
//                     fontSize: '1rem',
//                     fontWeight: 500,
//                     color: theme.palette.secondary[200]
//                   }}
//                 >
//                   Total Contact
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardWrapper>
//       )}
//     </>
//   );
// };

// EarningCard.propTypes = {
//   isLoading: PropTypes.bool
// };

// export default EarningCard;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';


const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2),
  borderLeft: `5px solid #008000`,
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  '& .MuiTypography-root': {
    marginBottom: theme.spacing(0)
  }
}));

const TotalShipment = ({ isLoading }) => {
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
                <Typography variant="h6" sx={{ color: '#008000', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  TOTAL SHIPMENT
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={6} container >
                    <Typography variant="h6" sx={{display : 'flex', alignItems: 'center'}}>
                      {/* <CurrencyRupeeIcon fontSize="small" sx={{ color: '#5D3FD3' }} /> */}
                      <Typography variant="h6" sx={{ display: 'inline-block', fontSize: '1.2rem', fontWeight: 400, color : '#5a5c69' }}>
                       0
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container direction="column" alignItems="flex-end">
                    <LocalShippingRoundedIcon
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

TotalShipment.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalShipment;


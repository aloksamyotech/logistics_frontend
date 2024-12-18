import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import LogoSection from 'layout/MainLayout/LogoSection';
import LogoutButton from 'layout/MainLayout/Header/LogoutButton';


const HeaderForCustomer = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* Header Container */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo Section */}
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', }}>
          <LogoSection />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout Button */}
        <LogoutButton />
      </Box>
    </>
  );
};

HeaderForCustomer.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default HeaderForCustomer;

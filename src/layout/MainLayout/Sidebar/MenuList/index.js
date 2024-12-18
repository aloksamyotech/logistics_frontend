// material-ui
import { Typography, useRadioGroup } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //
const MenuList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // const user = admin;
  console.log('user ===>', user);

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsForSuperAdmin = menuItem.SuperAdminItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsForEmployee = menuItem.EmployeeItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  if (user.role === 'admin') {
    return <>{navItems}</>;
  } else if (user.role === 'superadmin') {
    return <>{navItemsForSuperAdmin}</>;
  } else if (user.role === 'Employee') {
    return <>{navItemsForEmployee}</>;
  }
};

export default MenuList;

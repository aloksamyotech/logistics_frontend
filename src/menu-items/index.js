// import dashboard from './dashboard';
import { dashboard, customer, quotes, shipment, vendor, staff, reports, superadmin, employee } from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,customer, quotes, shipment, vendor, staff, reports],
  SuperAdminItems: [superadmin],
  EmployeeItems: [employee]

};

export default menuItems;

// assets
import { color } from '@mui/system';
import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
} from '@tabler/icons';

// constant
const icons = {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

// const dashboard = {
//   title: 'Dashboard',
//   type: 'group',
//   children: [
//     {
//       id: 'default',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/dashboard/default',
//       icon: icons.IconHome,
//       breadcrumbs: false
//     },
//     {
//       id: '01',
//       title: 'Create Shipment',
//       type: 'item',
//       url: '/dashboard/lead',
//       icon: icons.IconAntennaBars5,
//       breadcrumbs: false
//     },
//     {
//       id: '02',
//       title: 'Add Customer',
//       type: 'item',
//       url: '/dashboard/contact',
//       icon: icons.IconPhoneCheck,
//       breadcrumbs: false
//     },
//     {
//       id: '03',
//       title: 'Customer List',
//       type: 'item',
//       url: '/dashboard/policy',
//       icon: icons.IconNotebook,
//       breadcrumbs: false
//     },
//     {
//       id: '04',
//       title: 'Create Quotes',
//       type: 'item',
//       url: '/dashboard/task',
//       icon: icons.IconChecklist,
//       breadcrumbs: false
//     },
//     {
//       id: '05',
//       title: 'Quotes List',
//       type: 'item',
//       url: '/dashboard/meeting',
//       icon: icons.IconUsers,
//       breadcrumbs: false
//     },
//     {
//       id: '06',
//       title: 'Shipment List',
//       type: 'item',
//       url: '/dashboard/call',
//       icon: icons.IconPhoneCall,
//       breadcrumbs: false
//     },
//     {
//       id: '07',
//       title: 'Price List',
//       type: 'item',
//       url: '/dashboard/email',
//       icon: icons.IconMail,
//       breadcrumbs: false
//     },
//     {
//       id: '08',
//       title: 'Vendors List',
//       type: 'item',
//       url: '/dashboard/calender',
//       icon: icons.IconCalendarEvent,
//       breadcrumbs: false
//     },
//     {
//       id: '09',
//       title: 'Vendors Expenses',
//       type: 'item',
//       url: '/dashboard/document',
//       icon: icons.IconFileUpload,
//       breadcrumbs: false
//     },
//     {
//       id: '10',
//       title: 'Vendors Payments',
//       type: 'item',
//       url: '/admin/vendor/payments',
//       icon: icons.IconFileInvoice,
//       breadcrumbs: false
//     },
//     {
//       id: '11',
//       title: 'Create Staff',
//       type: 'item',
//       url: '/admin/staff/create',
//       icon: icons.IconFileUpload,
//       breadcrumbs: false
//     },
//     {
//       id: '12',
//       title: 'Staff List',
//       type: 'item',
//       url: '/admin/staff',
//       icon: icons.IconFileInvoice,
//       breadcrumbs: false
//     },
//     {
//       id: '13',
//       title: 'Leads',
//       type: 'item',
//       url: '/admin/leads',
//       icon: icons.IconFileUpload,
//       breadcrumbs: false
//     },
//     {
//       id: '14',
//       title: 'Call Logs',
//       type: 'item',
//       url: '/admin/call_logs',
//       icon: icons.IconFileInvoice,
//       breadcrumbs: false
//     },
//     {
//       id: '15',
//       title: 'Expenses',
//       type: 'item',
//       url: '/admin/expenses',
//       icon: icons.IconFileUpload,
//       breadcrumbs: false
//     },
//     {
//       id: '16',
//       title: 'General Reports',
//       type: 'item',
//       url: '/admin/reports',
//       icon: icons.IconFileInvoice,
//       breadcrumbs: false
//     }

//   ]
// };

const dashboard = {
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '01',
      title: 'Create Shipment',
      type: 'item',
      url: '/admin/shipment/add',
      icon: icons.IconAntennaBars5,
      breadcrumbs: false
    }
  ]
};

const customer = {
  title: 'customer',
  type: 'group',
  children: [
    {
      id: '02',
      title: 'Add Customer',
      type: 'item',
      url: '/admin/customer/add',
      icon: icons.IconPhoneCheck,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Customer List',
      type: 'item',
      url: '/admin/customers',
      icon: icons.IconNotebook,
      breadcrumbs: false
    }
  ]
};

const quotes = {
  title: 'quotes',
  type: 'group',
  children: [
    {
      id: '04',
      title: 'Create Quotes',
      type: 'item',
      url: '/admin/quotes/add',
      icon: icons.IconChecklist,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Quotes List',
      type: 'item',
      url: '/admin/quotes',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

const shipment = {
  title: 'shipment',
  type: 'group',
  children: [
    {
      id: '06',
      title: 'Shipment List',
      type: 'item',
      url: '/admin/shipments',
      icon: icons.IconPhoneCall,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Price List',
      type: 'item',
      url: '/admin/price',
      icon: icons.IconMail,
      breadcrumbs: false
    }
  ]
};

const vendor = {
  title: 'vendor',
  type: 'group',
  children: [
    {
      id: '08',
      title: 'Vendors List',
      type: 'item',
      url: '/admin/vendors',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Vendors Expenses',
      type: 'item',
      url: '/admin/vendor/expenses',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Vendors Payments',
      type: 'item',
      url: '/admin/vendor/payments',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};

const staff = {
  title: 'staff',
  type: 'group',
  children: [
    {
      id: '11',
      title: 'Create Staff',
      type: 'item',
      url: '/admin/staff/add',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '12',
      title: 'Staff List',
      type: 'item',
      url: '/admin/staff',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};

const reports = {
  title: 'reports',
  type: 'group',
  children: [
    {
      id: '13',
      title: 'Leads',
      type: 'item',
      url: '/admin/leads',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '14',
      title: 'Call Logs',
      type: 'item',
      url: '/admin/call_logs',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: '15',
      title: 'Expenses',
      type: 'item',
      url: '/admin/expenses',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '16',
      title: 'General Reports',
      type: 'item',
      url: '/admin/reports',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};

const superadmin = {
  title: 'Super Admin Dashboard',
  type: 'group',
  children: [
    {
      id: '01',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconPhoneCall,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'Create Admin',
      type: 'item',
      url: '/admin/add_admin',
      icon: icons.IconMail,
      breadcrumbs: false
    }
  ]
};

const employee = {
  title: 'Employee Dashboard',
  type: 'group',
  children: [
    {
      id: '01',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'Create Shipment',
      type: 'item',
      url: '/admin/shipment/add',
      icon: icons.IconAntennaBars5,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Add Customer',
      type: 'item',
      url: '/admin/customer/add',
      icon: icons.IconPhoneCheck,
      breadcrumbs: false
    },
    {
      id: '04',
      title: 'Customer List',
      type: 'item',
      url: '/admin/customers',
      icon: icons.IconNotebook,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Create Quotes',
      type: 'item',
      url: '/admin/quotes/add',
      icon: icons.IconChecklist,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Quotes List',
      type: 'item',
      url: '/admin/quotes',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Shipment List',
      type: 'item',
      url: '/admin/shipments',
      icon: icons.IconPhoneCall,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Price List',
      type: 'item',
      url: '/admin/price',
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Vendors List',
      type: 'item',
      url: '/admin/vendors',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Vendors Expenses',
      type: 'item',
      url: '/admin/vendor/expenses',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '11',
      title: 'Vendors Payments',
      type: 'item',
      url: '/admin/vendor/payments',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};

export { dashboard, customer, quotes, shipment, vendor, staff, reports, superadmin, employee };

import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const ContactManagement = Loadable(lazy(() => import('views/Contact')));
const Call = Loadable(lazy(() => import('views/Calls')));
const Policy = Loadable(lazy(() => import('views/Policy')));
const Metting = Loadable(lazy(() => import('views/Metting')));
const Email = Loadable(lazy(() => import('views/Email')));
const Task = Loadable(lazy(() => import('views/Task')));
const EmailTemplates = Loadable(lazy(() => import('views/EmailTemplates')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));

const SuperAdmin = Loadable(lazy(() => import('views/SuperAdmin')));
const ViewAdmin = Loadable(lazy(() => import('views/SuperAdmin/ViewAdmin')));

// const CustomerList = Loadable(lazy(() => import('views/Contact/CustomerList')));
const QuotationList = Loadable(lazy(() => import('views/Task/QuotationList')));
const VendorExpenses = Loadable(lazy(() => import('views/Calender/VendorExpenses')));
const VendorPayment = Loadable(lazy(() => import('views/Calender/VendorPayment')));

//-----------------------------------------------------------------------------//
const AddShipment = Loadable(lazy(() => import('views/Shipment/AddShipment')));

const AddCustomer = Loadable(lazy(() => import('views/Customer/AddCustomer')));
const CustomerList = Loadable(lazy(() => import('views/Customer/CustomerList')));
const ViewCustomer = Loadable(lazy(() => import('views/Customer/ViewCustomer')));

const AddQuotes = Loadable(lazy(() => import('views/Quotes/AddQuotes')));
const QuotesList = Loadable(lazy(() => import('views/Quotes/QuotesList')));
const ViewQuotesDetails = Loadable(lazy(() => import('views/Quotes/ViewQuotesDetails')));

const ShipmentList = Loadable(lazy(() => import('views/Shipment/ShipmentList')));
// const User = Loadable(lazy(() => import('views/Shipment/ViewShipmentDetails')));
const ViewShipmentDetails = Loadable(lazy(() => import('views/Shipment/ViewShipmentDetails')));

const PriceList = Loadable(lazy(() => import('views/Price/PriceList')));
const WeightList = Loadable(lazy(() => import('views/Weight/weightList')));
const VendorList = Loadable(lazy(() => import('views/Vendors/VendorList/ShowVendors')));
const ShowVendorExpenses = Loadable(lazy(() => import('views/Vendors/VendorExpenses/ShowVendorExpenses')));
const ShowVendorPayments = Loadable(lazy(() => import('views/Vendors/VendorPayments/ShowVendorPayments')));
const AddStaff = Loadable(lazy(() => import('views/Staff/AddStaff')));
const StaffList = Loadable(lazy(() => import('views/Staff/StaffList')));
const ShowLeads = Loadable(lazy(() => import('views/Leads/ShowLeads')));
const ViewLead = Loadable(lazy(() => import('views/Leads/ViewLead')));
const ShowCallLogs = Loadable(lazy(() => import('views/CallLogs/ShowCallLogs')));
const ShowExpenses = Loadable(lazy(() => import('views/Expenses/ShowExpenses')));
const ViewExpenses = Loadable(lazy(() => import('views/Expenses/ViewExpenses')));
const ViewVendorDetails = Loadable(lazy(() => import('views/Vendors/VendorExpenses/ViewVendorDetails')));
const GeneralReport = Loadable(lazy(() => import('views/GeneralReports/GeneralReport')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'shipment/add',
          element: <AddShipment />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'customer/add',
          element: <AddCustomer />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'customers',
          element: <CustomerList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'quotes/add',
          element: <AddQuotes />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'quotes',
          element: <QuotesList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'shipments',
          element: <ShipmentList />
        }
      ]
    },
    // {
    //   path: 'admin',
    //   children: [
    //     {
    //       path: 'shipments',
    //       element: <User />
    //     }
    //   ]
    // },
    {
      path: 'admin',
      children: [
        {
          path: 'price',
          element: <PriceList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'weight',
          element: <WeightList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'vendors',
          element: <VendorList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'vendor/expenses',
          element: <ShowVendorExpenses />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'vendor/payments',
          element: <ShowVendorPayments />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'staff/add',
          element: <AddStaff />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'staff',
          element: <StaffList />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'leads',
          element: <ShowLeads />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view_leads/:id',
          element: <ViewLead />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'call_logs',
          element: <ShowCallLogs />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'expenses',
          element: <ShowExpenses />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'reports',
          element: <GeneralReport />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'add_admin',
          element: <SuperAdmin />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view/:id',
          element: <ViewAdmin />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view_customer/:id',
          element: <ViewCustomer />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view_expenses/:id',
          element: <ViewExpenses />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view_vendor_details/:id',
          element: <ViewVendorDetails />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/view_quote_details/:id',
          element: <ViewQuotesDetails />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: '/admin/shipment_details/:id',
          element: <ViewShipmentDetails />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'lead',
          element: <LeadManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'contact',
          element: <ContactManagement />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'customerlist',
          element: <CustomerList />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'call',
          element: <Call />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'policy',
          element: <Policy />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'policy',
          element: <Policy />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'task',
          element: <Task />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'quotationlist',
          element: <QuotationList />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'email',
          element: <Email />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'meeting',
          element: <Metting />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'calender',
          element: <Calender />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'vendor_expenses',
          element: <VendorExpenses />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'vendor/payments',
          element: <VendorPayment />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document',
          element: <Document />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate',
          element: <EmailTemplates />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate/addTemplates',
          element: <AddTemplates />
        }
      ]
    }
  ]
};

export default MainRoutes;

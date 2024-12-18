import { element } from 'prop-types';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
// import Customerdashboard from 'views/CustomerDashboard';

import MainLayout from 'layout/MainLayout';
import MainLayoutForCustomer from 'layout/MainLayoutForCustomer';
import { Children } from 'react';

const CustomerDashboard = Loadable(lazy(() => import('../layout/MainLayoutForCustomer')));
const Invoices = Loadable(lazy(() => import('../views/CustomerDashboard/Invoices')));
const Quotes = Loadable(lazy(() => import('../views/CustomerDashboard/Quotes')));
const TrackShipment = Loadable((()=> import('../views/CustomerDashboard/TrackShipment')));
const RequestQuotes = Loadable((()=> import('../views/CustomerDashboard/RequestQuotes')));

const CustomerRoutes = {
  path: '/',
  element: <MainLayoutForCustomer />,
  children: [
    {
      path: 'customer',
      element: <CustomerDashboard />,
      children: [
        {
          path: 'invoices',
          element: <Invoices />
        },
        {
          path: 'quotes',
          element: <Quotes />
        },
        {
          path: 'track/shipment',
          element: <TrackShipment/>
        },
        {
          path: 'quote/create',
          element: <RequestQuotes/>
        }
      ]
    }
  ]
};

export default CustomerRoutes;


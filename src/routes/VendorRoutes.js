import { element } from 'prop-types';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

import MainLayoutForVendor from 'layout/MainLayoutForVendor';
const VendorDashboard = Loadable(lazy(() => import('../layout/MainLayoutForVendor')));
const EditVendorProfile = Loadable(lazy(() => import('../views/VendorDashboard/Shipment')));
const Shipment = Loadable(lazy(() => import('../views/VendorDashboard/Shipment') ));

// const CustomerDashboard = Loadable(lazy(() => import('../layout/MainLayoutForCustomer')));
// const Invoices = Loadable(lazy(() => import('../views/CustomerDashboard/Invoices')));
// const Quotes = Loadable(lazy(() => import('../views/CustomerDashboard/Quotes')));
// const TrackShipment = Loadable((()=> import('../views/CustomerDashboard/TrackShipment')));
// const RequestQuotes = Loadable((()=> import('../views/CustomerDashboard/RequestQuotes')));

const VendorRoutes = {
  path: '/',
  element: <MainLayoutForVendor />,
  children: [
    {
      path: 'vendor',
      element: <VendorDashboard />,
      children: [
        {
            path: 'shipment',
            element: <Shipment />
        },
        {
          path: 'edit/profile',
          element: <EditVendorProfile />
        }
        //     {
        //       path: 'quotes',
        //       element: <Quotes />
        //     },
        //     {
        //       path: 'track/shipment',
        //       element: <TrackShipment/>
        //     },
        //     {
        //       path: 'quote/create',
        //       element: <RequestQuotes/>
        //     }
      ]
    }
  ]
};

export default VendorRoutes;

// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




import Root from './Root'
//Supplier Management System
import IndexSupplier from './Components/Supplier/src/App';
import Supplier from './Components/Supplier/src/pages/supplierdata/index';
import Notifications from './Components/Supplier/src/pages/notifications/index';

import UniqueSupplier from "./Components/Supplier/src/pages/supplierdata/UniqueSupplier";
import UpdateSupplier  from "./Components/Supplier/src/pages/supplierdata/UpdateSupplier";

import UniqueNotification from "./Components/Supplier/src/pages/notifications/UniqueNotification";

// Rent Management System
import IndexRent from './Components/Rent/src/App';
import RentData from './Components/Rent/src/pages/rentdata/index';

import UniqueRent from "./Components/Rent/src/pages/rentdata/UniqueRent";
import UpdateRent  from "./Components/Rent/src/pages/rentdata/UpdateRent";
 

// Fuel Management System
import Index from './Components/Fuel/src/App';
import Fuelstock from './Components/Fuel/src/pages/fuelstock/index';
import Fuelentry from './Components/Fuel/src/pages/fuelentry/index';
import Fuelconsumtion from './Components/Fuel/src/pages/fuelconsumtion/index';
import Fuelinvoices from './Components/Fuel/src/pages/invoices/index';
import Fuelanalytics from './Components/Fuel/src/pages/faq/index';

import UniqueFuelentry from "./Components/Fuel/src/pages/fuelentry/UniqueFuelentry";
import UpdateFuelentry  from "./Components/Fuel/src/pages/fuelentry/UpdateFuelentry";

import UniqueFuelstock from "./Components/Fuel/src/pages/fuelstock/UniqueFuelstock";
import UpdateFuelstock  from "./Components/Fuel/src/pages/fuelstock/UpdateFuelstock";

// Employee Management System
import IndexEmployee from './Components/Employee/src/App';
import EmployeeData from './Components/Employee/src/pages/employeedata/index';

import UniqueEmployee from "./Components/Employee/src/pages/employeedata/UniqueEmployee";
import UpdateEmployee  from "./Components/Employee/src/pages/employeedata/UpdateEmployee";


 // Vehicle Management System
 import IndexVehicle from './Components/Vehicle/src/App';
 import VehicleData from './Components/Vehicle/src/pages/vehicledata/index';

//Vehicle
import Vehicle from './Components/Vehicle/Vehicle';
import AllVehicles from './Components/Vehicle/AllVehicle';
import AddVehicle from './Components/Vehicle/AddVehicle';



 import UniqueVehicle from "./Components/Vehicle/src/pages/vehicledata/UniqueVehicle";
 import UpdateVehicle from "./Components/Vehicle/src/pages/vehicledata/UpdateVehicle";
 

  // Inventroy Management System
import IndexInventory from './Components/Inventory/src/App';
import InventoryData from './Components/Inventory/src/pages/inventorydata/index';
import ReleaseInventory from './Components/Inventory/src/pages/release/index';
import AnalyticsInventory from './Components/Inventory/src/pages/analytics/index';
import UniqueInventory from "./Components/Inventory/src/pages/inventorydata/UniqueInventory";
import UpdateInventory  from "./Components/Inventory/src/pages/inventorydata/UpdateInventory";

import UniqueRelease from "./Components/Inventory/src/pages/release/UniqueFuelstock";
import UpdateRealease  from "./Components/Inventory/src/pages/release/UpdateFuelstock";

  //Maintanence
  import IndexMaintenance from './Components/Maintenance/src/App';
  import Correctivemaintanence from './Components/Maintenance/src/pages/correctivemaintenance/index';
  import Preventivemaintanence from './Components/Maintenance/src/pages/preventivemaintenance/index';
  
  import UniqueMaintenance from './Components/Maintenance/src/pages/correctivemaintenance/UniqueMaintenance';
import UpdateMaintenance from './Components/Maintenance/src/pages/correctivemaintenance/UpdateMaintenance';

//Trip Management System
import IndexTrip from './Components/Trip/src/App';
import TripData from './Components/Trip/src/pages/trip/index';
import UniqueTrip from './Components/Trip/src/pages/trip/UniqueTrip';
import UpdateTrip from './Components/Trip/src/pages/trip/UpdateTrip';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      {
        path: '/supplier',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexSupplier />,
            children: [
              {
                path: "/supplier/supplierdata",
                element: <Supplier />,
              },
              {
                path: "/supplier/notifications",
                element: <Notifications />,
              },
              
              {
                path: "/supplier/uniquesupplier/:id",
                element: <UniqueSupplier />
              },
              {
                path: "/supplier/updatesupplier/:id",
                element: <UpdateSupplier />
              },
              {
                path: "/supplier/uniquenotification/:id",
                element: <UniqueNotification />,
              },
            ],
          },
        ],
      },
      {
        path: '/rent',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexRent />,
            children: [
              {
                path: "/rent/rentdata",
                element: <RentData />,
              },
              
              
              {
                path: "/rent/uniquerent/:id",
                element: <UniqueRent />,
              },
              {
                path: "/rent/updaterent/:id",
                element: <UpdateRent />,
              },
            ],
          },
        ],
      },
      {
        path: '/trip',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexTrip />,
            children: [
              {
                path: "/trip/tripdata",
                element: <TripData />,
              },
              {
                path: "/trip/uniquetrip/:id",
                element: <UniqueTrip />,
              },
              {
                path: "/trip/updatetrip/:id",
                element: <UpdateTrip />,
              },
            ],
          },
        ],
      },
      
      {
        path: '/inventory',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexInventory />,
            children: [
              {
                path: "/inventory/inventorydata",
                element: <InventoryData />,
              },
              {
                path: "/inventory/release",
                element: <ReleaseInventory />,
              },
              {
                path: "/inventory/analytics",
                element: <AnalyticsInventory />,
              },
              {
                path: "/inventory/uniqueinventory/:id",
                element: <UniqueInventory />,
              },
              {
                path: "/inventory/updateinventory/:id",
                element: <UpdateInventory />,
              },
              {
                path: "/inventory/uniquerelease/:id",
                element: <UniqueRelease />,
              },
              {
                path: "/inventory/updaterelease/:id",
                element: <UpdateRealease />,
              },
            ],
          },
        ],
      },
      {
        path: '/maintenance',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexMaintenance />,
            children: [
              {
                path: "/maintenance/correctivemaintenance",
                element: <Correctivemaintanence />,
              },
              {
                path: "/maintenance/preventivemaintenance",
                element: <Preventivemaintanence />,
              },
              
              {
                path: "/maintenance/uniquemaintenance/:id",
                element: <UniqueMaintenance />,
              },
              {
                path: "/maintenance/updatemaintenance/:id",
                element: <UpdateMaintenance />,
              },
            ],
          },
        ],
      },

      {
        path: '/fuel',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <Index />,
            children: [
              {
                path: "/fuel/fuelstock",
                element: <Fuelstock />,
              },
              {
                path: "/fuel/fuelentry",
                element: <Fuelentry />,
              },
              {
                path: "/fuel/fuelconsumtion",
                element: <Fuelconsumtion />,
              },
              {
                path: "/fuel/invoices",
                element: <Fuelinvoices />,
              },
              {
                path: "/fuel/faq",
                element: <Fuelanalytics />,
              },
              {
                path: "/fuel/uniquefuelentry/:id",
                element: <UniqueFuelentry />,
              },
              {
                path: "/fuel/updatefuelentry/:id",
                element: <UpdateFuelentry />,
              },
              {
                path: "/fuel/uniquefuelstock/:id",
                element: <UniqueFuelstock />,
              },
              {
                path: "/fuel/updatefuelstock/:id",
                element: <UpdateFuelstock />,
              },
            ],
          },
        ],
      },


      {
        path: '/vehicle',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexVehicle />,
            children: [
              {
                path: "/vehicle/vehicledata",
                element: <VehicleData />,
              },
              
              {
                path: "/vehicle/uniquevehicle/:id",
                element: <UniqueVehicle />,
              },
              {
                path: "/vehicle/updatevehicle/:id",
                element: <UpdateVehicle />,
              },
            ],
          },
        ],
      },


      {
        path: '/employee',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexEmployee />,
            children: [
              {
                path: "/employee/employeedata",
                element: <EmployeeData />,
              },
              {
                path: "/employee/uniqueemployee/:id",
                element: <UniqueEmployee />,
              },
              {
                path: "/employee/updateemployee/:id",
                element: <UpdateEmployee />,
              },
            ],
          },
        ],
      },


      /* 
      {
        path: "/maintenance",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <AllCorrectiveMaintenance/>,
          },
          {
            path: "addmaintenance",
            element: <AddCorrectiveMaintenance />
          },
          {
            path: "allmaintenance",
            element: <AllCorrectiveMaintenance />
          },
          {
            path: "uniquemaintenance",
            element: <UniqueMaintenance />
          },
          {
            path: "updateSupplier",
            element: <UpdateSupplier />
          },
          {
            path: "/maintenance/viewJob/:id",
            element: <UniqueMaintenance/>
          },
          {
            path: "/maintenance/viewJob/:id/maintenance/update/:id",
            element: <UpdateMaintenance />
          },
    
        ]
      },*/

    ], 
  },
]);
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
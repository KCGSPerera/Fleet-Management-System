import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard/index";
import SupplierData from "./pages/supplierdata/index";
import Notifications from "./pages/notifications/index";

import UniqueSupplier from "./pages/supplierdata/UniqueSupplier";
import UpdateSupplier  from "./pages/supplierdata/UpdateSupplier";

import UniqueNotification from "./pages/notifications/UniqueNotification";
//import UpdateFuelstock  from "./pages/supplierdata/UpdateFuelstock";

/*
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
*/

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                
                <Route path="/" element={<Dashboard />} />
                <Route path="/supplierdata" element={<SupplierData />} />
                <Route path="/notifications" element={<Notifications />} />
                
                <Route path="/uniquesupplier/:id" element={<UniqueSupplier />} />
                <Route path="/updatesupplier/:id" element={<UpdateSupplier />} />

                <Route path="/uniquenotification/:id" element={<UniqueNotification />} />
               
                
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

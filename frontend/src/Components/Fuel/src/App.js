import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard/index";
import Fuelstock from "./pages/fuelstock/index";
import Fuelentry from "./pages/fuelentry/index";
import Fuelconsumtion from "./pages/fuelconsumtion";

import UniqueFuelentry from "./pages/fuelentry/UniqueFuelentry";
import UpdateFuelentry  from "./pages/fuelentry/UpdateFuelentry";

import UniqueFuelstock from "./pages/fuelstock/UniqueFuelstock";
import UpdateFuelstock  from "./pages/fuelstock/UpdateFuelstock";

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
                <Route path="/fuelstock" element={<Fuelstock />} />
                <Route path="/fuelentry" element={<Fuelentry />} />
                <Route path="/fuelconsumtion" element={<Fuelconsumtion />} />
                
                <Route path="/uniquefuelentry/:id" element={<UniqueFuelentry />} />
                <Route path="/updatefuelentry/:id" element={<UpdateFuelentry />} />

                <Route path="/uniquefuelstock/:id" element={<UniqueFuelstock />} />
                <Route path="/updatefuelstock/:id" element={<UpdateFuelstock />} />
                
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

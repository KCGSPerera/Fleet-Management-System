import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Correctivemaintenance from "./pages/correctivemaintenance/index";
import Preventivemaintenance from "./pages/preventivemaintenance/index";

import UniqueMaintenance from "./pages/correctivemaintenance/UniqueMaintenance";
import UpdateMaintenance  from "./pages/correctivemaintenance/UpdateMaintenance";


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
                
                <Route path="/" element={<Correctivemaintenance />} />
                <Route path="/preventivemaintenance" element={<Preventivemaintenance />} />
                
                <Route path="/uniqueMaintenance/:id" element={<UniqueMaintenance />} />
                <Route path="/updateMaintenance/:id" element={<UpdateMaintenance />} />

                
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

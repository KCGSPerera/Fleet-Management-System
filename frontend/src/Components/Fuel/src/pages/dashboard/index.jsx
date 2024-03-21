import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import DieselTank from "../../components/DieselTank";
import PetrolTank from "../../components/PetrolTank";
import StockTable from "../../components/StockTable";
//import VehicleTrack from "../../components/VehicleTracking/index"

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="FUEL MANAGEMENT SYSTEM" subtitle="Welcome to LogiX Fleet Management System" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
        <Box
            width="100%"
            height="300px" 
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="row" 
            alignItems="center"
            justifyContent="center"
            padding="50px"
            borderRadius= "15px"
          >
          <DieselTank />
          
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
        <Box
            width="100%"
            height="300px" 
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="row" 
            alignItems="center"
            justifyContent="center"
            padding="50px"
            borderRadius= "15px"
          >
          
          <PetrolTank />
          </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={3} xl={6}>
        <Box
            width="100%"
            height="300px" 
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column" 
            alignItems="center"
            justifyContent="center"
            padding="20px"
            borderRadius= "15px"
          >
            
            <LineChart />
          </Box>
        </Grid>

        <Grid Grid xs={12} sm={12} md={8} lg={8} xl={8}
          
          
          
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                
              >
                
                
                
              </Box>
              <Box height="680px" m="-20px 0 0 0">
              
              </Box>
            </Box>
          </Grid>
          
          
          
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Resent Transaction
              </Typography>
            </Box>
            <StockTable />
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

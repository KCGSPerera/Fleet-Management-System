import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { tokens } from "../../theme";

const Trips = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8411/trip");
        setTrips(response.data);
      } catch (error) {
        alert("Error fetching trips: " + error.message);
      }
    };

    fetchTrips();
  }, []);

  const [filteredTrips, setFilteredTrips] = useState([]);

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const centerText = (text, yPosition, fontSize) => {
      doc.setFontSize(fontSize);
      const textWidth =
        (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;
      const xPosition =
        (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, xPosition, yPosition);
    };

    centerText('Logix', 10, 20);
    centerText('Trip Details', 18, 16);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

    const columns1 = [
      "Trip ID",
      "Trip Name",
      "Trip Duration",
      "Trip Distance",
      "Vehicle Number",
      "Driver ID",
      "Start Point",
      "Destination"
    ];

    const columns2 = [
      "Trip Goods",
      "Arrival Time",
      "Departure Time",
      "Start Fuel",
      "End Fuel"
    ];

    const rows1 = filteredTrips.map((trip) => [
      trip.tripid,
      trip.tripname,
      trip.tripduration,
      trip.tripdistance,
      trip.vehicleno,
      trip.driverid,
      trip.startpoint,
      trip.destination
    ]);

    const rows2 = filteredTrips.map((trip) => [
      trip.tripgoods,
      trip.arrivaltime,
      trip.departuretime,
      trip.startfuel,
      trip.endfuel,
    ]);

    let y = 30;

    doc.autoTable({
      head: [columns1],
      body: rows1,
      startY: y
    });

    doc.addPage();

    centerText('Logix', 10, 20);
    centerText('Trip Details', 18, 16);
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

    doc.autoTable({
      head: [columns2],
      body: rows2,
      startY: y
    });

    doc.save("trips.pdf");
  };

  return (
    <Box m="20px">
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header
          title="TRIP REGISTRY SYSTEM"
          subtitle="Welcome to LogiX Fleet Management System"
        />

        <div className="buttons">
          <button onClick={handleDownloadPdf} className="update-button">
            Download as PDF
          </button>
        </div>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
          <Box
            width="100%"
            height="300px"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="20px"
            borderRadius="15px"
          >
            <Typography variant="h4" color="textPrimary">
              Welcome!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trips;

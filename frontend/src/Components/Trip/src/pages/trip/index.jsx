import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddTrip from './AddTrip';
import "./index.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Tripdata = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  

  const [trips, setTrips] = useState([]);

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`http://localhost:8411/trip/delete/${tripId}`);
      alert('Trip deleted successfully.');
      window.location.reload();
    } catch (error) {
      alert('Error deleting trip:', error.message);
    }
  };

  // Generate unique IDs for each row
  const rows = trips.map((trip, index) => ({
    id: index + 1, // You can use any method to generate unique IDs
    tripid: trip.tripid,
    tripname: trip.tripname,
    tripduration: parseFloat(trip.tripduration),
    tripdistance: parseFloat(trip.tripdistance),
    vehicleno: trip.vehicleno,
    driverid: trip.driverid,
    startpoint: trip.startpoint,
    destination: trip.destination,
    tripgoods: trip.tripgoods,
    arrivaltime: formatDateTime(trip.arrivaltime),
    departuretime: formatDateTime(trip.departuretime),
    startfuel: parseFloat(trip.startfuel),
    endfuel: parseFloat(trip.endfuel),
  }));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const filtered = trips.filter((trip) => {
      const tripIdStr = trip.tripid ? trip.tripid.toString() : '';
const tripDurationStr = trip.tripduration ? trip.tripduration.toString() : '';
const tripDistanceStr = trip.tripdistance ? trip.tripdistance.toString() : '';
const vehicleNoStr = trip.vehicleno ? trip.vehicleno.toString() : '';
const driverIdStr = trip.driverid ? trip.driverid.toString() : '';
const startFuelStr = trip.startfuel ? trip.startfuel.toString() : '';
const endFuelStr = trip.endfuel ? trip.endfuel.toString() : '';

      return (
        tripIdStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.tripname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tripDurationStr.includes(searchTerm) ||
        tripDistanceStr.includes(searchTerm) ||
        vehicleNoStr.includes(searchTerm) ||
        driverIdStr.includes(searchTerm) ||
        trip.startpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.tripgoods.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.arrivaltime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.departuretime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startFuelStr.includes(searchTerm) ||
        endFuelStr.includes(searchTerm)
      );
    });
    setFilteredTrips(filtered);
  }, [searchTerm, trips]);
  

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
      formatDateTime(trip.arrivaltime),
      formatDateTime(trip.departuretime),
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

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const columns = [
    {
      field: "tripid",
      headerName: "Trip ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripname",
      headerName: "Trip Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripduration",
      headerName: "Trip Duration",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripdistance",
      headerName: "Trip Distance",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicleno",
      headerName: "Vehicle No",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "driverid",
      headerName: "Driver ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "startpoint",
      headerName: "Start Point",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "destination",
      headerName: "Destination",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripgoods",
      headerName: "Trip Goods",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "arrivaltime",
      headerName: "Arrival Time",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "departuretime",
      headerName: "Departure Time",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "startfuel",
      headerName: "Start Fuel",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "endfuel",
      headerName: "End Fuel",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
          <Link 
            to={`/trip/uniqueTrip/${params.row.tripid}`}
            state={{ tripData: params.row }}
            style={linkStyle}
          >
            <Button 
              onClick={() => {}}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "2px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#141B2D",
                },
              }}
            >
              VIEW
            </Button>
          </Link>

          <Link 
            to={`/trip/updateTrip/${params.row.tripid}`}
            state={{ tripData: params.row }}
            style={linkStyle}
          >
            <Button
              onClick={() => {}}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "2px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#141B2D",
                },
              }}
            >
              EDIT
            </Button>
          </Link>

          <Button onClick={() => handleDelete(params.row.tripid)}
            sx={{
              backgroundColor: '#FF0000',
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#141B2D",
              },
            }}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:8411/trip");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TRIP MANAGER"
          subtitle="Welcome to LogiX Trip Management System"
        />
        
        <Button 
          onClick={openPopup}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#1F2A40",
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          ADD NEW TRIP
        </Button>
        {isPopupVisible && (
          <div className="overlay">
            <AddTrip onClose={closePopup} />
          </div>

          
        )}

        <Button 
          onClick={handleDownloadPdf}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#1F2A40",
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download PDF
        </Button>

      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Tripdata;

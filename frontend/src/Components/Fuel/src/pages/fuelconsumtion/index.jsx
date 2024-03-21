import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddConsumption from './AddConsumption';
import emailjs from "emailjs-com";
import "./index.css";


emailjs.init("wnlZ7w7kM05JeKEXb");

const Fuelconsumption = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/fuelconsumption/delete/${vehicleId}`);
      alert('Fuel consumption deleted successfully.');
      // Refresh the data after deletion
      window.location.reload();
    } catch (error) {
      alert('Error deleting fuel consumption:', error.message);
    }
  };
  
  const [selectedRow, setSelectedRow] = useState(null);

  


  const [fuelconsumptions, setFuelconsumptions] = useState([]);

  
  const rows = fuelconsumptions.map((fuelconsumption) => ({
    id: fuelconsumption.vehicle_id,
    vehicle_id: fuelconsumption.vehicle_id, // Update with the correct field name
    trip_id: fuelconsumption.trip_id,
    fuel_type: fuelconsumption.fuel_type,
    fuel_quantity: fuelconsumption.fuel_quantity,
    estimatedConsumption: fuelconsumption.estimatedConsumption,
    actualConsumption: fuelconsumption.actualConsumption,
    difference: fuelconsumption.difference,
    status: fuelconsumption.status,
  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };
  useEffect(() => {
    emailjs.init("wnlZ7w7kM05JeKEXb");
}, []);

function contactMaintenanceManager(rowData) {
  // Define your EmailJS service ID, template ID, and user ID
  const serviceId = "service_ayps2f8";
  const templateId = "template_5datrbi";
  const userId = "wnlZ7w7kM05JeKEXb";

  // Create a template parameters object with the product ID and any other data you want to include
  const templateParams = {
    to_name: "Maintenance Manager",
    from_name: "Fuel Consumption System",
    message: `
      Vehicle ID: ${rowData.vehicle_id}
      Trip ID: ${rowData.trip_id}
      Fuel Type: ${rowData.fuel_type}
      Dispatched Fuel Quantity: ${rowData.fuel_quantity}
      Designed Fuel Consumption: ${rowData.estimatedConsumption}
      Actual Fuel Consumption: ${rowData.actualConsumption}
      Difference: ${rowData.difference}
    `
  };

  // Send the email using EmailJS
  emailjs.send(serviceId, templateId, templateParams, userId)
    .then((response) => {
      console.log("Email sent successfully:",response);
      alert("Email sent successfully:");
    })
    .catch((error) => {
      console.error("Email send error:", error);
      alert("Email send error:", error);
    });
};
  
  const columns = [
    
    {
      field: "vehicle_id",
      headerName: "VEHICLE NO",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "trip_id",
      headerName: "TRIP ID",
      type: "date",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "fuel_type",
      headerName: "FUEL TYPE",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "fuel_quantity",
      headerName: "DISPATCHED FUEL QUANTITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 200,
    },
    {
      field: "estimatedConsumption",
      headerName: "DESIGNED FUEL CONSUMTION",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 200,
    },
    {
      field: "actualConsumption",
      headerName: "ACTUAL FUEL CONSUMTION",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "difference",
      headerName: "DIFFERENCE",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "status",
      headerName: "STATUS",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 400,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
          
        <Button onClick={() => contactMaintenanceManager(params.row)}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "2px",
            transition: "background-color 0.3s", // Add a transition for smooth color change
              "&:hover": {
              backgroundColor: "#141B2D", // Red color on hover
            },
          }}
        >
            REQUEST REPAIR
          
        </Button>
          <Button onClick={() => handleDelete(params.row.vehicle_id)}
            sx={{
              backgroundColor: '#FF0000',
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#141B2D", // Red color on hover
              },
            }}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const fetchFuelconsumptions = async () => {
    try {
      const response = await fetch("http://localhost:8411/fuelconsumption/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFuelconsumptions(data);
    } catch (error) {
      console.error("Error fetching fuel consumptions:", error);
    }
  };

  useEffect(() => {
    fetchFuelconsumptions();
  }, []);


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="FUEL CONSUMTION MANAGER"
          subtitle="Welcome to LogiX Fuel Management System"
        />
        
        <Button 
            onClick={openPopup}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#1F2A40", // Red color on hover
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            CALCULATE FUEL CONSUMTION
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddConsumption onClose={closePopup} />
            </div>
          )}

          

          
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

export default Fuelconsumption;

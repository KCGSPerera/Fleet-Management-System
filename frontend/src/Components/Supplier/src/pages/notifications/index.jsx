import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddFuelentry from './AddFuelentry';
import "./index.css";




const Fuelentry = () => {
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

  
  const [selectedRow, setSelectedRow] = useState(null);

  


  const [fuelentries, setFuelentries] = useState([]);

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/fuelentry/delete/${vehicleId}`);
      alert('Fuel entry deleted successfully.');
      // Refresh the data after deletion
      window.location.reload();
    } catch (error) {
      alert('Error deleting fuel entry:', error.message);
    }
  };
  const rows = fuelentries.map((fuelentry) => ({
    id: fuelentry.vehicle_id,
    vehicle_id: fuelentry.vehicle_id, // Update with the correct field name
    fuel_date: formatDate(fuelentry.fuel_date),
    fuel_type: fuelentry.fuel_type,
    fuel_quantity: fuelentry.fuel_quantity,
    fuel_cost: fuelentry.fuel_cost,
    vehicle_milage: fuelentry.vehicle_milage,
  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "vehicle_id",
      headerName: "VEHICLE ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "fuel_date",
      headerName: "FUEL DATE",
      type: "date",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "fuel_type",
      headerName: "FUEL TYPE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "fuel_quantity",
      headerName: "FUEL QUANTITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "fuel_cost",
      headerName: "FUEL COST",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "vehicle_milage",
      headerName: "VEHICLE MILAGE",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
          <Button 
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
            <Link 
                to={`/fuel/uniqueFuelentry/${params.row.vehicle_id}`}
                state={{ fuelentryData: params.row }}
                style={linkStyle}
            >
              VIEW

            </Link>
          </Button>
          <Button
            
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
          ><Link
          to={`/fuel/updateFuelentry/${params.row.vehicle_id}`}
          state={{ fuelentryData: params.row }}
          style={linkStyle}
        >
            EDIT</Link>
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

  const fetchFuelentries = async () => {
    try {
      const response = await fetch("http://localhost:8411/fuelentry/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFuelentries(data);
    } catch (error) {
      console.error("Error fetching fuel entries:", error);
    }
  };

  useEffect(() => {
    fetchFuelentries();
  }, []);


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="FUEL DISPATCH MANAGER"
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
            ADD NEW FUEL DISPATCH DATA
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddFuelentry onClose={closePopup} />
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

export default Fuelentry;

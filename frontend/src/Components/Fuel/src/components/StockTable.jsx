import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../Fuel/src/theme";






const Fuelstock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  
  const [selectedRow, setSelectedRow] = useState(null);

  


  const [fuelstocks, setFuelstocks] = useState([]);

  const rows = fuelstocks.map((fuelstock) => ({
    id: fuelstock.invoice_no,
    invoice_no: fuelstock.invoice_no,
    stocked_fuel_date: formatDate(fuelstock.stocked_fuel_date),
    total_cost: fuelstock.total_cost,
    
    
  }));


  const columns = [
    
    {
      field: "invoice_no",
      headerName: "INVOICE NO",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
        field: "stocked_fuel_date",
        headerName: "STOCKED FUEL DATE",
        type: "date",
        headerAlign: "center",
        align: "center",
        width: 150,
      },
    {
      field: "total_cost",
      headerName: "TOTAL COST",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 100,
    },
    
  ];

  const fetchFuelstocks = async () => {
    try {
      const response = await fetch("http://localhost:8411/fuelstock/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFuelstocks(data);
    } catch (error) {
      console.error("Error fetching fuel stocks:", error);
    }
  };

  useEffect(() => {
    fetchFuelstocks();
  }, []);


  

  return (
    <Box m="20px">
      
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
        <DataGrid rows={rows} columns={columns}  />
      </Box>
    </Box>
  );
};

export default Fuelstock;

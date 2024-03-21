import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddFuelstock from './AddFuelstock';
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./index.css";




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

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  
  const [selectedRow, setSelectedRow] = useState(null);




  // report generation

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    
    const centerText = (text, yPosition, fontSize) => {
      doc.setFontSize(fontSize);
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      const xPosition = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, xPosition, yPosition);
    };
  
    // Add the centered headers to the PDF
    centerText('Logix', 10, 20);
    centerText('Fuel Stock Details', 18, 16);
  
    // Add the current date to the bottom-right corner
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);
  
    const columns1 = ["Invoice Number", "Stocked Fuel Type", "Stocked Fuel Quantity", "Per Liter Quantity", "Stocked Fuel Date"];
  
    const rows1 = fuelstocks.map((fuelstock) => [
      fuelstock.invoice_no,
      fuelstock.stocked_fuel_type,
      fuelstock.stocked_fuel_quantity,
      fuelstock.per_leter_cost,
      formatDate(fuelstock.stocked_fuel_date)
    ]);
  
    let y = 30; // Initial Y position
  
    // Generate the table
    doc.autoTable({
      head: [columns1],
      body: rows1,
      startY: y
    });
  
    doc.save("fuelStock.pdf");
  };
  


  const [fuelstocks, setFuelstocks] = useState([]);

  const handleDelete = async (invoiceNo) => {
    try {
      await axios.delete(`http://localhost:8411/fuelstock/delete/${invoiceNo}`);
      alert('Fuel stock deleted successfully.');
      // Refresh the data after deletion
      window.location.reload();
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };







   // search functionality

   const [searchTerm, setSearchTerm] = useState(""); // State for the search term
   const [filteredFuelstocks, setFilteredFuelstocks] = useState([]); // State for filtered fuelstocks
   
   
   useEffect(() => {
     const filtered = fuelstocks.filter((fuelstock) => {
       return (
         fuelstock.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
         fuelstock.stocked_fuel_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
         fuelstock.stocked_fuel_quantity.toString().includes(searchTerm) ||
         fuelstock.per_leter_cost.toString().includes(searchTerm) ||
         fuelstock.total_cost.toString().includes(searchTerm) ||
         formatDate(fuelstock.stocked_fuel_date).toLowerCase().includes(searchTerm.toLowerCase())
       );
     });
     setFilteredFuelstocks(filtered);
   }, [searchTerm, fuelstocks]);
   










  // const rows = fuelstocks.map((fuelstock) => ({
  //   id: fuelstock.invoice_no,
  //   invoice_no: fuelstock.invoice_no,
  //   stocked_fuel_type: fuelstock.stocked_fuel_type, // Update with the correct field name
  //   stocked_fuel_quantity: fuelstock.stocked_fuel_quantity,
  //   per_leter_cost: fuelstock.per_leter_cost,
  //   total_cost: fuelstock.total_cost,
  //   stocked_fuel_date: formatDate(fuelstock.stocked_fuel_date),
    
  // }));


  const rows = filteredFuelstocks.map((fuelstock) => ({
    id: fuelstock.invoice_no,
    invoice_no: fuelstock.invoice_no,
    stocked_fuel_type: fuelstock.stocked_fuel_type,
    stocked_fuel_quantity: fuelstock.stocked_fuel_quantity,
    per_leter_cost: fuelstock.per_leter_cost,
    total_cost: fuelstock.total_cost,
    stocked_fuel_date: formatDate(fuelstock.stocked_fuel_date),
  }));

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };





  
  



 












  const columns = [
    
    {
      field: "invoice_no",
      headerName: "INVOICE NO",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "stocked_fuel_type",
      headerName: "STOCKED FUEL TYPE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "stocked_fuel_quantity",
      headerName: "STOCKED FUEL QUANTITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "per_leter_cost",
      headerName: "PER LETER COST",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "total_cost",
      headerName: "TOTAL COST",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
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
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
         <Link 
    to={`/fuel/uniqueFuelstock/${params.row.invoice_no}`}
    state={{ fuelstockData: params.row }}
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
    to={`/fuel/updateFuelstock/${params.row.invoice_no}`}
    state={{ fuelstockData: params.row }}
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

          <Button onClick={() => handleDelete(params.row.invoice_no)}
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="FUEL STOCK MANAGER"
          subtitle="Welcome to LogiX Fuel Management System"
        />

<input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    marginBottom: '20px',
    padding: '5px',
  }}
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
            ADD NEW FUEL STOCK
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddFuelstock onClose={closePopup} />
            </div>
          )}

          
<div className="buttons">
        <button onClick={handleDownloadPdf} className="update-button">
          Download as PDF
        </button>
        </div>
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

export default Fuelstock;

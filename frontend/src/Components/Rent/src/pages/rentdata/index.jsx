import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  useTheme,
  Button,
  IconButton,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddRent from './AddRent';
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Rent = () => {
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

  
  

  const [searchKeyword, setSearchKeyword] = useState("");
  const [originalRents, setOriginalRents] = useState([]);
  const [rents, setRents] = useState([]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);

    if (keyword === "") {
      setRents(originalRents);
    } else {
      const filteredRents = originalRents.filter((rent) =>
        rent.brand.toLowerCase().includes(keyword)
      );
      setRents(filteredRents);
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this rent record?');
  
    if (!confirmDelete) {
      return; // Do nothing if the user cancels the deletion
    }
  
    try {
      await axios.delete(`http://localhost:8411/rent/delete/${id}`);
      Notify('Rent Record Deleted Successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Error deleting rent record:", error.message);
    }
  };
  
  

  const rows = rents.map((rent) => ({
    id: rent.vehicle_no,
    vehicle_no: rent.vehicle_no,
    brand: rent.brand,
    vehicle_model: rent.vehicle_model,
    milage: rent.milage,
    capacity: rent.capacity,
    description: rent.description,
    receive_date: formatDate(rent.receive_date),
    return_date: formatDate(rent.return_date),
    owner_name: rent.owner_name,
    owner_phone: rent.owner_phone,
    owner_email: rent.owner_email,
    rental: rent.rental,
    total_rental: rent.total_rental,
  }));

  function Notify(message, type) {
    toast[type](message, {
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        position: "top-right",
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
            width: '300px',
            height: '100px',
            fontSize: '22px',
            alignItems: 'center',
            fontFamily: "Ropa Sans",
            display: 'flex',
            justifyContent: 'center',
            color: 'white',
        },
        bodyClassName: 'custom-toast-body'
    });
}

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const columns = [
    {
      field: "vehicle_no",
      headerName: "VEHICLE NO",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    // Add other columns here as needed
    {
      field: "brand",
      headerName: "BRAND",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicle_model",
      headerName: "VEHICLE MODEL",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    /* {
      field: "milage",
      headerName: "MILEAGE",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "capacity",
      headerName: "CAPACITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      headerAlign: "center",
      align: "center",
      width: 150,
    }, */
    {
      field: "receive_date",
      headerName: "RECEIVE DATE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "return_date",
      headerName: "RETURN DATE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "owner_name",
      headerName: "OWNER NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "owner_phone",
      headerName: "OWNER PHONE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    /* {
      field: "owner_email",
      headerName: "OWNER EMAIL",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "rental",
      headerName: "RENTAL",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    }, */
    {
      field: "total_rental",
      headerName: "TOTAL RENTAL",
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => (params.value ? params.value.toFixed(2) : "N/A"),
      width: 150,
    },
    // ... (other columns)
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
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#141B2D",
              },
            }}
          >
            <Link
              to={`/rent/uniquerent/${params.row.vehicle_no}`}
              state={{ rentData: params.row }}
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
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#141B2D",
              },
            }}
          >
            <Link
              to={`/rent/updateRent/${params.row.vehicle_no}`}
              state={{ rentData: params.row }}
              style={linkStyle}
            >
              EDIT
            </Link>
          </Button>
          <Button
            onClick={() => handleDelete(params.row.vehicle_no)}
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

  const fetchRents = async () => {
    try {
      const response = await fetch("http://localhost:8411/rent/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRents(data);
      setOriginalRents(data);
    } catch (error) {
      console.error("Error fetching Rents:", error);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4'); // Set page orientation to landscape
    const tableColumns = columns.filter((col) => col.field !== "OPERATIONS");
  
    // Define styles for table header and cell
    const headerStyles = {
      fillColor: [41, 128, 185], // Background color
      textColor: 255, // Text color (white)
      fontStyle: "bold",
      fontSize: 12,
    };
  
    const cellStyles = {
      halign: "center",
      valign: "middle",
      fontSize: 11,
      padding: 8,
      fillColor: [245, 245, 245], // Background color for cells
      textColor: 0, // Text color (black)
    };
  
    // Calculate the width for each column based on the available width
    const availableWidth = doc.internal.pageSize.getWidth() - 20; // Adjust the margin as needed
    const columnWidths = tableColumns.map((col, index) => ({
      columnWidth: availableWidth / tableColumns.length,
    }));
  
    doc.autoTable({
      head: [tableColumns.map((col) => col.headerName)],
      body: rows.map((row) => tableColumns.map((col) => row[col.field])),
      theme: "grid",
      styles: {
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: headerStyles,
      bodyStyles: cellStyles,
      columnStyles: columnWidths,
      margin: { top: 30 },
      addPageContent: function (data) {
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80); // Title text color
        doc.text("RENT MANAGER - Rent Data", 200, 20, "center");
      },
    });
  
    // Save the PDF with a custom file name
    doc.save("rent_data.pdf");
  };
  
  
  
  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="RENT MANAGER"
          subtitle="Welcome to LogiX Fleet Management System"
        />

        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={searchKeyword}
            onChange={handleSearch}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>

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
          ADD NEW RENT VEHICLE
        </Button>

        <Button
          onClick={downloadPDF}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginLeft: "10px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#1F2A40",
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          DOWNLOAD AS PDF
        </Button>

        {isPopupVisible && (
          <div className="overlay">
            <AddRent onClose={closePopup} />
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
      <ToastContainer/>
    </Box>
  );
};

export default Rent;


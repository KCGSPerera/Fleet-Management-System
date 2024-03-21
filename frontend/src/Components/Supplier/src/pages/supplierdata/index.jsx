import React, { useState, useEffect } from "react";
import { Box, useTheme, Button,} from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddSupplier from "./AddSupplier";
import jsPDF from "jspdf";
import "jspdf-autotable";
import emailjs from "emailjs-com";
//import { useParams } from "react-router-dom";
import "./index.css";

const Supplier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 /*  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; */

  const [isPopupVisible, setPopupVisible] = useState(false);
  //const [params, setParams] = useState(initialValue);

  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const extractDateOnly = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  //const [selectedRow, setSelectedRow] = useState(null);

  const [suppliers, setSuppliers] = useState([]);

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:8411/supplier/delete/${supplierId}`);
      alert('Supplier deleted successfully.');
      // Navigate to All Suppliers page
      window.location.reload();
    } catch (error) {
      alert('Error deleting supplier:', error.message);
    }
  };
 

  const rows = suppliers.map((supplier) =>  ({
    id: supplier.supplier_id,
    supplier_id:supplier.supplier_id,
    supplier_name:supplier.supplier_name,
    phone_number:supplier.phone_number,
    supplier_possition:supplier.supplier_possition,
    email:supplier.email,
    company_name:supplier.company_name,
    item_type:supplier.item_type,
    item_size:supplier.item_size,
    item_code:supplier.item_code,
    brand:supplier.brand,
    quntity:supplier.quntity,
    unit_price:supplier.unit_price,
    total_price:supplier.total_price,
    orderd_date:extractDateOnly(supplier.orderd_date),
    manufatured_date:extractDateOnly(supplier.manufatured_date),
    invoice_number:supplier.invoice_number,
    
  }));

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  useEffect(() => {
    emailjs.init("F1HHaZcKVNf2f_AfF");
},[]);
  
  function contactInventoryManager  (rowData)  {
    // Define your EmailJS service ID, template ID, and user ID
    const serviceId = "service_h7r71li";
    const templateId = "template_ie3ivc8";
    const userId = "F1HHaZcKVNf2f_AfF";

    //const message = `I have recived this ${brand} from this ${item_type}`;

  
    // Create a template parameters object with the product ID and any other data you want to include
    const templateParams = {
      to_name: 'Inventory Manager',
      from_name: 'Supply Manager',
      message:`
      Brand: ${rowData.brand}
      Item Type: ${rowData.item_type}
      Quantity: ${rowData.quntity}
    ` 
      
    };
  
    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully:",response);
        alert("Email sent successfully:");
        // Close the modal or perform any other actions
        
      })
      .catch((error) => {
        console.error("Email send error:", error);
        alert("Email send error:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };
  


  const columns = [
    
    {
      field: "supplier_id",
      headerName: "SUPPLIER ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "supplier_name",
      headerName: "SUPPLIER NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "phone_number",
      headerName: "PHONE  NUMBER",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "supplier_possition",
      headerName: "SUPPLOIER POSITION",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
   
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 500,
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
                to={`/supplier/uniqueSupplier/${params.row.supplier_id}`}
                state={{ supplierData: params.row }}
                style={linkStyle}
            >
              VIEW

            </Link>
          </Button>
          <Link 
    to={`/supplier/updateSupplier/${params.row.supplier_id}`}
    state={{ supplierData: params.row }}
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
        
         
          <Button onClick={() => handleDelete(params.row.supplier_id)}
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

          <Button 
            onClick={() => contactInventoryManager(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin:"2px",
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#1F2A40", // Red color on hover
              },
            }}
          >
           {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} />*/}
            EMAIL
          </Button>

        </div>
      ),
    },
  ];

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:8411/supplier/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching Suplier:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // State for filtered suppliers


  // Update the filteredSuppliers whenever searchTerm or suppliers changes
  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {

      const phoneStr = supplier.phone_number.toString();  
      const qun = supplier.quntity.toString();
      const itemSizeString = String(supplier.item_size);
      const unitPriceString = String(supplier.unit_price);
      const totalPriceString = String(supplier.total_price);

      return (
        supplier.supplier_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phoneStr.includes(searchTerm) || // Just check the converted phone number string
        supplier.supplier_possition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.item_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemSizeString.includes(searchTerm) ||
        supplier.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qun.includes(searchTerm) || 
        unitPriceString.includes(searchTerm) ||
        totalPriceString.includes(searchTerm) ||
        supplier.orderd_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.manufatured_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    });
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);



/*   const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const columns = [
      "Supplier ID",
      "Supplier Name",
      "Phone Number",
      "Supplier Possition",
      "Email",
      "Company Name",
      "Item Type",
      "Item Size",
      "Item code",
      "Brand",
      "Quantity",
      "Unit Price",
      "Total Price",
      "Ordered Date",
      "Manufactured Date",
      "Invoice Number"
    ];

  const rows = filteredSuppliers.map((supplier) => [
    supplier.supplier_id,
    supplier.supplier_name,
    supplier.phone_number,
    supplier.supplier_possition,
    supplier.email,
    supplier.company_name,
    supplier.item_type,
    supplier.item_size,
    supplier.item_code,
    supplier.brand,
    supplier.quntity,
    supplier.unit_price,
    supplier.total_price,
    supplier.orderd_date,
    supplier.manufatured_date,
    supplier.invoice_number
  ]);

  // Calculate the page height based on the number of rows
  const pageHeight = doc.internal.pageSize.height;
  const tableHeight = rows.length * 20; // Adjust as needed
  let y = 20; // Initial Y position

  if (tableHeight > pageHeight) {
    // Add a new page if the table exceeds the current page height
    doc.addPage();
  }

  // Add a page, set font size and text
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: y, // Start the table at the adjusted Y position
  });

  doc.save("suppliers.pdf");
}; */

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
  centerText('Supplier Details', 18, 16);

    // Add the current date to the bottom-right corner
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);
  

  const columns1 = [
    "Supplier ID",
    "Supplier Name",
    "Phone Number",
    "Supplier Possition",
    "Email",
    "Company Name",
    "Item Type",
    "Item Size"
  ];

  const columns2 = [
    "Item code",
    "Brand",
    "Quantity",
    "Unit Price",
    "Total Price",
    "Ordered Date",
    "Manufactured Date",
    "Invoice Number"
  ];

  

  const rows1 = filteredSuppliers.map((supplier) => [
    supplier.supplier_id,
    supplier.supplier_name,
    supplier.phone_number,
    supplier.supplier_possition,
    supplier.email,
    supplier.company_name,
    supplier.item_type,
    supplier.item_size
  ]);

  const rows2 = filteredSuppliers.map((supplier) => [
    supplier.item_code,
    supplier.brand,
    supplier.quntity,
    supplier.unit_price,
    supplier.total_price,
    extractDateOnly(supplier.orderd_date), // Only date without time
    extractDateOnly(supplier.manufatured_date), // Only date without time
    supplier.invoice_number
  ]);

  let y = 30; // Initial Y position

  // Generate the first table on the first page
  doc.autoTable({
    head: [columns1],
    body: rows1,
    startY: y
  });

  // Add a new page for the second table
  doc.addPage();

  // Add the centered headers to the second page
  centerText('Logix', 10, 20);
  centerText('Supplier Details', 18, 16);
  // Add the current date to the bottom-right corner for the second page
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

  // Generate the second table on the second page
  doc.autoTable({
    head: [columns2],
    body: rows2,
    startY: y
  });

  doc.save("suppliers.pdf");
};

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SUPPLIER MANAGER"
          subtitle="Welcome to LogiX Supplier Management System"
        />
        
<input
  type="text"
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
  className="search-input"
  placeholder="Search Supplier"
  style={{ width: '200px' }} // Adjust the width as needed
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
            ADD NEW SUPPLIER
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddSupplier onClose={closePopup} />
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
       <DataGrid
          rows={filteredSuppliers.map((supplier) => ({
            ...supplier,
            id: supplier.supplier_id,
          }))}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Supplier;

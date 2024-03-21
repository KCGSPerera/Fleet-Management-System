import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddInventory from './AddInventory';
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./index.css";


// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
//import jsPDF from "jspdf";
// import React, { useState, useEffect } from "react";


import { Bar } from "react-chartjs-2";




const Inventory = () => {
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
  const [inventories, setInventories] = useState([]);


  // bar chart implementation

  // const productNames = inventories.map((inventory) => inventory.name);
  // const productQuantities = inventories.map((inventory) => inventory.qty);

  // const chartData = {
  //   labels: productNames,
  //   datasets: [
  //     {
  //       label: "Quantity",
  //       data: productQuantities,
  //       backgroundColor: "rgba(75, 192, 192, 0.6)", // Customize the bar color
  //     },
  //   ],
  // };
  
  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: "Quantity",
  //       },
  //     },
  //   },
  // };

  // const chartOptions = {
  //   scales: {
  //     yAxes: [
  //       {
  //         type: 'linear', // Set the scale type to linear
  //         position: 'left', // Position of the scale
  //         ticks: {
  //           beginAtZero: true, // Start the scale from zero
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Quantity', // Label for the y-axis
  //         },
  //       },
  //     ],
  //   },
  // };

//   // Destroy existing chart
// if (myChart) {
//   myChart.destroy();
// }

// // Create a new chart
// myChart = new Chart(canvasRef.current, {
//   type: 'bar',
//   data: chartData,
//   options: chartOptions,
// });

  



  const handleDelete = async (itemId) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Do you want to delete the item?");
  
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
        // After successful deletion, update the inventories list to reflect the changes
        const updatedInventories = inventories.filter(
          (inventory) => inventory.pid !== itemId
        );
        setInventories(updatedInventories);
        alert("Item deleted successfully.");
        window.location.reload();
      } catch (error) {
        alert(`Error deleting item: ${error.message}`);
      }
    } else {
      // User clicked "No," do nothing
    }
  };
  const rows = inventories.map((inventory) => ({
    id: inventory.pid,
    pid: inventory.pid, // Update with the correct field name
    name: inventory.name,
    brand: inventory.brand,
    qty: inventory.qty,
    unit_price: inventory.unit_price,
    reorder_level: inventory.reorder_level,

  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "pid",
      headerName: "PRODUCT ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "name",
      headerName: "PRODUCT NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "brand",
      headerName: "BRAND",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "qty",
      headerName: "QUANTITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "unit_price",
      headerName: "UNIT PRICE",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "reorder_level",
      headerName: "REORDER LEVEL",
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
                to={`/inventory/uniqueinventory/${params.row.pid}`}
                state={{ inventoryData: params.row }}
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
          to={`/inventory/updateInventory/${params.row.pid}`}
          state={{ inventoryData: params.row }}
          style={linkStyle}
        >
            EDIT</Link>
          </Button>
          <Button onClick={() => handleDelete(params.row.pid)}
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

  const fetchInventories = async () => {
    try {
      const response = await fetch("http://localhost:8411/inventory/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInventories(data);
      // setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching Inventories:", error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);



  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventories, setFilteredInventories] = useState([]);
  
  useEffect(() => {
    const filtered = inventories.filter((inventory) => {
      const pidStr = inventory.pid ? String(inventory.pid).toLowerCase() : "";
      const qtyStr = inventory.qty ? String(inventory.qty).toLowerCase() : "";
      const unitPriceStr = inventory.unit_price ? String(inventory.unit_price).toLowerCase() : "";
      const reorderLevelStr = inventory.reorder_level ? String(inventory.reorder_level).toLowerCase() : "";
  
      const voltageStr = (typeof inventory.voltage === "object" && "value" in inventory.voltage) ? inventory.voltage.value.toLowerCase() : "";
      const ampHrsStr = (typeof inventory.amp_hrs === "object" && "value" in inventory.amp_hrs) ? inventory.amp_hrs.value.toLowerCase() : "";
      const manYearStr = (typeof inventory.vehicle_man_year === "object" && "value" in inventory.vehicle_man_year) ? inventory.vehicle_man_year.value.toLowerCase() : "";
  
      return (
        pidStr.includes(searchTerm.toLowerCase()) ||
        (inventory.type ? inventory.type.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        (inventory.name ? inventory.name.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        (inventory.brand ? inventory.brand.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        qtyStr.includes(searchTerm) ||
        unitPriceStr.includes(searchTerm) ||
        (inventory.size ? inventory.size.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        voltageStr.includes(searchTerm) ||
        ampHrsStr.includes(searchTerm) ||
        (inventory.man_date ? inventory.man_date.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        (inventory.exp_date ? inventory.exp_date.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        (inventory.vehicle_brand_and_model ? inventory.vehicle_brand_and_model.toLowerCase() : "").includes(searchTerm.toLowerCase()) ||
        manYearStr.includes(searchTerm) ||
        reorderLevelStr.includes(searchTerm) ||
        (inventory.invoice_number ? inventory.invoice_number.toLowerCase() : "").includes(searchTerm.toLowerCase())
      );
    });
    setFilteredInventories(filtered);
  }, [searchTerm, inventories]);
  








  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredRows, setFilteredRows] = useState([]); // Initialize with an empty array

  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   // Filter rows based on the search query
  //   const filteredData = inventories.filter((inventory) =>
  //     Object.values(inventory).some((value) =>
  //       String(value).toLowerCase().includes(query)
  //     )
  //   );
  //   setFilteredRows(filteredData);
  // };








  // search function

  

  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredRows, setFilteredRows] = useState({rows}); 


  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   // Filter rows based on the search query
  //   const filteredData = rows.filter((row) =>
  //     Object.values(row).some((value) =>
  //       String(value).toLowerCase().includes(query)
  //     )
  //   );
  //   setFilteredRows(filteredData);
  // };
// end of search function

// second handle search function

// const [searchQuery, setSearchQuery] = useState("");
// const [filteredRows, setFilteredRows] = useState({rows});


// const handleSearch = (e) => {
//   const query = e.target.value.toLowerCase();
//   setSearchQuery(query);

//   // Filter rows based on the search query
//   const filteredData = inventories.filter((inventory) =>
//     Object.values(inventory).some((value) =>
//       String(value).toLowerCase().includes(query)
//     )
//   );
//   setFilteredRows(filteredData);
// };
const handleDownloadPdf = () => {
  const doc = new jsPDF({ orientation: "landscape" });

  const centerText = (text, yPosition, fontSize) => {
    doc.setFontSize(fontSize);
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    const xPosition = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, xPosition, yPosition);
  };

  centerText('Logix', 10, 20);
  centerText('Inventory Details', 18, 16);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

  const columns1 = [
    "PID",
    "Type",
    "Name",
    "Brand",
    "Size",
    "Voltage",
    "Amp Hours",
    "Vehicle Brand & Model"
  ];

  const columns2 = [
    "Quantity",
    "Unit Price",
    //"Total Price",
    "Manufactured Date",
    "Expiry Date",
    "Reorder Level",
    //"Invoice Number",
    "Vehicle Manufacturing Year"
  ];

  const extractDateOnly = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  const rows1 = filteredInventories.map((inventory) => [
    inventory.pid,
    inventory.type,
    inventory.name,
    inventory.brand,
    inventory.size,
    inventory.voltage && inventory.voltage.value,
    inventory.amp_hrs && inventory.amp_hrs.value,
    inventory.vehicle_brand_and_model
  ]);

  const rows2 = filteredInventories.map((inventory) => [
    inventory.qty,
    inventory.unit_price,
    //inventory.total_price, // Assuming this property exists in your data
    extractDateOnly(inventory.man_date),
    extractDateOnly(inventory.exp_date),
    inventory.reorder_level,
    //inventory.invoice_number,
    inventory.vehicle_man_year //&& inventory.vehicle_man_year.value
  ]);

  let y = 30;

  doc.autoTable({
    head: [columns1],
    body: rows1,
    startY: y
  });

  doc.addPage();

  centerText('Logix', 10, 20);
  centerText('Inventory Details', 18, 16);
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

  doc.autoTable({
    head: [columns2],
    body: rows2,
    startY: y
  });

  doc.save("inventory.pdf");
};


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SPARE PARTS MANAGER"
          subtitle="Welcome to LogiX Fleet Management System"
        />

{/* // dila's one */}
<input
  type="text"
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
  className="search-input"
  placeholder="Search Spare Parts"
  style={{ width: '300px', height: '40px' }} // Adjust the width as needed
/>

{/* // Search box */}
{/* <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} 
          placeholder="Search"
          // value={searchQuery}
          // onChange={handleSearch}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box> */}

        {/* <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          // ... other styling ...
        }}
      >
        <DataGrid rows={filteredRows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box> */}

      {/* // end of search */}
        
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
            ADD NEW SPARE PART
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddInventory onClose={closePopup} />
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
        {/* <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} /> */}
        {/* <DataGrid rows={filteredRows} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.pid}/> */}
        {/* <DataGrid
          rows={filteredRows.length > 0 ? filteredRows : rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        /> */}


<DataGrid
  rows={filteredInventories.map((inventory) => ({
    ...inventory,
    id: inventory.pid, // Change "supplier_id" to "pid"
  }))}
  columns={columns}
  components={{ Toolbar: GridToolbar }}
/>

{/* // export bar chart */}
{/* <Bar data={chartData} options={chartOptions} /> */}


      </Box>
    </Box>
  );
};

export default Inventory;

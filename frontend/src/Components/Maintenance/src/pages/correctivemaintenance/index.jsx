import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddFuelstock from './AddMaintenance';
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./index.css";




const Maintenance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [job, setJob] = useState(null);
  
/* 
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; */

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  
  const [selectedRow, setSelectedRow] = useState(null);

  
  const [maintenanceJobs, setMaintenanceJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMaintenanceJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8411/corrective/display");
        setMaintenanceJobs(response.data);
      } catch (error) {
        alert("Error fetching maintenance jobs:", error.message);
      }
    };

    getMaintenanceJobs();
  }, []);

  //Fiter changes
  const filterMaintenanceJobs = () => {
    return maintenanceJobs.filter((job) => {
      return (
        job.jobID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };
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
    centerText('Maintenance Details', 18, 16);

    // Add the current date to the bottom-right corner
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.width - 100, doc.internal.pageSize.height - 10);

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const columns = [
      "Job ID",
      "DID",
      "Priority",
      "Vehicle No",
      "Date_report",
      "Description",
      "Parts Used"
     
    ];

    const rows = filterMaintenanceJobs().map((job) => [
      job.jobID,
      job.DID,
      job.priority,
      job.vehicleNo,
      formatDate(job.Date_report),
      job.description,
      job.parts_used,
    

    ]);

    let y = 30; // Initial Y position

    // Generate the table in the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: y,
    });

    doc.save("maintenance.pdf");
  };

  

  const handleDelete = async (jobID) => {
    // Display a confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this maintenance job?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8411/corrective/delete/${jobID}`);
        alert('Maintenance job deleted successfully.');
        window.location.href = "/maintenance";
      } catch (error) {
        alert('Error deleting maintenance job:', error.message);
      }
    }
  };
  const rows = maintenanceJobs.map((job) => ({
    id: job.jobID,
    jobID: job.jobID,
    priority: job.priority,
    vehicleNo: job.vehicleNo,
}));

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "jobID",
      headerName: "JOB ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicleNo",
      headerName: "VEHICLE NO",
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
    to={`/maintenance/uniqueMaintenance/${params.row.jobID}`}
    
    state={{ jobsData: params.row }}
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
    to={`/maintenance/updateMaintenance/${params.row.jobID}`}
    state={{ jobsData: params.row }}
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

          <Button onClick={() => handleDelete(params.row.jobID)}
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
  const getRowClassName = (params) => {
    const priority = params.getValue(params.id, "priority");
  
    if (priority === "High") {
      return "high-priority";
    } else if (priority === "Medium") {
      return "medium-priority";
    } else if (priority === "Low") {
      return "low-priority";
    }
  
    return "no-priority"; // This is optional, in case there's an entry without any set priority
  };
  
  

  const fetchJobData = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:8411/corrective/get/${id}`);
        setJob(response.data.correctiveMaintence);
      }
    } catch (error) {
      alert('Error fetching maintenance job:', error.message);
    }
};


  useEffect(() => {
    fetchJobData();
  }, []);


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="MAINTENANCE MANAGER"
          subtitle="Welcome to LogiX Maintenance Management System"
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
           CREATE JOB
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddFuelstock onClose={closePopup} />
            </div>
          )}
          <button onClick={handleDownloadPdf} className="update-button">
            Download as PDF
          </button>
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowStyle={getRowClassName} // Apply the row styles based on priority
        />
      </Box>
    </Box>
  );
};

export default Maintenance;



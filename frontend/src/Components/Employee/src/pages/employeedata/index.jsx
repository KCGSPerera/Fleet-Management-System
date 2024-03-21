import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddEmployee from "./AddEmployee";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Employee = () => {
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
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const dataGridRef = useRef(null);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const openDeleteDialog = (employee) => {
    setSelectedEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedEmployeeToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = (id) => {
    const employeeToDelete = employees.find((employee) => employee.eid === id);
    openDeleteDialog(employeeToDelete);
  };

  const confirmDelete = (id) => {
    axios
      .delete(`http://localhost:8411/employee/delete/${id}`)
      .then(() => {
        // Remove the deleted employee from the list
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.eid !== id)
        );
        setFilteredEmployees((prevFilteredEmployees) =>
          prevFilteredEmployees.filter((employee) => employee.eid !== id)
        );
        // Fetch updated employee data to refresh the list
        fetchEmployees();
        closeDeleteDialog();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8411/employee/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching Employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    const filtered = employees.filter(
      (employee) =>
        employee.ename.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.eid.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.jobroll.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    // Add this effect to auto-filter as you type
    handleSearch();
  }, [searchText]);

  const rows = filteredEmployees.map((employee) => ({
    id: employee.eid,
    eid: employee.eid,
    ename: employee.ename,
    gender: employee.gender,
    address: employee.address,
    phone: employee.phone,
    email: employee.email,
    dob: formatDate(employee.dob),
    jobroll: employee.jobroll,
    dlicense: employee.dlicense,
    bsal: employee.bsal,
  }));

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const columns = [
    {
      field: "eid",
      headerName: "EMPLOYEE ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "ename",
      headerName: "EMPLOYEE NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    // {
    //   field: "gender",
    //   headerName: "GENDER",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    {
      field: "address",
      headerName: "ADDRESS",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "phone",
      headerName: "PHONE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "dob",
      headerName: "DATE OF BIRTH",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "jobroll",
      headerName: "JOB ROLE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    // {
    //   field: "dlicense",
    //   headerName: "DRIVING LICENSE",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    {
      field: "bsal",
      headerName: "BASIC SALARY",
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
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#141B2D",
              },
            }}
          >
            <Link
              to={`/employee/uniqueEmployee/${params.row.id}`}
              state={{ employeeData: params.row }}
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
              to={`/employee/updateEmployee/${params.row.id}`}
              state={{ employeeData: params.row }}
              style={linkStyle}
            >
              EDIT
            </Link>
          </Button>
          <Button
            onClick={() => handleDelete(params.row.eid)}
            sx={{
              backgroundColor: "#FF0000",
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

  const handleDownloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define columns for the table
    const columnsForTable = [
      "EMPLOYEE ID",
      "EMPLOYEE NAME",
      //"GENDER",
      "ADDRESS",
      "PHONE",
      "EMAIL",
      //"DATE OF BIRTH",
      "JOB ROLE",
      //"DRIVING LICENSE",
      "BASIC SALARY",
    ];

    // Define rows for the table
    const rowsForTable = rows.map((row) => [
      row.eid,
      row.ename,
      //row.gender,
      row.address,
      row.phone,
      row.email,
      //row.dob,
      row.jobroll,
      //row.dlicense,
      row.bsal,
    ]);

    // Add a title to the PDF
    doc.text("Employee Data", 10, 10);

    // Auto-generate the table based on the columns and rows
    doc.autoTable({
      startY: 20,
      head: [columnsForTable],
      body: rowsForTable,
    });

    // Save or download the PDF
    doc.save("employee_data.pdf");
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Header
          title="EMPLOYEE MANAGER"
          subtitle="Welcome to LogiX Fleet Management System"
        />
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
            mr={1}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Employee ID, Name, or Job Role"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <IconButton type="button" onClick={handleSearch}>
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
            ADD NEW EMPLOYEE
          </Button>
          <Button
            onClick={handleDownloadPDF}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginLeft: "16px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#1F2A40",
              },
            }}
          >
            DOWNLOAD AS PDF
          </Button>
        </Box>
        {isPopupVisible && (
          <div className="overlay">
            <AddEmployee onClose={closePopup} />
          </div>
        )}
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="calc(80vh - 56px)"
        overflow="auto"
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
            color: `${
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : colors.greenAccent[200]
            } !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : colors.grey[100]
            } !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          ref={dataGridRef}
        />
      </Box>
      {selectedEmployeeToDelete && (
        <Dialog
          open={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.paper
                  : "",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {selectedEmployeeToDelete.ename}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeDeleteDialog}
              color="primary"
              style={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => confirmDelete(selectedEmployeeToDelete.eid)}
              color="primary"
              autoFocus
              style={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "",
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Employee;

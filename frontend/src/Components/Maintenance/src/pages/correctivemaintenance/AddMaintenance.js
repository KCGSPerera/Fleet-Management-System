import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {useTheme, ThemeProvider } from '@mui/material';
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";

import "./AddMaintenance.css";

const AddCorrectiveMaintenance = ({ onClose }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [jobID, setJobID] = useState("");
  const [DID, setDID] = useState("");
  const [Dname,setDname] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [Date_report, setDateReport] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [parts_used, setPartsUsed] = useState("");
  const [Date_complete, setDateComplete] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errors, setErrors] = useState({});

  const generateRandomJobID = () => {
    // Generate a random alphanumeric sequence
    const randomSequence = Math.random().toString(36).substr(2, 6).toUpperCase();
    const jobId = `CJ${randomSequence}`;
    setJobID(jobId);
  };


  const fetchDriverDetails = (eid) => {
    axios
      .get(`http://localhost:8411/employee/get/${eid}`)
      .then((response) => {
        // Assuming response.data contains the employee details, update Dname state
        setDname(response.data.employee.ename);
      })
      .catch((err) => {
        // alert(err);
      });
  };
  const handleDIDChange = (e) => {
    const newDID = e.target.value;
    setDID(newDID);
    fetchDriverDetails(newDID); // Fetch employee details when DID changes
  };

  function validateForm() {
    const errors = {};

    if (!jobID) {
      errors.jobID = "Job ID is required";
    }

    if (!DID) {
      errors.DID = "Driver ID is required";
    }

    if (!vehicleNo) {
      errors.vehicleNo = "Vehicle Number is required";
    } else if (!/^[A-Z0-9]{2,3}-[A-Z0-9]{1,5}$/.test(vehicleNo)) {
      errors.vehicleNo = "Invalid vehicle number format";
    }

    if (!Date_report) {
      errors.Date_report = "Date Report is required";
    }

    if (!priority) {
      errors.priority = "Priority is required";
    }

    if (!description) {
      errors.description = "Description is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newCorrectiveMaintenance = {
        jobID,
        DID,
        Dname,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete,
        latitude,
        longitude,
      };

      axios
        .post("http://localhost:8411/corrective/add", newCorrectiveMaintenance)
        .then((response) => {
          alert(response.data);
          alert("Corrective Maintenance Successfully Added");
          window.location.reload();

          setJobID("");
          setDID("");
          setDname("");
          setVehicleNo("");
          setDateReport("");
          setPriority("");
          setDescription("");
          setPartsUsed("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isNonMobile ? 600 : '100%', // full width on mobile
          height: 'auto',
          bgcolor: 'background.default', // use default background color from theme
          p: 5, // padding: 35px
          borderRadius: 2, // border-radius: 15px
        }}>
      <Header title="ADD CORRECTIVE MAINTENANCE" subtitle="Adding new corrective maintenance record" />
      <button className="addMaintenance-close" onClick={onClose}>
        Close
      </button>
      <form onSubmit={sendData} >
      <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": { undefined : "span 2" },
                  }}
                >
             <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Job ID"
            required
            value={jobID}
             // Generate random Job ID when the field is focused
            onClick={generateRandomJobID} // For better user experience, you can also generate on click
             // Disable manual input for Job ID
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Driver ID"
            required
            value={DID}
            onChange={(e) => {
              setDID(e.target.value);
              fetchDriverDetails(e.target.value); // Fetch driver details when DID changes
            }}
            error={errors.DID}
            helperText={errors.DID && "Driver ID is required"}
          />

          <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Driver Name"
          value={Dname}
          onChange={(e) => setDname(e.target.value)}
          
        />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Vehicle Number"
            required
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            error={errors.vehicleNo}
            helperText={errors.vehicleNo && "Invalid vehicle number format"}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date Report"
            required
            value={Date_report}
            onChange={(e) => setDateReport(e.target.value)}
            error={errors.Date_report}
            helperText={errors.Date_report && "Date Report is required"}
          />

          <FormControl fullWidth variant="filled">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              error={errors.priority}
              helperText={errors.priority && "Priority is required"}
            >
              <MenuItem value="">Select Priority</MenuItem>
              <MenuItem value="Low Priority">Low Priority</MenuItem>
              <MenuItem value="Medium Priority">Medium Priority</MenuItem>
              <MenuItem value="High Priority">High Priority</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description && "Description is required"}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" fullWidth>
          ADD CORRECTIVE MAINTENANCE
        </Button>
        </Box>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default AddCorrectiveMaintenance;

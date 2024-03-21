import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material';

//import './UpdateSupplier.css';

const UpdateTrip = () => {
  const location = useLocation();
  const theme = useTheme();

  const [tripData, setTripData] = useState(
    location.state?.tripData || {
      tripid: "",
      tripname: "",
      tripduration: "",
      tripdistance: "",
      vehicleno: "",
      driverid: "",
      startpoint: "",
      destination: "",
      tripgoods: "",
      arrivaltime: "",
      departuretime: "",
      startfuel: "",
      endfuel: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setTripData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    const tripidRegex = /^\d{4}$/;

    switch (id) {
      case "tripid":
        error = value.length !== 4 ? "Trip ID must be 4 numbers" : "";
        break;

      case "tripname":
        error = value.length > 20 ? "Trip Name should not exceed 20 characters" : "";
        break;

      case "tripdistance":
        const distanceValue = parseFloat(value);
        error = isNaN(distanceValue) || distanceValue <= 0 || distanceValue >= 700
          ? "Trip Distance must be a positive number less than 700"
          : "";
        break;

      case "tripduration":
        const durationValue = parseFloat(value);
        error = isNaN(durationValue) || durationValue <= 0 || durationValue >= 100
          ? "Trip Duration must be a positive number less than 100"
          : "";
        break;

      case "vehicleno":
        const vehicleNoRegex = /^\d{6}$/;
        error = !vehicleNoRegex.test(value) ? "Vehicle Number should have 6 numbers" : "";
        break;

      case "driverid":
        const driverIdRegex = /^[A-Za-z]{2}\d{4}$/;
        error = !driverIdRegex.test(value) ? "Driver ID should have 2 letters followed by 4 numbers" : "";
        break;

      case "startpoint":
        error = value.trim() === "" ? "Start Point is required" : "";
        break;

      case "destination":
        error = value.trim() === "" ? "Destination is required" : "";
        break;

      case "tripgoods":
        error = value.trim() === "" ? "Trip goods is required" : "";
        break;

      case "arrivaltime":
        error = value.trim() === "" ? "Arrival Time is required" : "";
        break;

      case "departuretime":
        error = value.trim() === "" ? "Departure Time is required" : "";
        break;

      case "startfuel":
        error = value.trim() === "" ? "Start Fuel is required" : "";
        break;

      case "endfuel":
        error = value.trim() === "" ? "End Fuel is required" : "";
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please correct the errors before updating.");
      return; // Stop the form submission
    }

    const newTrip = { ...tripData };

    if (newTrip.tripid) {
      axios
        .put(`http://localhost:8411/trip/update/${newTrip.tripid}`, newTrip)
        .then((response) => {
          resetForm();
          window.location.href = "/trip/tripdata";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Trip ID is required.");
    }
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/trip/get/${searchQ}`
          );

          if (response.data.trip) {
            setTripData(response.data.trip);
          }
        }
      } catch (error) {
        alert("Error fetching trip: " + error.message);
      }
    };

    fetchTripData();
  }, [searchQ]);

  const resetForm = () => {
    setTripData({
      tripid: "",
      tripname: "",
      tripduration: "",
      tripdistance: "",
      vehicleno: "",
      driverid: "",
      startpoint: "",
      destination: "",
      tripgoods: "",
      arrivaltime: "",
      departuretime: "",
      startfuel: "",
      endfuel: "",
    });
    setErrors({});
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/trip/tripdata');
  };

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px">
      <Formik onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
          {tripData.tripid && (
            <Header
              title={`EDIT TRIP DATA FOR ${tripData.tripid}`}
              subtitle="Update Trip Data"
            />
          )}

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Trip ID to Update"
            id="tripid"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Trip Data"
            name="tripid"
            sx={{ gridColumn: "span 2" }}
          />

          <Box
            display="grid"
            gap=""
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                id="tripid"
                label="Trip ID"
                variant="outlined"
                value={tripData.tripid}
                onChange={handleInputChange}
                error={!!errors.tripid}
                helperText={errors.tripid}
              />
              <TextField
                fullWidth
                id="tripname"
                label="Trip Name"
                variant="outlined"
                value={tripData.tripname}
                onChange={handleInputChange}
                error={!!errors.tripname}
                helperText={errors.tripname}
              />
              <TextField
                fullWidth
                id="tripduration"
                label="Trip Duration"
                variant="outlined"
                value={tripData.tripduration}
                onChange={handleInputChange}
                error={!!errors.tripduration}
                helperText={errors.tripduration}
              />
              <TextField
                fullWidth
                id="tripdistance"
                label="Trip Distance"
                variant="outlined"
                value={tripData.tripdistance}
                onChange={handleInputChange}
                error={!!errors.tripdistance}
                helperText={errors.tripdistance}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                id="vehicleno"
                label="Vehicle Number"
                variant="outlined"
                value={tripData.vehicleno}
                onChange={handleInputChange}
                error={!!errors.vehicleno}
                helperText={errors.vehicleno}
              />
              <TextField
                fullWidth
                id="driverid"
                label="Driver ID"
                variant="outlined"
                value={tripData.driverid}
                onChange={handleInputChange}
                error={!!errors.driverid}
                helperText={errors.driverid}
              />
              <TextField
                fullWidth
                id="startpoint"
                label="Start Point"
                variant="outlined"
                value={tripData.startpoint}
                onChange={handleInputChange}
                error={!!errors.startpoint}
                helperText={errors.startpoint}
              />
              <TextField
                fullWidth
                id="destination"
                label="Destination"
                variant="outlined"
                value={tripData.destination}
                onChange={handleInputChange}
                error={!!errors.destination}
                helperText={errors.destination}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                id="tripgoods"
                label="Trip Goods"
                variant="outlined"
                value={tripData.tripgoods}
                onChange={handleInputChange}
                error={!!errors.tripgoods}
                helperText={errors.tripgoods}
              />
              <TextField
                fullWidth
                id="arrivaltime"
                label="Arrival Time"
                variant="outlined"
                value={tripData.arrivaltime}
                onChange={handleInputChange}
                error={!!errors.arrivaltime}
                helperText={errors.arrivaltime}
              />
              <TextField
                fullWidth
                id="departuretime"
                label="Departure Time"
                variant="outlined"
                value={tripData.departuretime}
                onChange={handleInputChange}
                error={!!errors.departuretime}
                helperText={errors.departuretime}
              />
              <TextField
                fullWidth
                id="startfuel"
                label="Start Fuel"
                variant="outlined"
                value={tripData.startfuel}
                onChange={handleInputChange}
                error={!!errors.startfuel}
                helperText={errors.startfuel}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                id="endfuel"
                label="End Fuel"
                variant="outlined"
                value={tripData.endfuel}
                onChange={handleInputChange}
                error={!!errors.endfuel}
                helperText={errors.endfuel}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" >
<button
               className="buttonm"
               type="submit"
               fullWidth
               style={{
                 width: '100%',
                 backgroundColor: 'red',
                 color: 'white',
                 padding: '10px',
                 border: 'none',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s',
               }}
               onMouseEnter={(e) => {
                 e.target.style.backgroundColor = 'darkred';
               }}
               onMouseLeave={(e) => {
                 e.target.style.backgroundColor = 'red';
               }}
             >
               UPDATE TRIP DATA
             </button>
             <button
               className="buttonm"
               onClick={handleButtonClick}
               fullWidth
               style={{
                 width: '100%',
                 backgroundColor: 'green',
                 color: 'white',
                 padding: '10px',
                 border: 'none',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s',
               }}
               onMouseEnter={(e) => {
                 e.target.style.backgroundColor = 'darkred';
               }}
               onMouseLeave={(e) => {
                 e.target.style.backgroundColor = 'green';
               }}
             >
               BACK TO TRIP DATA
             </button>
          </Box>
        </form>
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default UpdateTrip;

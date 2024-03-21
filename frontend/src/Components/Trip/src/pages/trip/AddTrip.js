import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useTheme, ThemeProvider } from '@mui/material';

import "./AddTrip.css";

const generateRandomLetters = (length) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};

const generateTripID = () => {
  const randomLetters = generateRandomLetters(2);
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  return `${randomLetters}${randomNumber}`;
};



const AddTrip = ({ onClose }) => {
  
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const location = useLocation();
  const [isTripIdUnique, setIsTripIdUnique] = useState(true);

  

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    tripid:"",
    tripname:"",
    tripduration:"",
    tripdistance:"",
    vehicleno:"",
    driverid:"",
    startpoint:"",
    destination:"",
    tripgoods:"",
    arrivaltime:"",
    departuretime:"",
    startfuel:"",
    endfuel:"",

  };
  const [tripid, setTripID] = useState("");
  const [tripname, setTripName] = useState("");
  const [tripduration, setTripDuration] = useState("");
  const [tripdistance, setTripDistance] = useState("");
  const [vehicleno, setVehicleNo] = useState("");
  const [driverid, setDriverId] = useState("");
  const [startpoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [tripgoods, setTripGoods] = useState("");
  const [arrivaltime, setArrivalTime] = useState("");
  const [departuretime, setDepartureTime] = useState("");
  const [startfuel, setStartFuel] = useState("");
  const [endfuel, setEndFuel] = useState("");

  const [tripidError, setTripIDError] = useState("");
  const [tripnameError, setTripNameError] = useState("");
  const [tripdurationError, setTripDurationError] = useState("");
  const [tripdistanceError, setTripDistanceError] = useState("");
  const [vehiclenoError, setVehicleNoError] = useState("");
  const [driveridError, setDriverIdError] = useState("");
  const [startpointError, setStartPointError] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [tripgoodsError, setTripGoodsError] = useState("");
  const [arrivaltimeError, setArrivalTimeError] = useState("");
  const [departuretimeError, setDepartureTimeError] = useState("");
  const [startfuelError, setStartFuelError] = useState("");
  const [endfuelError, setEndFuelError] = useState("");

  const [errors, setErrors] = useState({});

  const sentData = (e) => {
    e.preventDefault();
  
    alert("Insert");
    if (
      !validateTripId(tripid)||
      !validateTripName(tripname) ||
      !validateTripDuration(tripduration) ||
      !validateTripDistance(tripdistance) ||
      !validateVehicleNo(vehicleno) ||
      !validateDriverId(driverid) ||
      !validateStartPoint(startpoint) ||
      !validateDestination(destination) ||
      !validateTripGoods(tripgoods) ||
      !validateArrivalTime(arrivaltime) ||
      !validateDepartureTime(departuretime) ||
      !validateStartFuel(startfuel) ||
      !validateEndFuel(endfuel)
    ) {
      return;
    }
    const newTrip = {
      tripid,
      tripname,
      tripduration,
      tripdistance,
      vehicleno,
      driverid,
      startpoint,
      destination,
      tripgoods,
      arrivaltime,
      departuretime,
      startfuel,
      endfuel,
    };
  
    axios
      .post("http://localhost:8411/trip/add", newTrip)
      .then((response) => {
        alert("Trip added successfully");
        window.location.href = "/tripdata";
        window.location.reload();
  
        setTripID("");
        setTripName("");
        setTripDuration("");
        setTripDistance("");
        setVehicleNo("");
        setDriverId("");
        setStartPoint("");
        setDestination("");
        setTripGoods("");
        setArrivalTime("");
        setDepartureTime("");
        setStartFuel("");
        setEndFuel("");
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });
  };
  
  function handleCancel() {
    // Clear form fields when the "Cancel" button is clicked
    setTripID("");
        setTripName("");
        setTripDuration("");
        setTripDistance("");
        setVehicleNo("");
        setDriverId("");
        setStartPoint("");
        setDestination("");
        setTripGoods("");
        setArrivalTime("");
        setDepartureTime("");
        setStartFuel("");
        setEndFuel("");
  }
  
  

  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
 // handleChange(e); // Use Formik's handleChange to update Formik state
  if (!value) {
    setErrors({ ...errors, [name]: 'Trip ID is required' });
  } else {
    const regex = /^\d{4}$/;
    setErrors({
      ...errors,
      [name]: regex.test(value) ? null : 'Trip ID should be 4 numbers',
    });
  }
};

const validateTripId = (tripid) => {
  if (!tripid ) {
    setTripIDError("Trip ID is required.");
    return false;
  }

  // Use a regex to validate that tripid contains at least 4 digits
  if (!/^\d{4,}$/.test(tripid)) {
    setTripIDError("Trip ID should contain at least 4 digits.");
    return false;
  }

  // You can add additional validation logic if needed

  setTripIDError("");
  return true;
};


const validateTripName = (tripname) => {
  if (!tripname) {
    setTripNameError("Trip name is required.");
    return false;
  }

  if (tripname.length > 20) {
    setTripNameError("Trip name cannot be more than 20 characters.");
    return false;
  }

  // You can add additional validation logic if needed

  setTripNameError("");
  return true;
};


const validateTripDistance = (tripdistance) => {
  if (!tripdistance) {
    setTripDistanceError("Trip Distance is required.");
    return false;
  }

  if (isNaN(tripdistance)) {
    setTripDistanceError("Trip Distance must be a number.");
    return false;
  }

  if (tripdistance <= 0) {
    setTripDistanceError("Trip Distance must be greater than 0 km.");
    return false;
  }

  if (tripdistance >= 700) {
    setTripDistanceError("Trip Distance must be lower than 700 km.");
    return false;
  }

  // If all conditions pass, clear the error message
  setTripDistanceError("");
  return true;
};

  
  const validateTripDuration = (tripduration) => {
    if (!tripduration) {
      setTripDurationError("Trip Duration is required.");
      return false;
    }
  
    if (isNaN(tripduration)) {
      setTripDistanceError("Trip Duration must be a number.");
      return false;
    }
  
    if (tripduration <= 0) {
      setTripDurationError("Trip Duration must be greater than 0 hours.");
      return false;
    }

    if (tripduration >= 100) {
      setTripDurationError("Trip Duration must be lower than 100 hours.");
      return false;
    }
  
    setTripDurationError("");
    return true;
  };
  

  const validateVehicleNo = (vehicleno) => {
    if (!vehicleno) {
      setVehicleNoError("Vehicle Number is required.");
      return false;
    }
  
    // Use a regular expression to check if vehicleno contains exactly 6 digits
    const vehicleNoPattern = /^\d{6}$/;
    if (!vehicleNoPattern.test(vehicleno)) {
      setVehicleNoError("Vehicle Number must contain exactly 6 numbers.");
      return false;
    }
  
    // If all conditions pass, clear the error message
    setVehicleNoError("");
    return true;
  };
  
  
  const validateDriverId = (driverid) => {
    if (!driverid) {
      setDriverIdError("Driver ID is required.");
      return false;
    }
  
    // Check if driverid has at least 2 characters and 4 numbers
    const driverIdPattern = /^(?=.*[a-zA-Z]{2})(?=.*\d{4})/;
    if (!driverIdPattern.test(driverid)) {
      setDriverIdError("Driver ID must have at least 2 characters and 4 numbers.");
      return false;
    }
  
    // If all conditions pass, clear the error message
    setDriverIdError("");
    return true;
  };
  
  const validateStartPoint = (startpoint) => {
    if (!startpoint) {
      setStartPointError("Start Point is required.");
      return false;
    }
  
    // You can add additional start point validation logic here
  
    setStartPointError("");
    return true;
  };
  
  const validateDestination = (destination) => {
    if (!destination) {
      setDestinationError("Destination is required.");
      return false;
    }
  
    // You can add additional destination validation logic here
  
    setDestinationError("");
    return true;
  };
  
  const validateTripGoods = (tripgoods) => {
    if (!tripgoods) {
      setTripGoodsError("Trip Goods are required.");
      return false;
    }
  
    // You can add additional trip goods validation logic here
  
    setTripGoodsError("");
    return true;
  };
  
  const validateArrivalTime = (arrivaltime) => {
    if (!arrivaltime) {
      setArrivalTimeError("Arrival Time is required.");
      return false;
    }
  
    // Define a regular expression pattern for a date and time format
   // const dateTimePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}(?: [APap][Mm])?$/;
  
    // Check if arrivaltime matches the dateTimePattern
    /*if (!dateTimePattern.test(arrivaltime)) {
      setArrivalTimeError("Arrival Time should be in the format DD-MM-YYYY HH:MM AM/PM (optional).");
      return false;
    }*/
  
    // If all conditions pass, clear the error message
    setArrivalTimeError("");
    return true;
  };
  
  
  
  
  const validateDepartureTime = (departuretime) => {
    if (!departuretime) {
      setDepartureTimeError("Departure Time is required.");
      return false;
    }
  
    // Define a regular expression pattern for a date and time format
   /* const dateTimePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}(?: [APap][Mm])?$/;
  
    // Check if departuretime matches the dateTimePattern
    if (!dateTimePattern.test(departuretime)) {
      setDepartureTimeError("Departure Time should be in the format DD-MM-YYYY HH:MM AM/PM (optional).");
      return false;
    }
  
    // Parse the departuretime into a Date object
    const departureDate = new Date(departuretime);
  
    // Get the current date and time
    const currentDate = new Date();
  
    // Check if departuretime is before the current date and time
    if (departureDate >= currentDate) {
      setDepartureTimeError("Departure Time must be before the current date and time.");
      return false;
    }*/
  
    // If all conditions pass, clear the error message
    setDepartureTimeError("");
    return true;
  };
  
  
  
  const validateStartFuel = (startfuel) => {
    if (!startfuel) {
      setStartFuelError("Start Fuel is required.");
      return false;
    }
  
    if (isNaN(startfuel)) {
      setStartFuelError("Start Fuel must be a number.");
      return false;
    }
  
    if (parseFloat(startfuel) < 0) {
      setStartFuelError("Start Fuel cannot be lower than 0.");
      return false;
    }
  
    // If all conditions pass, clear the error message
    setStartFuelError("");
    return true;
  };
  
  
  const validateEndFuel = (endfuel) => {
    if (!endfuel) {
      setEndFuelError("End Fuel is required.");
      return false;
    }
  
    if (isNaN(endfuel)) {
      setEndFuelError("End Fuel must be a number.");
      return false;
    }
  
    if (endfuel < 0) {
      setEndFuelError("End Fuel cannot be negative.");
      return false;
    }
  
    setEndFuelError("");
    return true;
  };


  // ... (previous code)

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
          p: 3, // padding: 35px
          borderRadius: 2, // border-radius: 15px
        }}>
    <button className="addTrip-close" onClick={onClose}>
      Close
    </button>
   <Formik onSubmit={sentData} initialValues={initialValues}>
{({ values, errors, touched, handleBlur, handleChange }) => (
  <form onSubmit={sentData}>
          <center>
            <Header title="ADD TRIP" subtitle="Add a new trip to the trip management system" />
          </center>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            
            
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setTripID(e.target.value);
                  validateTripId(e.target.value);
                  handleChange(e);
                }}
                value={values.tripid}
                name="tripid"
                error={!!touched.tripid && !!errors.trip}
                helperText={touched.tripid && errors.trip}
                sx={{ gridColumn: "span 2" }}
              />
              {tripidError && <div className="text-danger">{tripidError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TRIP NAME"
                onBlur={handleBlur}
                onChange={(e) => {
                  setTripName(e.target.value);
                  validateTripName(e.target.value);
                  handleChange(e);
                }}
                value={values.tripname}
                name="tripname"
                error={!!touched.tripname && !!errors.tripname}
                helperText={touched.tripname && errors.tripname}
                sx={{ gridColumn: "span 2" }}
              />
              {tripnameError && <div className="text-danger">{tripnameError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP DURATION"
                onBlur={handleBlur}
                onChange={(e) => {
                  setTripDuration(e.target.value);
                  //validateTripDuration(e.target.value);
                  handleChange(e);
                }}
                value={values.tripduration}
                name="tripduration"
                error={!!touched.tripduration && !!errors.tripduration}
                helperText={touched.tripduration && errors.tripduration}
                sx={{ gridColumn: 'span 2' }}
              />
              {tripdurationError && <div className="text-danger">{tripdurationError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP DISTANCE"
                onBlur={handleBlur}
                onChange={(e) => {
                  setTripDistance(e.target.value);
                  validateTripDistance(e.target.value);
                  handleChange(e);
                }}
                value={values.tripdistance}
                name="tripdistance"
                error={!!touched.tripdistance && !!errors.tripdistance}
                helperText={touched.tripdistance && errors.tripdistance}
                sx={{ gridColumn: 'span 2' }}
              />
              {tripdistanceError && <div className="text-danger">{tripdistanceError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="VEHICLE NUMBER"
                onBlur={handleBlur}
                onChange={(e) => {
                  setVehicleNo(e.target.value);
                  validateVehicleNo(e.target.value);
                  handleChange(e);
                }}
                value={values.vehicleno}
                name="vehicleno"
                error={!!touched.vehicleno && !!errors.vehicleno}
                helperText={touched.vehicleno && errors.vehicleno}
                sx={{ gridColumn: 'span 2' }}
              />
              {vehiclenoError && <div className="text-danger">{vehiclenoError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DRIVER ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setDriverId(e.target.value);
                  validateDriverId(e.target.value);
                  handleChange(e);
                }}
                value={values.driverid}
                name="driverid"
                error={!!touched.driverid && !!errors.driverid}
                helperText={touched.driverid && errors.driverid}
                sx={{ gridColumn: 'span 2' }}
              />
              {driveridError && <div className="text-danger">{driveridError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="START POINT"
                onBlur={handleBlur}
                onChange={(e) => {
                  setStartPoint(e.target.value);
                  validateStartPoint(e.target.value);
                  handleChange(e);
                }}
                value={values.startpoint}
                name="startpoint"
                error={!!touched.startpoint && !!errors.startpoint}
                helperText={touched.startpoint && errors.startpoint}
                sx={{ gridColumn: 'span 2' }}
              />
              {startpointError && <div className="text-danger">{startpointError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DESTINATION"
                onBlur={handleBlur}
                onChange={(e) => {
                  setDestination(e.target.value);
                  validateDestination(e.target.value);
                  handleChange(e);
                }}
                value={values.destination}
                name="destination"
                error={!!touched.destination && !!errors.destination}
                helperText={touched.destination && errors.destination}
                sx={{ gridColumn: 'span 2' }}
              />
              {destinationError && <div className="text-danger">{destinationError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TRIP GOODS"
                onBlur={handleBlur}
                onChange={(e) => {
                  setTripGoods(e.target.value);
                  validateTripGoods(e.target.value);
                  handleChange(e);
                }}
                value={values.tripgoods}
                name="tripgoods"
                error={!!touched.tripgoods && !!errors.tripgoods}
                helperText={touched.tripgoods && errors.tripgoods}
                sx={{ gridColumn: 'span 2' }}
              />
              {tripgoodsError && <div className="text-danger">{tripgoodsError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="ARRIVAL TIME"
                onBlur={handleBlur}
                onChange={(e) => {
                  setArrivalTime(e.target.value);
                  validateArrivalTime(e.target.value);
                  handleChange(e);
                }}
                value={values.arrivaltime}
                name="arrivaltime"
                error={!!touched.arrivaltime && !!errors.arrivaltime}
                helperText={touched.arrivaltime && errors.arrivaltime}
                sx={{ gridColumn: 'span 2' }}
              />
              {arrivaltimeError && <div className="text-danger">{arrivaltimeError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="DEPARTURE TIME"
                onBlur={handleBlur}
                onChange={(e) => {
                  setDepartureTime(e.target.value);
                  validateDepartureTime(e.target.value);
                  handleChange(e);
                }}
                value={values.departuretime}
                name="departuretime"
                error={!!touched.departuretime && !!errors.departuretime}
                helperText={touched.departuretime && errors.departuretime}
                sx={{ gridColumn: 'span 2' }}
              />
              {departuretimeError && <div className="text-danger">{departuretimeError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="START FUEL"
                onBlur={handleBlur}
                onChange={(e) => {
                  setStartFuel(e.target.value);
                  validateStartFuel(e.target.value);
                  handleChange(e);
                }}
                value={values.startfuel}
                name="startfuel"
                error={!!touched.startfuel && !!errors.startfuel}
                helperText={touched.startfuel && errors.startfuel}
                sx={{ gridColumn: 'span 2' }}
              />
              {startfuelError && <div className="text-danger">{startfuelError}</div>}
            </div>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="END FUEL"
                onBlur={handleBlur}
                onChange={(e) => {
                  setEndFuel(e.target.value);
                  validateEndFuel(e.target.value);
                  handleChange(e);
                }}
                value={values.endfuel}
                name="endfuel"
                error={!!touched.endfuel && !!errors.endfuel}
                helperText={touched.endfuel && errors.endfuel}
                sx={{ gridColumn: 'span 2' }}
              />
              {endfuelError && <div className="text-danger">{endfuelError}</div>}
            </div>
          </Box>

          <center>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginRight: '10px' }}
              >
                ADD TRIP
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                //type="button"
                onClick={handleCancel}
              >
                CANCEL
              </Button>
            </Box>
          </center>
        </form>
      )}
    </Formik>
  </Box>
  </ThemeProvider>
);
};


export default AddTrip;

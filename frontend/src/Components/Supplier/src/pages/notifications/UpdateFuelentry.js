import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import "./UpdateFuelentry.css";

const UpdateFuelentry = () => {
  const location = useLocation();

  const [fuelentryData, setFuelentryData] = useState(
    location.state?.fuelentryData || {
      vehicle_id: "",
      fuel_date: "",
      fuel_type: "",
      fuel_quantity: "",
      fuel_cost: "",
      vehicle_milage: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setFuelentryData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    switch (id) {
      case "vehicle_id":
        error = value.length !== 6 ? "Vehicle ID must be 6 characters" : "";
        break;

      case "fuel_date":
        if (!value) {
          error = "Fuel Date is required";
        } else {
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            error = "Invalid date format";
          }
        }
        break;

      case "fuel_type":
        error = value.trim() === "" ? "Fuel Type is required" : "";
        break;

      case "fuel_quantity":
        error = isNaN(value) ? "Fuel Quantity should contain only numbers" : "";
        break;

      case "fuel_cost":
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
        break;

      case "vehicle_milage":
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
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

    const newFuelentry = { ...fuelentryData };

    if (newFuelentry.vehicle_id) {
      axios
        .put(`http://localhost:8411/fuelentry/update/${newFuelentry.vehicle_id}`, newFuelentry)
        .then((response) => {
          resetForm();
          //alert("Fuel entry successfully updated.");
          window.location.href = "/fuel/fuelentry";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Vehicle Id is required.");
    }
    //alert("Insert");
    const {
      vehicle_id,
      fuel_date,
      fuel_type,
      fuel_quantity,
      fuel_cost,
      vehicle_milage
    } = fuelentryData;

    if (fuelentryData.vehicle_id) {
      const newFuelentry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      };

      axios
        .put(`http://localhost:8411/fuelentry/update/${vehicle_id}`, newFuelentry)
        .then((response) => {
          resetForm();
          alert("Fuel entry successfully updated.");
          window.location.href = "/fuel/allFuelentries";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Vehicle Id is required.");
    }
  };

  useEffect(() => {
    const fetchFuelentryData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/fuelentry/get/${searchQ}`
          );

          if (response.data.fuelentry) {
            setFuelentryData(response.data.fuelentry);
          }
        }
      } catch (error) {
        alert("Error fetching fuel entry: " + error.message);
      }
    };

    fetchFuelentryData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelentryData({
      vehicle_id: "",
      fuel_date: "",
      fuel_type: "",
      fuel_quantity: "",
      fuel_cost: "",
      vehicle_milage: ""
    });
    setErrors({});
  };

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };
  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelentry');
  };
  return (
    <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form className="updateFuelEntryForm" onSubmit={handleSubmit}>
        
        {fuelentryData.vehicle_id && (
      <Header
        title={`EDIT FUEL DISPATCH DATA FOR ${fuelentryData.vehicle_id}`}
        subtitle="Update Fuel Dispatch Data"
      />
    )}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Vehicle ID to Update"
            id="vehicle_id"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Vehicle ID"
            name="vehicle_id"
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
                variant="filled"
                type="text"
                label="VEHICLE ID"
                id="vehicle_id"
                onChange={handleInputChange}
                value={fuelentryData.vehicle_id}
                name="vehicle_id"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="FUEL DATE"
                id="fuel_date"
                onChange={(e) => handleInputChange(e, "fuel_Date")}
                value={fuelentryData.fuel_date}
                name="fuel_date"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="FUEL TYPE"
              id="fuel_type"
              onChange={(e) => handleInputChange(e, "fuel_Type")}
              value={fuelentryData.fuel_type}
              name="fuel_type"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="FUEL QUANTITY"
              id="fuel_quantity"
              onChange={(e) => handleInputChange(e, "fuel_Quantity")}
              value={fuelentryData.fuel_quantity}
              name="fuel_quantity"
              sx={{ gridColumn: "span 4" }}
            /></Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="FUEL COST"
              id="fuel_cost"
              onChange={(e) => handleInputChange(e, "fuel_Cost")}
              value={fuelentryData.fuel_cost}
              name="fuel_cost"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="VEHICLE MILAGE"
              id="vehicle_milage"
              onChange={(e) => handleInputChange(e, "vehicle_Milage")}
              value={fuelentryData.vehicle_milage}
              name="vehicle_milage"
              sx={{ gridColumn: "span 4" }}
            /></Box>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE FUEL ENTRY
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}>
              BACK TO FUEL DISPATCH
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default UpdateFuelentry;

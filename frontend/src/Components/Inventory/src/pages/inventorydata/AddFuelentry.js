import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

//import "./AddFuelentry.css";


const AddFuelentry = ({onClose}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  
  const handleFormSubmit = (values) => {
      console.log(values);
  };

  const initialValues = {
    vehicle_id: "",
    fuel_date: "",
    fuel_type: "",
    fuel_quantity: "",
    fuel_cost: "",
    vehicle_milage: "",
  };    

  const checkoutSchema = yup.object().shape({
    vehicle_id: yup.string().required("Required"),
    fuel_date: yup.date().required("Required"), // Use yup.date() for date validation
    fuel_type: yup.string().required("Required"),
    fuel_quantity: yup.number().required("Required"), // Use yup.number() for number validation
    fuel_cost: yup.number().required("Required"),
    vehicle_milage: yup.number().required("Required"),
  });
  

  const [vehicle_id, setVehicle_Id] = useState("");
  const [fuel_date, setFuel_Date] = useState("");
  const [fuel_type, setFuel_Type] = useState("");
  const [fuel_quantity, setFuel_Quantity] = useState("");
  const [fuel_cost, setFuel_Cost] = useState("");
  const [vehicle_milage, setVehicle_Milage] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!vehicle_id) {
      errors.vehicle_id = "Invoice No is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(vehicle_id)) {
        errors.vehicle_id = "Invoice No should be 2 letters followed by 4 numbers";
      }
    }

    if (!fuel_date) {
      errors.fuel_date = "Fuel Date is required";
    } else {
      const isValidDate = !isNaN(new Date(fuel_date).getTime());

      if (!isValidDate) {
        errors.fuel_date = "Invalid date format";
      }
    }

    if (!fuel_type) {
      errors.fuel_type = "Fuel Type is required";
    }

    if (!fuel_quantity) {
      errors.fuel_quantity = "Fuel Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(fuel_quantity)) {
        errors.fuel_quantity = "Fuel Quantity should contain only numbers";
      }
    }

    if (!fuel_cost) {
      errors.fuel_cost = "Fuel Cost is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(fuel_cost)) {
        errors.fuel_cost = "Fuel Cost should be a valid float value";
      }
    }

    if (!vehicle_milage) {
      errors.vehicle_milage = "Vehicle Milage is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(vehicle_milage)) {
        errors.vehicle_milage = "Vehicle Milage should be a valid float value";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

      const newFuelentry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      };

      axios
        .post("http://localhost:8411/fuelentry/add", newFuelentry)
        .then((response) => {
          //alert(response.data.message);
          alert("Fuel Entry Successfully added");
          window.location.href = "/fuelentry";
          // ... rest of the code to reset form fields

          window.location.reload();

          setVehicle_Id('');
          setFuel_Date('');
          setFuel_Type('');
          setFuel_Quantity('');
          setFuel_Cost('');
          setVehicle_Milage('');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  const navigate = useNavigate();

  return (
    
    <Box m="20px">
          
          <button className="close-button" onClick={onClose}>
          Close
        </button>
          <Formik onSubmit={sentData} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form className="addFuelEntryForm" onSubmit={sentData}>
                <center><Header title="ADD FUEL DISPATCH" subtitle="Add a new fuel dispatch data to fleet" /></center>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  
                    
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="VEHICLE NO"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setVehicle_Id(e.target.value);
                      setErrors({ ...errors, vehicle_id: null });
                      handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                    }}
                    value={values.vehicle_id}
                    name="vehicle_id"
                    error={!!touched.vehicle_id && !!errors.vehicle_id}
                    helperText={touched.vehicle_id && errors.vehicle_id}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="FUEL DATE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFuel_Date(e.target.value);
                      setErrors({ ...errors, fuel_date: null });
                      handleChange(e);
                    }}
                    value={values.fuel_date}
                    name="fuel_date"
                    error={!!touched.fuel_date && !!errors.fuel_date}
                    helperText={touched.fuel_date && errors.fuel_date}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="FUEL TYPE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFuel_Type(e.target.value);
                      setErrors({ ...errors, fuel_type: null });
                      handleChange(e);
                    }}
                    value={values.fuel_type}
                    name="fuel_type"
                    error={!!touched.fuel_type && !!errors.fuel_type}
                    helperText={touched.fuel_type && errors.fuel_type}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="FUEL QUANTITY"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFuel_Quantity(e.target.value);
                      setErrors({ ...errors, fuel_quantity: null });
                      handleChange(e);
                    }}
                    value={values.fuel_quantity}
                    name="fuel_quantity"
                    error={!!touched.fuel_quantity && !!errors.fuel_quantity}
                    helperText={touched.fuel_quantity && errors.fuel_quantity}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="FUEL COST"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFuel_Cost(e.target.value);
                      setErrors({ ...errors, fuel_cost: null });
                      handleChange(e);
                    }}
                    value={values.fuel_cost}
                    name="fuel_cost"
                    error={!!touched.fuel_cost && !!errors.fuel_cost}
                    helperText={touched.fuel_cost && errors.fuel_cost}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="VEHICLE MILAGE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setVehicle_Milage(e.target.value);
                      setErrors({ ...errors, vehicle_milage: null });
                      handleChange(e);
                    }}
                    value={values.vehicle_milage}
                    name="vehicle_milage"
                    error={!!touched.vehicle_milage && !!errors.vehicle_milage}
                    helperText={touched.vehicle_milage && errors.vehicle_milage}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    ADD NEW FUEL DISPATCH
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  );
};

export default AddFuelentry;

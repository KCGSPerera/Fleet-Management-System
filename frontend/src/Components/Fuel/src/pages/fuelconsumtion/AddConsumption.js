import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme, ThemeProvider } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import "./AddConsumption.css";

const CalculateFuelConsumtion = ({ onClose }) => {
  const theme = useTheme();

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [difference, setDifference] = useState("");
  const [status, setStatus] = useState("");

  const [estimatedConsumption, setEstimatedConsumption] = useState("");
const [actualConsumption, setActualConsumption] = useState("");


useEffect(() => {
  if (estimatedConsumption && actualConsumption) {
    const diff = ((actualConsumption - estimatedConsumption) / estimatedConsumption) * 100;
    setDifference(diff.toFixed(2));
    setStatus(Math.abs(diff) > 10 ? 'Need to Repair' : 'Normal');
  }
}, [estimatedConsumption, actualConsumption]);



  const initialValues = {
    vehicle_id: "",
    fuel_type: "",
    fuel_quantity: "",
    estimatedConsumption: "",
    actualConsumption: ""
  };

  const validationSchema = yup.object().shape({
    vehicle_id: yup.string().required("Vehicle No is required"),
    fuel_type: yup.string().required("Fuel Type is required"),
    fuel_quantity: yup.number().required("Fuel Quantity is required"),
    estimatedConsumption: yup.number().required("Estimated Consumption is required"),
    actualConsumption: yup.number().required("Actual Consumption is required")
  });

  const handleFormSubmit = (values) => {
    const diff = ((actualConsumption - estimatedConsumption) / estimatedConsumption) * 100;
    const statusValue = Math.abs(diff) > 10 ? 'Need to Repair' : 'Normal';

    const fuelConsumptionData = {
      ...values,
      difference: diff.toFixed(2),
      status: statusValue
    };

    axios
      .post("http://localhost:8411/fuelconsumption/add", fuelConsumptionData)
      .then((response) => {
        alert("Fuel Consumption Data Successfully added");
        window.location.href = "/fuel/fuelconsumtion";
      })
      .catch((err) => {
        alert(err);
      });
  };

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
      <button className="addFuelconsumption-close" onClick={onClose}>
        Close
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors: formikErrors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <center><Header title="FUEL CONSUMTION" subtitle="Checking vehicle fuel consumption" /></center>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="VEHICLE NO"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicle_id}
                name="vehicle_id"
                error={!!touched.vehicle_id && !!formikErrors.vehicle_id}
                helperText={touched.vehicle_id && formikErrors.vehicle_id}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="FUEL TYPE"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fuel_type}
                name="fuel_type"
                error={!!touched.fuel_type && !!formikErrors.fuel_type}
                helperText={touched.fuel_type && formikErrors.fuel_type}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="FUEL QUANTITY"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fuel_quantity}
                name="fuel_quantity"
                error={!!touched.fuel_quantity && !!formikErrors.fuel_quantity}
                helperText={touched.fuel_quantity && formikErrors.fuel_quantity}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Estimated Consumption"
                onBlur={handleBlur}
                onChange={(e) => {
                  setEstimatedConsumption(e.target.value);
                  handleChange(e);
              }}
              value={estimatedConsumption}
              name="estimatedConsumption"
               
                error={!!touched.estimatedConsumption && !!formikErrors.estimatedConsumption}
                helperText={touched.estimatedConsumption && formikErrors.estimatedConsumption}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Actual Consumption"
                onBlur={handleBlur}
                onChange={(e) => {
                  setActualConsumption(e.target.value);
                  handleChange(e);
              }}
              value={actualConsumption}
              name="actualConsumption"
                error={!!touched.actualConsumption && !!formikErrors.actualConsumption}
                helperText={touched.actualConsumption && formikErrors.actualConsumption}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Difference (%)"
                value={difference}
                name="difference"
                disabled
              />
            </Box>
            <Box
              display="grid"
              marginTop={"30px"}
              gap={"30px"}
              gridTemplateColumns="repeat(1, 1fr)"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                value={status}
                name="status"
                disabled
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" fullWidth>
                ADD TO TABLE
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default CalculateFuelConsumtion;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { FormControl, Box, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material';

const validationSchema = yup.object({
  vehicle_id: yup.string()
    .required("Vehicle ID is required")
    .matches(/^[A-Za-z]{2}\d{4}$/, "Vehicle ID must have 2 letters followed by 4 numbers")
    .length(6, "Vehicle ID must be 6 characters"),
  fuel_date: yup.date().required("Fuel Date is required").nullable(),
  fuel_type: yup.string().required("Fuel Type is required"),
  fuel_quantity: yup.number().required("Fuel Quantity is required"),
  fuel_cost: yup.number().required("Fuel Cost is required"),
  vehicle_milage: yup.number().required("Vehicle Milage is required"),
});

const UpdateFuelentry = () => {

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    navigate('/fuel/fuelentry');
  };

  const [searchQ, setSearchQ] = useState("");

  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:8411/fuelentry/update/${values.vehicle_id}`, values)
      .then((response) => {
        setFuelentryData({
          vehicle_id: "",
          fuel_date: "",
          fuel_type: "",
          fuel_quantity: "",
          fuel_cost: "",
          vehicle_milage: ""
        });
        alert("Fuel entry successfully updated.");
        navigate("/fuel/fuelentry");
      })
      .catch((err) => {
        alert(err);
      });
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

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px">
      <Formik
        initialValues={fuelentryData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {values.vehicle_id && (
              <Header
                title={`EDIT FUEL DISPATCH DATA FOR ${values.vehicle_id}`}
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
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            ><Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="VEHICLE ID"
                id="vehicle_id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vehicle_id}
                name="vehicle_id"
                sx={{ gridColumn: "span 2" }}
                error={touched.vehicle_id && Boolean(errors.vehicle_id)}
                helperText={touched.vehicle_id && errors.vehicle_id}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="FUEL DATE"
                id="fuel_date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fuel_date}
                name="fuel_date"
                sx={{ gridColumn: "span 2" }}
                error={touched.fuel_date && Boolean(errors.fuel_date)}
                helperText={touched.fuel_date && errors.fuel_date}
              /></Box>
              <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              
              <FormControl fullWidth variant="filled">
    <InputLabel htmlFor="fuel_type">FUEL TYPE</InputLabel>
    <Select
      id="fuel_type"
      value={values.fuel_type}
      onChange={handleChange}
      onBlur={handleBlur}
      name="fuel_type"
      label="FUEL TYPE"
      error={touched.fuel_type && Boolean(errors.fuel_type)}
    >
      <MenuItem value={"Diesel"}>Diesel</MenuItem>
      <MenuItem value={"Petrol"}>Petrol</MenuItem>
    
    </Select>
    {touched.fuel_type && errors.fuel_type && (
      <div style={{ color: "red", marginTop: "8px" }}>
        {errors.fuel_type}
      </div>
    )}
  </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="FUEL QUANTITY"
                id="fuel_quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fuel_quantity}
                name="fuel_quantity"
                sx={{ gridColumn: "span 2" }}
                error={touched.fuel_quantity && Boolean(errors.fuel_quantity)}
                helperText={touched.fuel_quantity && errors.fuel_quantity}
              /></Box>
              <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="FUEL COST"
                id="fuel_cost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fuel_cost}
                name="fuel_cost"
                sx={{ gridColumn: "span 2" }}
                error={touched.fuel_cost && Boolean(errors.fuel_cost)}
                helperText={touched.fuel_cost && errors.fuel_cost}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="VEHICLE MILAGE"
                id="vehicle_milage"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vehicle_milage}
                name="vehicle_milage"
                sx={{ gridColumn: "span 2" }}
                error={touched.vehicle_milage && Boolean(errors.vehicle_milage)}
                helperText={touched.vehicle_milage && errors.vehicle_milage}
              /></Box>
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
               UPDATE FUEL DISPATCH
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
               BACK FUEL DISPATCH
             </button>
          </Box>
          </form>
        )}
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default UpdateFuelentry;
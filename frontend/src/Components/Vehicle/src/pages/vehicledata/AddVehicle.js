import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider } from '@mui/material';
import "./AddVehicle.css";

const AddVehicle = ({ onClose }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    vehicleid: "",
    vehicletype: "",
    fueltype: "",
    manufactureyear: "",
    mileage: "",
    transactiontype: "",
    vehiclestatus: "",
    //licenseplate: "",
    location: "",
    vehiclecolor: "",
  };

  const validationSchema = yup.object().shape({
    vehicleid: yup.string().required("Vehicle ID is required"),
    vehicletype: yup.string().required("Vehicle Type is required"),
    fueltype: yup.string().required("Fuel Type is required"),
    manufactureyear: yup
      .number()
      .required("Manufacture Year is required")
      .positive("Manufacture Year must be a positive number")
      .integer("Manufacture Year must be an integer"),
    mileage: yup
      .number()
      .required("Mileage is required")
      .positive("Mileage must be a positive number"),
    transactiontype: yup.string().required("Transaction Type is required"),
    vehiclestatus: yup.string().required("Vehicle Status is required"),
    //licenseplate: yup.string().required("License Plate is required"),
    location: yup.string().required("Location is required"),
    vehiclecolor: yup.string().required("Vehicle Color is required"),
  });

  const [vehicle, setVehicle] = useState(initialValues);

  const handleCancel = () => {
    // Clear form fields when the "Cancel" button is clicked
    setVehicle(initialValues);
  };

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openDialog = (message) => {
    setIsDialogOpen(true);
    setSuccessMessage(message);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    window.location.href = "/vehicle/vehicledata";
  };

  const sentData = async (e) => {
    e.preventDefault();

    // Validate the form using Yup schema
    try {
      await validationSchema.validate(vehicle, { abortEarly: false });

      // If validation succeeds, send the data to the server
      axios
        .post("http://localhost:8411/vehicle/add", vehicle)
        .then((response) => {
          openDialog("Vehicle Added Successfully");
          handleCancel();
        })
        .catch((err) => {
          openDialog("Error adding vehicle");
          console.error(err);
        });
    } catch (validationErrors) {
      // If validation fails, display the errors
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      console.log(errors);
    }
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
      <button className="addVehicle-close" onClick={onClose}>
        Close
      </button>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <form onSubmit={sentData}>
            <center>
              <Header title="ADD VEHICLE" subtitle="Add a new vehicle" />
            </center>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle ID"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({ ...vehicle, vehicleid: e.target.value });
                    handleChange(e);
                  }}
                  value={values.vehicleid}
                  name="vehicleid"
                  error={touched.vehicleid && !!errors.vehicleid}
                  helperText={touched.vehicleid && errors.vehicleid}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({ ...vehicle, vehicletype: e.target.value });
                    handleChange(e);
                  }}
                  value={values.vehicletype}
                  name="vehicletype"
                  error={touched.vehicletype && !!errors.vehicletype}
                  helperText={touched.vehicletype && errors.vehicletype}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Fuel Type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({ ...vehicle, fueltype: e.target.value });
                    handleChange(e);
                  }}
                  value={values.fueltype}
                  name="fueltype"
                  error={touched.fueltype && !!errors.fueltype}
                  helperText={touched.fueltype && errors.fueltype}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Manufacture Year"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      manufactureyear: parseInt(e.target.value) || "",
                    });
                    handleChange(e);
                  }}
                  value={values.manufactureyear}
                  name="manufactureyear"
                  error={touched.manufactureyear && !!errors.manufactureyear}
                  helperText={touched.manufactureyear && errors.manufactureyear}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Mileage"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      mileage: parseInt(e.target.value) || "",
                    });
                    handleChange(e);
                  }}
                  value={values.mileage}
                  name="mileage"
                  error={touched.mileage && !!errors.mileage}
                  helperText={touched.mileage && errors.mileage}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Transaction Type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      transactiontype: e.target.value,
                    });
                    handleChange(e);
                  }}
                  value={values.transactiontype}
                  name="transactiontype"
                  error={touched.transactiontype && !!errors.transactiontype}
                  helperText={
                    touched.transactiontype && errors.transactiontype
                  }
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Status"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      vehiclestatus: e.target.value,
                    });
                    handleChange(e);
                  }}
                  value={values.vehiclestatus}
                  name="vehiclestatus"
                  error={touched.vehiclestatus && !!errors.vehiclestatus}
                  helperText={touched.vehiclestatus && errors.vehiclestatus}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              {/* <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="License Plate"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      licenseplate: e.target.value,
                    });
                    handleChange(e);
                  }}
                  value={values.licenseplate}
                  name="licenseplate"
                  error={touched.licenseplate && !!errors.licenseplate}
                  helperText={touched.licenseplate && errors.licenseplate}
                  sx={{ gridColumn: "span 2" }}
                />
              </div> */}
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({ ...vehicle, location: e.target.value });
                    handleChange(e);
                  }}
                  value={values.location}
                  name="location"
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Color"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      vehiclecolor: e.target.value,
                    });
                    handleChange(e);
                  }}
                  value={values.vehiclecolor}
                  name="vehiclecolor"
                  error={touched.vehiclecolor && !!errors.vehiclecolor}
                  helperText={touched.vehiclecolor && errors.vehiclecolor}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
            </Box>
            <center>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  ADD VEHICLE
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  CANCEL
                </Button>
              </Box>
            </center>
          </form>
        )}
      </Formik>

      {/* Dialog for Success/Error Messages */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {successMessage ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <p>{successMessage || errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" sx={{ color: "white" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </ThemeProvider>
  );
};

export default AddVehicle;

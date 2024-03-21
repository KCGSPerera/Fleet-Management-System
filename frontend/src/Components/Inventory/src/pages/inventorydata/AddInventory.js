import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme, ThemeProvider } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./AddInventory.css";

const AddInventory = ({ onClose }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    pid: "",
    type: "",
    name: "",
    brand: "",
    qty: "",
    unit_price: "",
    size: "",
    voltage: "",
    amp_hrs: "",
    man_date: "",
    exp_date: "",
    exp_date: "",
    vehicle_man_year: "",
    reorder_level: "",
  };
/* 
  const checkoutSchema = yup.object().shape({
    pid: yup.string().required("Required"),
    type: yup.date().required("Required"), // Use yup.date() for date validation
    name: yup.string().required("Required"),
    brand: yup.number().required("Required"), // Use yup.number() for number validation
    qty: yup.number().required("Required"),
    unit_price: yup.number().required("Required"),
    size: yup.number().required("Required"),
    voltage: yup.number().required("Required"),
    amp_hrs: yup.number().required("Required"),
    man_date: yup.number().required("Required"),
    exp_date: yup.number().required("Required"),
    vehicle_man_year: yup.number().required("Required"),
    reorder_level: yup.number().required("Required"),
  }); */

  const [pid, setPid] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [qty, setQty] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [size, setSize] = useState("");
  const [voltage, setVoltage] = useState("");
  const [amp_hrs, setAmpHrs] = useState("");
  const [man_date, setManDate] = useState("");
  const [exp_date, setExpDate] = useState("");
  const [vehicle_brand_and_model, setVehicleBrandAndModel] = useState("");
  const [vehicle_man_year, setVehicleManYear] = useState("");
  const [reorder_level, setReOrderLevel] = useState("");

  const [pidError, setPidError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [voltageError, setVoltageError] = useState("");
  const [ampHrsError, setAmpHrsError] = useState("");
  const [manDateError, setManDateError] = useState("");
  const [expDateError, setExpDateError] = useState("");
  const [vehicleBrandAndModelError, setVehicleBrandAndModelError] = useState("");
  const [vehicleManYearError, setVehicleManYearError] = useState("");
  const [reorderLevelError, setReOrderLevelError] = useState("");

  const [showQtyErrorPopup, setShowQtyErrorPopup] = useState(false);

  const sentData = (e) => {
    e.preventDefault();

    alert("Insert");
    if (
      !validatePid(pid) ||
      !validateType(type) ||
      !validateName(name) ||
      !validateBrand(brand) ||
      !validateQty(qty) ||
      !validateUnitPrice(unit_price) ||
      !validateSize(size) ||
      !validateVoltage(voltage) ||
      !validateAmpHrs(amp_hrs) ||
      !validateManDate(man_date) ||
      !validateExpDate(exp_date) ||
      !validateVehicleBrandAndModel(vehicle_brand_and_model) ||
      !validateVehicleManYear(vehicle_man_year) ||
      !validateReorderLevel(reorder_level)
    ) {
      return;
    }
    const newInventory = {
      pid,
      type,
      name,
      brand,
      qty,
      unit_price,
      size,
      voltage,
      amp_hrs,
      man_date,
      exp_date,
      vehicle_brand_and_model,
      vehicle_man_year,
      reorder_level,
    };
    axios.post("http://localhost:8411/inventory/add", newInventory)
      .then((response) => {
        alert("Item Added Successfully");
        window.location.href = "/inventorydata";
        window.location.reload();
        handleCancel();

        setPid("");
        setType("");
        setName("");
        setBrand("");
        setQty("");
        setUnitPrice("");
        setSize("");
        setVoltage("");
        setAmpHrs("");
        setManDate("");
        setExpDate("");
        setVehicleBrandAndModel("");
        setVehicleManYear("");
        setReOrderLevel("");
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });
  };

  const navigate = useNavigate();

  function handleCancel () {
    // Clear form fields when the "Cancel" button is clicked
    setPid("");
    setType("");
    setName("");
    setBrand("");
    setQty("");
    setUnitPrice("");
    setSize("");
    setVoltage("");
    setAmpHrs("");
    setManDate("");
    setExpDate("");
    setVehicleBrandAndModel("");
    setVehicleManYear("");
    setReOrderLevel("");
  }




//   const handleCancel = () => {
//   // Clear form fields when the "Cancel" button is clicked
//   setPid("");
//   setType("");
//   setName("");
//   setBrand("");
//   setQty("");
//   setUnitPrice("");
//   setSize("");
//   setVoltage("");
//   setAmpHrs("");
//   setManDate("");
//   setExpDate("");
//   setVehicleBrandAndModel("");
//   setVehicleManYear("");
//   setReOrderLevel("");
// }







  const validatePid = (pid) => {
    if (!pid) {
      setPidError("Product Id cannot be null.");
      return false;
    }
    const regexPattern = /^[a-zA-Z]{3}[0-9]{5}$/;
    if (!regexPattern.test(pid)) {
      setPidError("Product Id must be 3 letters followed by 5 whole numbers");
      return false;
    }

    setPidError("");
    return true;
  };

  const validateType = (type) => {
    if (!type || !type.trim()) {
      setTypeError("Product Type cannot be empty.");
      return false;
    }
    const regexPattern = /^[a-zA-Z\s]{1,25}$/;
    if (!regexPattern.test(type)) {
      setTypeError("Product Type must be letters (max 25 characters)");
      return false;
    }
    setTypeError("");
    return true;
  };

  const validateName = (name) => {
    if (!name || !name.trim()) {
      setNameError("Product Name cannot be empty.");
      return false;
    }
    if (name.length > 25) {
      setNameError("Product Name should not exceed 25 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateBrand = (brand) => {
    if (!brand || !brand.trim()) {
      setBrandError("Product Brand cannot be empty.");
      return false;
    }
    const regexPattern = /^[a-zA-Z\s]{1,25}$/;
    if (!regexPattern.test(brand)) {
      setBrandError("Product Brand must be letters (max 25 characters)");
      return false;
    }
    setBrandError("");
    return true;
  };

  const validateQty = (qty) => {
    if (!qty) {
      setQtyError("Product Quantity Cannot be empty");
      return false;
    }
    if (!/^\d+$/.test(qty) || parseInt(qty) <= 0) {
      setQtyError("Product Quantity must be a positive whole number greater than zero");
      return false;
    }
    if (parseInt(qty) <= reorder_level) {
      setQtyError("Product Quantity cannot be less than the Reorder Level");
      setShowQtyErrorPopup(true); // Show the popup when qty is less than or equal to reorder level
      return false;
    }

    setQtyError("");
    return true;
  };

  const validateUnitPrice = (unitPrice) => {
    if (unitPrice === "") {
      setUnitPriceError("Unit Price cannot be empty");
      return false;
    }

    if (isNaN(unitPrice) || unitPrice <= 0) {
      setUnitPriceError("Unit Price must be a positive real number");
      return false;
    }
    setUnitPriceError("");
    return true;
  };

  const validateSize = (size) => {
    if (size === "") {
      // Allow an empty field
      setSizeError("");
      return true;
    }

    if (size.length > 50) {
      setSizeError("Product Size should not exceed 50 characters");
      return false;
    }

    setSizeError("");
    return true;
  };

  const validateVoltage = (voltage) => {
    if (voltage === "") {
      // Allow an empty field
      setVoltageError("");
      return true;
    }

    const voltageValue = parseFloat(voltage);

    if (isNaN(voltageValue) || voltageValue < 0 || voltageValue > 24) {
      setVoltageError("Voltage must be a non-negative whole number not greater than 24");
      return false;
    }

    setVoltageError("");
    return true;
  };

  const validateAmpHrs = (ampHrs) => {
    if (ampHrs === "") {
      // Allow an empty field
      setAmpHrsError("");
      return true;
    }

    const ampHrsValue = parseFloat(ampHrs);

    if (isNaN(ampHrsValue) || ampHrsValue < 0 || ampHrsValue > 500) {
      setAmpHrsError("Battery Ampers must be a non-negative whole number with a maximum of 500");
      return false;
    }

    setAmpHrsError("");
    return true;
  };

  const validateManDate = (manDate) => {
    const currentDate = new Date();
    const selectedDate = new Date(manDate);
    if (isNaN(selectedDate.getTime()) || selectedDate >= currentDate) {
      setManDateError("Manufactured Date must be before the current date");
      return false;
    }
    setManDateError("");
    return true;
  };

  const validateExpDate = (expDate) => {
    const currentDate = new Date();
    const selectedDate = new Date(expDate);
    if (isNaN(selectedDate.getTime()) || selectedDate <= currentDate) {
      setExpDateError("Expiry Date must be after the current date");
      return false;
    }
    setExpDateError("");
    return true;
  };

  const validateVehicleBrandAndModel = (value) => {
    if (value && value.length > 50) {
      setVehicleBrandAndModelError("Vehicle Brand and Model should not exceed 50 characters");
      return false;
    }
    setVehicleBrandAndModelError("");
    return true;
  };

  const validateVehicleManYear = (value) => {
    const currentYear = new Date().getFullYear();
    const parsedValue = parseInt(value, 10);

    if (
      !value ||                 // Empty value is not allowed
      isNaN(parsedValue) ||     // Value must be a number
      parsedValue < 1980 ||     // Value must be greater than or equal to 1980
      parsedValue > currentYear || // Value must be less than or equal to the current year
      value.length !== 4 ||     // Value must be exactly 4 characters long
      !(/^\d{4}$/.test(value))  // Value must consist of 4 digits only
    ) {
      setVehicleManYearError("Vehicle Manufactured Year must be a 4-digit positive whole number greater than or equal to 1980 and less than or equal to the current year");
      return false;
    }

    setVehicleManYearError("");
    return true;
  };

  const validateReorderLevel = (value) => {
    if (!/^\d+$/.test(value) || value < 10 || value > 100) {
      setReOrderLevelError("Re-Order Level must be a positive whole number between 10 and 100");
      return false;
    }
    setReOrderLevelError("");
    return true;
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
      <button className="addInventory-close" onClick={onClose}>
        Close
      </button>
      <Formik onSubmit={sentData} initialValues={initialValues} >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <form onSubmit={sentData}>
            <center>
              <Header title="ADD PRODUCT" subtitle="Add a new product to inventory" />
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
                  label="PRODUCT ID"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPid(e.target.value);
                    validatePid(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.pid}
                  name="pid"
                  error={!!touched.pid && !!errors.pid}
                  helperText={touched.pid && errors.pid}
                  sx={{ gridColumn: "span 2" }}
                />
                {pidError && <div className="text-danger">{pidError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PRODUCT TYPE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setType(e.target.value);
                    validateType(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.type}
                  name="type"
                  error={!!touched.type && !!errors.type}
                  helperText={touched.type && errors.type}
                  sx={{ gridColumn: "span 2" }}
                />
                {typeError && <div className="text-danger">{typeError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="NAME"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setName(e.target.value);
                    // Validate Product Name as the user types
                    validateName(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                {nameError && <div className="text-danger">{nameError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="BRAND"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    // Validate Product Brand as the user types
                    validateBrand(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.brand}
                  name="brand"
                  error={!!touched.brand && !!errors.brand}
                  helperText={touched.brand && errors.brand}
                  sx={{ gridColumn: "span 2" }}
                />
                {brandError && <div className="text-danger">{brandError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="REORDER LEVEL"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setReOrderLevel(e.target.value);
                    // Validate Re-Order Level as the user types
                    validateReorderLevel(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.reorder_level}
                  name="reorder_level"
                  error={!!touched.reorder_level && !!errors.reorder_level}
                  helperText={touched.reorder_level && errors.reorder_level}
                  sx={{ gridColumn: "span 2" }}
                />
                {reorderLevelError && <div className="text-danger">{reorderLevelError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="QUANTITY"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setQty(e.target.value);
                    // Validate Product Quantity as the user types
                    validateQty(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.qty}
                  name="qty"
                  error={!!touched.qty && !!errors.qty}
                  helperText={touched.qty && errors.qty}
                  sx={{ gridColumn: "span 2" }}
                />
                {qtyError && <div className="text-danger">{qtyError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="UNIT PRICE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setUnitPrice(e.target.value);
                    // Validate Unit Price as the user types
                    validateUnitPrice(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.unit_price}
                  name="unit_price"
                  error={!!touched.unit_price && !!errors.unit_price}
                  helperText={touched.unit_price && errors.unit_price}
                  sx={{ gridColumn: "span 2" }}
                />
                {unitPriceError && <div className="text-danger">{unitPriceError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ENTER PRODUCT SIZE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setSize(e.target.value);
                    // Validate Product Size as the user types
                    validateSize(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.size}
                  name="size"
                  error={!!touched.size && !!errors.size}
                  helperText={touched.size && errors.size}
                  sx={{ gridColumn: "span 2" }}
                />
                {sizeError && <div className="text-danger">{sizeError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="VOLTAGE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVoltage(e.target.value);
                    // Validate Voltage as the user types
                    validateVoltage(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.voltage}
                  name="voltage"
                  error={!!touched.voltage && !!errors.voltage}
                  helperText={touched.voltage && errors.voltage}
                  sx={{ gridColumn: "span 2" }}
                />
                {voltageError && <div className="text-danger">{voltageError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="ENTER BATTERY AMPERS"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setAmpHrs(e.target.value);
                    // Validate Battery Ampers as the user types
                    validateAmpHrs(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.voltage}
                  name="voltage"
                  error={!!touched.amp_hrs && !!errors.amp_hrs}
                  helperText={touched.amp_hrs && errors.amp_hrs}
                  sx={{ gridColumn: "span 2" }}
                />
                {ampHrsError && <div className="text-danger">{ampHrsError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="MANUFACTURED DATE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setManDate(e.target.value);
                    // Validate Manufactured Date as the user types
                    validateManDate(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.man_date}
                  name="man_date"
                  error={!!touched.man_date && !!errors.man_date}
                  helperText={touched.man_date && errors.man_date}
                  sx={{ gridColumn: "span 2" }}
                />
                {manDateError && <div className="text-danger">{manDateError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="EXPIRY DATE"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setExpDate(e.target.value);
                    // Validate Expiry Date as the user types
                    validateExpDate(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.exp_date}
                  name="exp_date"
                  error={!!touched.exp_date && !!errors.exp_date}
                  helperText={touched.exp_date && errors.exp_date}
                  sx={{ gridColumn: "span 2" }}
                />
                {expDateError && <div className="text-danger">{expDateError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="VEHICLE BRAND AND MODEL"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicleBrandAndModel(e.target.value);
                    // Validate Vehicle Brand and Model as the user types
                    validateVehicleBrandAndModel(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.vehicle_brand_and_model}
                  name="vehicle_brand_and_model"
                  error={!!touched.vehicle_brand_and_model && !!errors.vehicle_brand_and_model}
                  helperText={touched.vehicle_brand_and_model && errors.vehicle_brand_and_model}
                  sx={{ gridColumn: "span 2" }}
                />
                {vehicleBrandAndModelError && <div className="text-danger">{vehicleBrandAndModelError}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="VEHICLE MANUFACTURED YEAR"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setVehicleManYear(e.target.value);
                    // Validate Vehicle Manufactured Year as the user types
                    validateVehicleManYear(e.target.value);
                    handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                  }}
                  value={values.vehicle_man_year}
                  name="vehicle_man_year"
                  error={!!touched.vehicle_man_year && !!errors.vehicle_man_year}
                  helperText={touched.vehicle_man_year && errors.vehicle_man_year}
                  sx={{ gridColumn: "span 2" }}
                />
                {vehicleManYearError && <div className="text-danger">{vehicleManYearError}</div>}
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
                  ADD PRODUCT
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  // type="button"
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

export default AddInventory;

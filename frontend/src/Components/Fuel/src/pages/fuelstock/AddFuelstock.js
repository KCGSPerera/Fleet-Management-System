import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme, ThemeProvider } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import theme from "../../theme"; 

import "./AddFuelstock.css";

const AddFuelstock = ({onClose}) => {


  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  
  const handleFormSubmit = (values) => {
      console.log(values);
  };

  const initialValues = {
    invoice_no: "",
    stocked_fuel_type: "",
    stocked_fuel_quantity: "",
    per_leter_cost: "",
    total_cost: "",
    stocked_fuel_date: "",
  }; 

  const [invoice_no, setInvoice_No] = useState("");
  const [stocked_fuel_type, setStocked_Fuel_Type] = useState("");
  const [stocked_fuel_quantity, setStocked_Fuel_Quantity] = useState("");
  const [per_leter_cost, setPer_Leter_Cost] = useState("");
  const [total_cost, setTotal_Cost] = useState("");
  const [stocked_fuel_date, setStocked_Fuel_Date] = useState("");

  const [invoice_noError, setInvoice_NoError] = useState("");
  const [stocked_fuel_typeError, setStocked_Fuel_TypeError] = useState("");
  const [stocked_fuel_quantityError, setStocked_Fuel_QuantityError] = useState("");
  const [per_leter_costError, setPer_Leter_CostError] = useState("");
  const [total_costError, setTotal_CostError] = useState("");
  const [stocked_fuel_dateError, setStocked_Fuel_DateError] = useState("");

  const [errors, setErrors] = useState({});


  const sentData = (e) => {
    e.preventDefault();

    alert("Insert");
    if (
      !validateInvoiceNumber(invoice_no) ||
      !validateStockedFuelType(stocked_fuel_type) ||
      !validateStockedFuelQuantity(stocked_fuel_quantity) ||
      !validatePerLeterCost(per_leter_cost) ||
      //!validateTotalCost(total_cost) ||
      !validateStockedFuelDate(stocked_fuel_date) 
    )

    {
      return;
    }
    const newFuelstock = {
      invoice_no,
      stocked_fuel_type,
      stocked_fuel_quantity,
      per_leter_cost,
      total_cost,
      stocked_fuel_date,
  };

      axios
        .post("http://localhost:8411/fuelstock/add", newFuelstock)
        .then((response) => {
          alert(response.data.message);
          alert("Fuel Stock Successfully added");
          window.location.href = "/fuelstock";
           window.location.reload();

          setInvoice_No('');
          setStocked_Fuel_Type('');
          setStocked_Fuel_Quantity('');
          setPer_Leter_Cost('');
          setTotal_Cost('');
          setStocked_Fuel_Date('');

        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });


        const currentCapacity = axios.get('/dieselTank/currentCapacity');
if (currentCapacity.data + stocked_fuel_quantity > 50000) {
    alert("Adding this fuel will exceed the tank's capacity!");
    return;
}
    };
  
    const navigate = useNavigate();

    function handleCancel() {
      // Clear form fields when the "Cancel" button is clicked
      setInvoice_No("");
      setStocked_Fuel_Type("");
      setStocked_Fuel_Quantity("");
      setPer_Leter_Cost("");
      setTotal_Cost("");
      setStocked_Fuel_Date("");
    }
  
    const validateInvoiceNumber = (invoice_no) => {
      const regex = /^[A-Za-z]{2}\d{5}$/;
    
      if (!invoice_no) {
        setInvoice_NoError("Invoice No is required.");
        return false;
      }
    
      if (!regex.test(invoice_no)) {
        setInvoice_NoError("Invoice No should be 2 letters followed by 5 numbers.");
        return false;
      }
    
      setInvoice_NoError("");
      return true;
    };

const validFuelTypes = ["Diesel", "Petrol"];

const validateStockedFuelType = (stocked_fuel_type) => {
  if (!stocked_fuel_type) {
    setStocked_Fuel_TypeError("Fuel type is required.");
    return false;
  }

  if (!stocked_fuel_type.includes(stocked_fuel_type)) {
    setStocked_Fuel_TypeError("Invalid fuel type.");
    return false;
  }

  setStocked_Fuel_TypeError("");
  return true;
};

    
    const validateStockedFuelQuantity = (stocked_fuel_quantity) => {
      // Check if fuelQuantity is empty or not provided
      if (!stocked_fuel_quantity && stocked_fuel_quantity !== 0) {
        setStocked_Fuel_QuantityError("Stocked Fuel Quantity is required.");
        return false;
      }
    
      // Check if fuelQuantity contains only numbers
      const regex = /^[0-9]+$/;
      if (!regex.test(stocked_fuel_quantity.toString())) {
        setStocked_Fuel_QuantityError("Stocked Fuel Quantity should contain only numbers.");
        return false;
      }
    
      setStocked_Fuel_QuantityError("");
      return true;
    };

    
    const validatePerLeterCost = () => {
      // Check if cost is a number with up to 2 decimal places
      const pattern = /^\d+(\.\d{1,2})?$/;
    
      if (!pattern.test(per_leter_cost)) {
        setPer_Leter_CostError("Per Leter Cost should be a number with up to 2 decimal places.");
        return false;
      }
    
      setPer_Leter_CostError("");
      return true;
    };
    

    const validateStockedFuelDate = (stocked_fuel_date) => {
      const today = new Date();
      const inputDate = new Date(stocked_fuel_date);
    
      // Set the time for both dates to midnight for an accurate comparison
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
    
      if (inputDate > today) {
        setStocked_Fuel_DateError("Stocked fuel date should be today or a past date.");
        return false;
      }
    
      setStocked_Fuel_DateError("");
      return true;
    };

 const calculateTotalCost = useCallback(() => {
    const perLeterCostValue = parseFloat(per_leter_cost) || 0;
    const stockedFuelQuantityValue = parseInt(stocked_fuel_quantity, 10) || 0;
    const totalCostValue = perLeterCostValue * stockedFuelQuantityValue;
    setTotal_Cost(totalCostValue.toFixed(2));// Round to 2 decimal places
    
  }, [per_leter_cost, stocked_fuel_quantity]);


  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost])

 

 
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
    <button className="addFuelstock-close" onClick={onClose}>
      Close
    </button>
   <Formik onSubmit={sentData} initialValues={initialValues}>
{({values, errors, touched, handleBlur, handleChange }) => (
  <form onSubmit={sentData} >
          <center>
            <Header title="ADD FUEL STOCK" subtitle="Add a new fuel seock to the fuel management system" />
          </center>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
                  
<div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="INVOICE NUMBER"
      onBlur={handleBlur}
      onChange={(e) => {
        setInvoice_No(e.target.value);
        validateInvoiceNumber(e.target.value);
        handleChange(e);
      }}
      value={values.invoice_no}
      name="invoice_no"
      error={!!touched.invoice_no && !!errors.invoice_no}
      helperText={touched.invoice_no && errors.invoice_no}
      sx={{ gridColumn: "span 2" }}
    />
    {invoice_noError && <div className="text-danger">{invoice_noError}</div>}
    </div>
                  
    <div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="STOCKED FUEL TYPE"
      onBlur={handleBlur}
      onChange={(e) => {
        setStocked_Fuel_Type(e.target.value);
        validateStockedFuelType(e.target.value);
        handleChange(e);
      }}
      value={values.stocked_fuel_type}
      name="stocked_fuel_type"
      error={!!touched.stocked_fuel_type && !!errors.stocked_fuel_type}
      helperText={touched.stocked_fuel_type&& errors.stocked_fuel_type}
      sx={{ gridColumn: "span 2" }}
    />
    {stocked_fuel_typeError && <div className="text-danger">{stocked_fuel_typeError}</div>}
    </div>
            
    <div>
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="STOCKED FUEL QUANTITY"
      onBlur={handleBlur}
      onChange={(e) => {
        setStocked_Fuel_Quantity(e.target.value);
        validateStockedFuelQuantity(e.target.value);
        handleChange(e);
      }}
      value={values.stocked_fuel_quantity}
      name="stocked_fuel_quantity"
      error={!!touched.stocked_fuel_quantity && !!errors.stocked_fuel_quantity}
      helperText={touched.stocked_fuel_quantity && errors.stocked_fuel_quantity}
      sx={{ gridColumn: "span 2" }}
    />
    {stocked_fuel_quantityError && <div className="text-danger">{stocked_fuel_quantityError}</div>}
    </div>


    <div>
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="PER LITER COST"
      onBlur={handleBlur}
      onChange={(e) => {
        setPer_Leter_Cost(e.target.value);
        validatePerLeterCost(e.target.value);
        handleChange(e);
      }}
      value={values.per_leter_cost}
      name="per_leter_cost"
      error={!!touched.per_leter_cost && !!errors.per_leter_cost}
      helperText={touched.per_leter_cost && errors.per_leter_cost}
      sx={{ gridColumn: "span 2" }}
    />
    {per_leter_costError && <div className="text-danger">{per_leter_costError}</div>}
    </div>

  
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="TOTAL COST"
      onBlur={handleBlur}
      onChange={(e) => {
        handleChange(e);
      }}
      value={total_cost}
      name="total_cost"
      error={!!touched.total_cost && !!errors.total_cost}
      helperText={touched.total_cost && errors.total_cost}
      sx={{ gridColumn: "span 2" }}
    />

     <div>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="STOCKED FUEL DATE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setStocked_Fuel_Date(e.target.value);
                      validateStockedFuelDate(e.target.value);
                      handleChange(e);
                    }}
                    value={values.stocked_fuel_date}
                    name="stocked_fuel_date"
                    error={!!touched.stocked_fuel_date && !!errors.stocked_fuel_date}
                    helperText={touched.stocked_fuel_date && errors.stocked_fuel_date}
                    sx={{ gridColumn: "span 2" }}
                  />
{stocked_fuel_dateError && <div className="text-danger">{stocked_fuel_dateError}</div>}
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
            ADD FUEL STOCK
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

export default AddFuelstock;

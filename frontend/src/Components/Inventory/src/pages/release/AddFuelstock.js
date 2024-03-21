import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./AddFuelstock.css";


const AddFuelstock = ({onClose}) => {

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

  const checkoutSchema = yup.object().shape({
    invoice_no: yup.string().required("Required"),
    stocked_fuel_type: yup.string().required("Required"), // Use yup.date() for date validation
    stocked_fuel_quantity: yup.string().required("Required"),
    per_leter_cost: yup.number().required("Required"), // Use yup.number() for number validation
    total_cost: yup.number().required("Required"),
    stocked_fuel_date: yup.date().required("Required"),
  });
  

  const [invoice_no, setInvoice_No] = useState("");
  const [stocked_fuel_type, setStocked_Fuel_Type] = useState("");
  const [stocked_fuel_quantity, setStocked_Fuel_Quantity] = useState("");
  const [per_leter_cost, setPer_Leter_Cost] = useState("");
  const [total_cost, setTotal_Cost] = useState("");
  const [stocked_fuel_date, setStocked_Fuel_Date] = useState({});
  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!invoice_no) {
      errors.invoice_no = "Invoice No is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(invoice_no)) {
        errors.invoice_no = "Invoice No should be 2 letters followed by 4 numbers";
      }
    }
     if (!stocked_fuel_type) {
      errors.stocked_fuel_type = "Stocked Fuel Type is required";
    }

    if (!stocked_fuel_quantity) {
      errors.stocked_fuel_quantity = "Stocked Fuel Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(stocked_fuel_quantity)) {
        errors.stocked_fuel_quantity = "Stocked Fuel Quantity should contain only numbers";
      }
    }

    if (!per_leter_cost) {
      errors.per_leter_cost = "Per Leter Cost is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/; 
      if (!regex.test(per_leter_cost)) {
        errors.per_leter_cost = "Per Leter Cost should be a valid float value";
      }
    }


    if (!stocked_fuel_date) {
      errors.stocked_fuel_date = "Stocked Fuel Date is required";
    } else {
      const isValidDate = !isNaN(new Date(stocked_fuel_date).getTime());

      if (!isValidDate) {
        errors.stocked_fuel_date = "Invalid date format";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

 const calculateTotalCost = useCallback(() => {
    const perLeterCostValue = parseFloat(per_leter_cost) || 0;
    const stockedFuelQuantityValue = parseInt(stocked_fuel_quantity, 10) || 0;
    const totalCostValue = perLeterCostValue * stockedFuelQuantityValue;
    setTotal_Cost(totalCostValue.toFixed(2));// Round to 2 decimal places
    
  }, [per_leter_cost, stocked_fuel_quantity, setTotal_Cost]);


  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost])

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

      const newFuelstock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      };

      axios
        .post("http://localhost:8411/fuelstock/add", newFuelstock)
        .then((response) => {
          alert(response.data.message);
          alert("Fuel Stock Successfully added");
          // ... rest of the code to reset form fields

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
        });
    }
  }

 
  return (
    
    <Box m="20px">
          <Header title="ADD FUEL STOCK" subtitle="Adding new fuel stock to Fleet" />
          <button className="close-button" onClick={onClose}>
          Close
        </button>
          <Formik onSubmit={sentData} initialValues={initialValues} validationSchema={checkoutSchema}>
            
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form className="addFuelStockForm" onSubmit={sentData}>
                <center><Header title="ADD FUEL STOCK" subtitle="Adding new fuel stock to Fleet" /></center>
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
                    label="INVOICE NO"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setInvoice_No(e.target.value);
                      setErrors({ ...errors, invoice_no: null });
                      handleChange(e); // Call the Formik handleChange to keep the Formik state updated
                    }}
                    value={values.invoice_no}
                    name="invoice_no"
                    error={!!touched.invoice_no && !!errors.invoice_no}
                    helperText={touched.invoice_no && errors.invoice_no}
                    sx={{ gridColumn: "span 2" }}
                  />
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="STOCKED FUEL TYPE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setStocked_Fuel_Type(e.target.value);
                      setErrors({ ...errors, stocked_fuel_type: null });
                      handleChange(e);
                    }}
                    value={values.stocked_fuel_type}
                    name="stocked_fuel_type"
                    error={!!touched.stocked_fuel_type && !!errors.stocked_fuel_type}
                    helperText={touched.stocked_fuel_type && errors.stocked_fuel_type}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="STOCKED FUEL QUANTITY"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setStocked_Fuel_Quantity(e.target.value);
                      setErrors({ ...errors, stocked_fuel_quantity: null });
                      handleChange(e);
                    }}
                    value={values.stocked_fuel_quantity}
                    name="stocked_fuel_quantity"
                    error={!!touched.stocked_fuel_quantity && !!errors.stocked_fuel_quantity}
                    helperText={touched.stocked_fuel_quantity && errors.stocked_fuel_quantity}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="PER LETER COST"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setPer_Leter_Cost(e.target.value);
                      setErrors({ ...errors, per_leter_cost: null });
                      handleChange(e);
                    }}
                    value={values.per_leter_cost}
                    name="per_leter_cost"
                    error={!!touched.per_leter_cost && !!errors.per_leter_cost}
                    helperText={touched.per_leter_cost && errors.per_leter_cost}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="TOTAL COST"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setTotal_Cost(e.target.value);
                      setErrors({ ...errors, total_cost: null });
                      handleChange(e);
                    }}
                    value={values.total_cost}
                    name="total_cost"
                    error={!!touched.total_cost && !!errors.total_cost}
                    helperText={touched.total_cost && errors.total_cost}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="STOCKEDFUEL DATE"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setStocked_Fuel_Date(e.target.value);
                      setErrors({ ...errors, stocked_fuel_date: null });
                      handleChange(e);
                    }}
                    value={values.stocked_fuel_date}
                    name="stocked_fuel_date"
                    error={!!touched.stocked_fuel_date && !!errors.stocked_fuel_date}
                    helperText={touched.stocked_fuel_date && errors.stocked_fuel_date}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" fullWidth>
                    ADD NEW FUEL STOCK
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  );
};

export default AddFuelstock;

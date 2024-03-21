import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import "./UpdateFuelstock.css";

const UpdateFuelstock = () => {
  const location = useLocation();

  const [fuelstockData, setFuelstockData] = useState(
    location.state?.fuelstockData || {
      invoice_no: "",
      stocked_fuel_type: "",
      stocked_fuel_quantity: "",
      per_leter_cost: "",
      total_cost: "",
      stocked_fuel_date: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setFuelstockData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    switch (id) {

      case "invoice_no":
        error = value.length !== 6 ? "Invoice No must be 6 characters" : "";
        break;

      case "stocked_fuel_type":
        error = value.trim() === "" ? "Stocked Fuel Type is required" : "";
        break;

      case "stocked_fuel_quantity":
        error = isNaN(value) ? "Stocked Fuel Quantity should contain only numbers" : "";
        break;
      
      case "per_leter_cost":
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
        break;    

      case "stocked_fuel_date":
        if (!value) {
            error = "Stocked Fuel Date is required";
        } else {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
            error = "Invalid date format";
            }
        }
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

    const newFuelstock = { ...fuelstockData };

    if (newFuelstock.invoice_no) {
      axios
        .put(`http://localhost:8411/fuelstock/update/${newFuelstock.invoice_no}`, newFuelstock)
        .then((response) => {
          resetForm();
          //alert("Fuel entry successfully updated.");
          window.location.href = "/fuel/fuelstock";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invoice No is required.");
    }
    //alert("Insert");
    const {
      invoice_no,
      stocked_fuel_type,
      stocked_fuel_quantity,
      per_leter_cost,
      total_cost,
      stocked_fuel_date 
    } = fuelstockData;

    if (fuelstockData.invoice_no) {
      const newFuelstock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      };

      axios
        .put(`http://localhost:8411/fuelstock/update/${invoice_no}`, newFuelstock)
        .then((response) => {
          resetForm();
          alert("Fuel stock successfully updated.");
          window.location.href = "/fuel/allFuelstocks";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invoice No is required.");
    }
  };

  useEffect(() => {
    const fetchFuelstockData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/fuelstock/get/${searchQ}`
          );

          if (response.data.fuelstock) {
            setFuelstockData(response.data.fuelstock);
          }
        }
      } catch (error) {
        alert("Error fetching fuel stock: " + error.message);
      }
    };

    fetchFuelstockData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelstockData({
      invoice_no: "",
      stocked_fuel_type: "",
      stocked_fuel_quantity: "",
      per_leter_cost:"",
      total_cost:"",
      stocked_fuel_date:""
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
    navigate('/fuel/fuelstock');
  };
  return (
    <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form className="updateFuelStockForm" onSubmit={handleSubmit}>
        
        {fuelstockData.invoice_no && (
      <Header
        title={`EDIT FUEL STOCK DATA FOR ${fuelstockData.invoice_no}`}
        subtitle="Update Fuel Stock Data"
      />
    )}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Invoice No to Update"
            id="invoice_no"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Invoice No"
            name="invoice_no"
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
                label="INVOICE NO"
                id="invoice_no"
                onChange={handleInputChange}
                value={fuelstockData.invoice_no}
                name="invoice_no"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="STOCKED FUEL TYPE"
                id="stocked_fuel_type"
                onChange={(e) => handleInputChange(e, "stocked_fuel_type")}
                value={fuelstockData.stocked_fuel_type}
                name="stocked_fuel_type"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="STOCKED FUEL QUANTITY"
              id="stocked_fuel_quantity"
              onChange={(e) => handleInputChange(e, "stocked_fuel_quantity")}
              value={fuelstockData.stocked_fuel_quantity}
              name="stocked_fuel_quantity"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="PER LETER COST"
              id="per_leter_cost"
              onChange={(e) => handleInputChange(e, "per_leter_cost")}
              value={fuelstockData.per_leter_cost}
              name="per_leter_cost"
              sx={{ gridColumn: "span 4" }}
            /></Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="TOTAL COST"
              id="total_cost"
              onChange={(e) => handleInputChange(e, "total_cost")}
              value={fuelstockData.total_cost}
              name="total_cost"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="datet"
              label="STOCKED FUEL DATE"
              id="stocked_fuel_date"
              onChange={(e) => handleInputChange(e, "stocked_fuel_date")}
              value={fuelstockData.stocked_fuel_date}
              name="stocked_fuel_date"
              sx={{ gridColumn: "span 4" }}
            /></Box>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE FUEL STOCK
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}>
              BACK TO FUEL STOCK MANAGER
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default UpdateFuelstock;

import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme, ThemeProvider } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const UpdateFuelstock = () => {
  const theme = useTheme();
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
  const [invoice_no, setInvoice_Number] = useState("");

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");
  const [total_cost, setTotal_Cost] = useState(0);

  const calculateTotalCost = useCallback(() => {
    const perLeterCostValue = parseFloat(fuelstockData.per_leter_cost) || 0;
    const stockedFuelQuantityValue = parseInt(fuelstockData.stocked_fuel_quantity, 10) || 0;
    const totalCostValue = perLeterCostValue * stockedFuelQuantityValue;
    setTotal_Cost(totalCostValue.toFixed(2));// Round to 2 decimal places
    
  }, [fuelstockData.per_leter_cost, fuelstockData.stocked_fuel_quantity]);


  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost, fuelstockData])

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setFuelstockData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
    if (id === 'per_leter_cost' || id === 'stocked_fuel_quantity') {
      calculateTotalCost();
    }
  };

  const validateInput = (id, value) => {
    let error = "";

    switch (id) {

      case "invoice_no":
    const regex = /^[A-Za-z]{2}\d{5}$/;
    if (!regex.test(value)) {
        error = "Invoice No should be 2 letters followed by 5 numbers.";
    } else {
        error = "";
    }
    break;


      case "stocked_fuel_type":
        error = value.trim() === "" ? "Stocked Fuel Type is required" : "";
        break;

        case "stocked_fuel_quantity":
          if (!value) {
              error = "Stocked Fuel Quantity is required.";
          } else if (isNaN(value)) {
              error = "Stocked Fuel Quantity should contain only numbers.";
          } else if (parseFloat(value) < 0) {
              error = "Stocked Fuel Quantity cannot be negative.";
          } else if (!Number.isInteger(parseFloat(value))) {
              error = "Stocked Fuel Quantity should be a whole number.";
          } else {
              error = "";
          }
          break;
      
      
          case "per_leter_cost":
            error = !/^\d+(\.\d{1,2})?$/.test(value) ? "Unit Price should be a number with up to 2 decimal places." : "";
            break;
           

            case "stocked_fuel_date":
              if (!value) {
                  error = "Stocked Fuel Date is required";
              } else {
                  const date = new Date(value);
                  const today = new Date();
          
                  // Set the hours, minutes, seconds, and milliseconds to 0 for today's date
                  // to ensure we're only comparing the day, month, and year.
                  today.setHours(0, 0, 0, 0);
          
                  if (isNaN(date.getTime())) {
                      error = "Invalid date format";
                  } else if (date > today) {
                      error = "Stocked Fuel Date should be today or a past date";
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


  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelstock');
  };


  const handleDelete = async (invoice_no) => {
    try {
      await axios.delete(`http://localhost:8411/fuelstock/delete/${invoice_no}`);
      alert('Fuel stock deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuel/fuelstock";
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };
  return (
    <ThemeProvider theme={theme}>
    <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form onSubmit={handleSubmit}>
        
        {fuelstockData.invoice_no && (
      <Header
        title={`VIEW FUEL STOCK DATA FOR ${fuelstockData.invoice_no}`}
        subtitle="View Fuel Stock Data"
      />
    )}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Invoice No to View"
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
            id="invoice_no"
            label="Invoice No"
            variant="outlined"
            value={fuelstockData.invoice_no}
            onChange={handleInputChange}
            error={!!errors.invoice_no}
            disabled
            helperText={errors.invoice_no}
          />{errors.invoice_no && (
            <div className="invalid-feedback">{errors.invoice_no}</div>
          )}

<TextField
            fullWidth
            id="stocked_fuel_type"
            label="Stocked Fuel Type"
            variant="outlined"
            value={fuelstockData.stocked_fuel_type}
            onChange={handleInputChange}
            error={!!errors.stocked_fuel_type}
            disabled
            helperText={errors.stocked_fuel_type}
          />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
              
            <TextField
            fullWidth
            id="stocked_fuel_quantity"
            label="Stocked Fuel Quantity"
            variant="outlined"
            disabled
            value={fuelstockData.stocked_fuel_quantity}
            onChange={handleInputChange}
            error={!!errors.stocked_fuel_quantity}
            helperText={errors.stocked_fuel_quantity}
          />
              <TextField
            fullWidth
            id="per_leter_cost"
            disabled
            label="Per Litre Cost"
            variant="outlined"
            value={fuelstockData.per_leter_cost}
            onChange={handleInputChange}
            error={!!errors.per_leter_cost}
            helperText={errors.per_leter_cost}
          />

            </Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">

           <TextField
    fullWidth
    id="total_cost"
    disabled
    label="Total Price"
    variant="outlined"
    type="number"
    value={total_cost}
  />
            <TextField
            fullWidth
            id="stocked_fuel_date"
            label="Stocked Fuel Date"
            disabled
            variant="outlined"
            value={fuelstockData.stocked_fuel_date}
            onChange={handleInputChange}
            error={!!errors.stocked_fuel_date}
            helperText={errors.stocked_fuel_date}
          />
            
            </Box>

          </Box>
          <Box display="flex" justifyContent="end" mt="20px" >
<button
               className="buttonm"
               onClick={() => handleDelete(invoice_no)}
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
               DELETE STOCK
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
               BACK FUEL STOCK
             </button>
          </Box>
        </form>
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default UpdateFuelstock;

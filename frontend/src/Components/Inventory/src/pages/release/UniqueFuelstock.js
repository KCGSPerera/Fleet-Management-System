import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material'
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup'; // Import yup for validation
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./AddFuelstock.css";



const UniqueFuelstock = ({ onClose }) => {

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [fuelstock, setFuelstock] = useState(null);

  const validationSchema = yup.object().shape({
    invoice_no: yup
      .string()
      .required("Invoice No is required") // Specify the error message
      .matches(/^[0-9a-zA-Z]{6}$/, "Invoice No must be 6 characters"), // Specify the regex pattern and error message
  });

  useEffect(() => {
    const fetchFuelstockData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuelstock/get/${id}`);
          setFuelstock(response.data.fuelstock);
        }
      } catch (error) {
        alert('Error fetching fuel stock:', error.message);
      }
    };

    fetchFuelstockData();
  }, [id]);

  const handleDelete = async (invoiceNo) => {
    try {
      await axios.delete(`http://localhost:8411/fuelstock/delete/${invoiceNo}`);
      alert('Fuel stock deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuelstock";
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    const { invoice_no } = values;
    try {
      const response = await axios.get(`http://localhost:8411/fuelstock/get/${invoice_no}`);
      setFuelstock(response.data.fuelstock);
    } catch (error) {
      alert('Error fetching fuel stock:', error.message);
    } finally {
      actions.setSubmitting(false); // Finish form submission
    }
  };
  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelstock');
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  return (
    <Box m="20px">
      



      <Formik
        initialValues={{ invoice_no: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form className="uniqueFuelStockForm" onSubmit={handleSubmit}>
            {fuelstock && (
  <Header
    title={`UNIQUE FUEL STOCK FOR ${fuelstock.invoice_no}`}
    subtitle="View a unique fuel stock data"
  />
)}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Field
                as={TextField}
                fullWidth
                variant="filled"
                type="text"
                label="ENTER INVOICE NO"
                name="invoice_no"
                error={false} // Don't show error by default
                sx={{ gridColumn: "span 4" }}
              />
              <ErrorMessage name="invoice_no">
                {(msg) => <p style={{ color: 'red' }}>{msg}</p>}
              </ErrorMessage>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" width="100%">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                style={{ flex: '1', marginRight: '10px' }}
                disabled={isSubmitting}
              >
                FETCH FUEL STOCK DATA
              </Button>
              <Button
              onClick={handleButtonClick}
                type="button"
                color="secondary"
                variant="contained"
                style={{ flex: '1', marginLeft: '10px' }}
                
                disabled={isSubmitting}
                
              >
                CANCEL
              </Button>
            </Box>

            {fuelstock ? (
             
             <ul className="ulm" style={{ listStyleType: "none", padding: 0 }}>
              <Box
  display="flex"
  flexDirection="column" // Stack items vertically
  gap="10px" // Add vertical gap between rows
>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Invoice No: {fuelstock.invoice_no}<br />
    </li>
    <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Stocked Fuel Type: {fuelstock.stocked_fuel_type}<br />
    </li>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    
    <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Stocked Fuel Quantity: {fuelstock.stocked_fuel_quantity}<br />
    </li>
     <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Per Leter Cost: {fuelstock.per_leter_cost}<br />
    </li>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
   
    <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Total Cost: {fuelstock.total_cost}<br />
    </li>
    <li
      className="lim"
      key={fuelstock.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Stocked Fuel Date: {formatDate(fuelstock.stocked_fuel_date)}<br />
    </li>
  </div>
</Box>
<br />
             {/* Add other fuel entry details here */}
             <button
               className="buttonm"
               onClick={() => handleDelete(fuelstock.invoice_no)}
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
               Delete Fuel Stock
             </button>
           </ul>
            ) : (
              <p>No fuel stock found with the specified Vehicle Id.</p>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UniqueFuelstock;

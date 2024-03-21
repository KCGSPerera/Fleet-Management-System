import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material'
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup'; // Import yup for validation
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./AddFuelentry.css";



const UniqueFuelentry = ({ onClose }) => {

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [fuelentry, setFuelentry] = useState(null);

  const validationSchema = yup.object().shape({
    vehicle_id: yup
      .string()
      .required("Vehicle ID is required") // Specify the error message
      .matches(/^[0-9a-zA-Z]{6}$/, "Vehicle ID must be 6 characters"), // Specify the regex pattern and error message
  });

  useEffect(() => {
    const fetchFuelentryData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuelentry/get/${id}`);
          setFuelentry(response.data.fuelentry);
        }
      } catch (error) {
        alert('Error fetching fuel entry:', error.message);
      }
    };

    fetchFuelentryData();
  }, [id]);

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/fuelentry/delete/${vehicleId}`);
      alert('Fuel entry deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuel/fuelentry";
    } catch (error) {
      alert('Error deleting fuel entry:', error.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    const { vehicle_id } = values;
    try {
      const response = await axios.get(`http://localhost:8411/fuelentry/get/${vehicle_id}`);
      setFuelentry(response.data.fuelentry);
    } catch (error) {
      alert('Error fetching fuel entry:', error.message);
    } finally {
      actions.setSubmitting(false); // Finish form submission
    }
  };
  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelentry');
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
        initialValues={{ vehicle_id: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form className="uniqueFuelEntryForm" onSubmit={handleSubmit}>
            {fuelentry && (
  <Header
    title={`UNIQUE FUEL DISPATCH FOR ${fuelentry.vehicle_id}`}
    subtitle="View a unique fuel dispatch data"
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
                label="ENTER VEHICLE ID"
                name="vehicle_id"
                error={false} // Don't show error by default
                sx={{ gridColumn: "span 4" }}
              />
              <ErrorMessage name="vehicle_id">
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
                FETCH FUEL ENTRY DATA
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

            {fuelentry ? (
             
             <ul className="ulm" style={{ listStyleType: "none", padding: 0 }}>
              <Box
  display="flex"
  flexDirection="column" // Stack items vertically
  gap="10px" // Add vertical gap between rows
>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Vehicle ID: {fuelentry.vehicle_id}<br />
    </li>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Fuel Date: {formatDate(fuelentry.fuel_date)}<br />
    </li>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Fuel Type: {fuelentry.fuel_type}<br />
    </li>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Fuel Quantity: {fuelentry.fuel_quantity}<br />
    </li>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      Fuel Cost: {fuelentry.fuel_cost}<br />
    </li>
    <li
      className="lim"
      key={fuelentry.id}
      style={{
        flex: "1", // Each li takes 50% width
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      Vehicle Mileage: {fuelentry.vehicle_milage}<br />
    </li>
  </div>
</Box>
<br />
             {/* Add other fuel entry details here */}
             <button
               className="buttonm"
               onClick={() => handleDelete(fuelentry.vehicle_id)}
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
               Delete Fuel Entry
             </button>
           </ul>
            ) : (
              <p>No fuel entry found with the specified Vehicle Id.</p>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UniqueFuelentry;

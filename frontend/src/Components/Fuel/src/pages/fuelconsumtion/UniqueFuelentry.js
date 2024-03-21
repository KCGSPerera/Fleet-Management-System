import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup'; // Import yup for validation
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { tokens } from "../../theme";
import { useTheme} from "@mui/material";



const UniqueFuelentry = ({ onClose }) => {

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [fuelentry, setFuelentry] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          <form onSubmit={handleSubmit}>
            {fuelentry && (
              <Header
                title={`UNIQUE FUEL DISPATCH FOR ${fuelentry.vehicle_id}`}
                subtitle="View a unique fuel dispatch data"
              />
            )}
            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                variant="filled"
                label="ENTER VEHICLE ID"
                name="vehicle_id"
                error={false}
              />
              <ErrorMessage name="vehicle_id">
                {(msg) => <Typography color="error">{msg}</Typography>}
              </ErrorMessage>
            </Box>
  
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                FETCH FUEL ENTRY DATA
              </Button>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleButtonClick}
                disabled={isSubmitting}
              >
                CANCEL
              </Button>
            </Box>
  
            {fuelentry ? (
              <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', backgroundColor: colors.primary[400] }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Vehicle ID" secondary={fuelentry.vehicle_id} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Fuel Date" secondary={formatDate(fuelentry.fuel_date)} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Fuel Type" secondary={fuelentry.fuel_type} />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Fuel Quantity" secondary={fuelentry.fuel_quantity} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Fuel Cost" secondary={fuelentry.fuel_cost} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Vehicle Mileage" secondary={fuelentry.vehicle_milage} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(fuelentry.vehicle_id)}
                >
                  Delete Fuel Entry
                </Button>
              </Paper>
            ) : (
              <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
                No fuel entry found with the specified Vehicle Id.
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
  
};

export default UniqueFuelentry;

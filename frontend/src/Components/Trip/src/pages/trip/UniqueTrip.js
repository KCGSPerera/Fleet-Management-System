import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {ThemeProvider } from '@mui/material';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const UniqueTrip = ({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/trip/get/${id}`);
          setTrip(response.data.trip);
        }
      } catch (error) {
        alert('Error fetching trip:', error.message);
      }
    };

    fetchTripData();
  }, [id]);

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchTripDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/trip/get/${searchQ}`);
        setTrip(response.data.trip);
      }
    } catch (error) {
      alert('Error fetching trip:', error.message);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`http://localhost:8411/trip/delete/${id}`);
      alert('Trip deleted successfully.');
      // Navigate to All Trips page
      window.location.href = "/trip/allTrip";
    } catch (error) {
      alert('Error deleting trip:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTripDataBySearch();
  };

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px">
      <Formik
        initialValues={{ searchQ: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {trip && (
              <Header
                title={`UNIQUE TRIP FOR ${trip.tripid}`}
                subtitle="View a unique trip data"
              />
            )}
            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                variant="filled"
                label="ENTER TRIP ID"
                name="searchQ"
                error={false}
              />
              <ErrorMessage name="searchQ">
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
                FETCH TRIP DATA
              </Button>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => handleDelete(trip.tripid)}
                disabled={isSubmitting}
              >
                DELETE TRIP
              </Button>
            </Box>

            {trip ? (
              <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', backgroundColor: colors.primary[400] }}>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Trip ID" secondary={trip.tripid} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Trip Name" secondary={trip.tripname} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Trip Duration" secondary={`${trip.tripduration} hours`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Trip Distance" secondary={`${trip.tripdistance} km`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Vehicle Number" secondary={trip.vehicleno} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Driver ID" secondary={trip.driverid} />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Starting Point" secondary={trip.startpoint} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Destination" secondary={trip.destination} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Trip Goods" secondary={trip.tripgoods} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Arrival Time" secondary={`${formatDateTime(trip.arrivaltime)} hours`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Departure Time" secondary={`${formatDateTime(trip.departuretime)} hours`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Start Fuel" secondary={`${trip.startfuel} Litres`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="End Fuel" secondary={`${trip.endfuel} litres`} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
                No trip found with the specified Trip ID.
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default UniqueTrip;

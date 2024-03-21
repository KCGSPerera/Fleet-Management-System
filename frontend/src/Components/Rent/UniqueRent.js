import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UniqueRent = () => {
  const { id } = useParams();
  const [rent, setRent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/rent/get/${id}`);
          setRent(response.data.rent);
        }
      } catch (error) {
        alert("Error fetching rent: " + error.message);
      }
    };

    fetchRentData();
  }, [id]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toUpperCase());
  };

  const fetchRentDataBySearch = async () => {
    try {
      if (searchQuery) {
        const response = await axios.get(`http://localhost:8411/rent/get/${searchQuery}`);
        setRent(response.data.rent);
      }
    } catch (error) {
      alert("Error fetching rent: " + error.message);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.prompt("To confirm deletion, type 'CONFIRM' (case-sensitive):");

    if (confirmation === "CONFIRM") {
      try {
        await axios.delete(`http://localhost:8411/rent/delete/${rent.vehicle_no}`);
        alert("Rent record deleted successfully.");
        navigate("/rent/allRent");
      } catch (error) {
        alert("Error deleting rent record: " + error.message);
      }
    } else {
      alert("Deletion cancelled. No changes were made.");
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2}>
        Unique Rent
      </Typography>

      <form onSubmit={fetchRentDataBySearch}>
        <Box mt={2}>
          <TextField
            fullWidth
            variant="filled"
            label="Enter Vehicle no"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" color="primary" variant="contained">
            Fetch Rent Data
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => navigate("/rent/allRent")}
          >
            Cancel
          </Button>
        </Box>
      </form>

      {rent && (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <List>
                <ListItem>
                  <ListItemText primary="Vehicle_No" secondary={rent.vehicle_no} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Brand" secondary={rent.brand} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Vehicle Model" secondary={rent.vehicle_model} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Mileage" secondary={rent.mileage} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List>
                <ListItem>
                  <ListItemText primary="Capacity" secondary={rent.capacity} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Description" secondary={rent.description} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Receive Date" secondary={rent.receive_date} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Return Date" secondary={rent.return_date} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List>
                <ListItem>
                  <ListItemText primary="Owner Name" secondary={rent.owner_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Owner Phone" secondary={rent.owner_phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Owner Email" secondary={rent.owner_email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Rental" secondary={rent.rental} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Total Rental"
                    secondary={(parseFloat(rent.totalRental) * parseFloat(rent.rental)).toFixed(2)}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete Rent
          </Button>
        </Paper>
      )}

      {!rent && (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          No rent record found with the specified Vehicle No.
        </Typography>
      )}

      <Box mt={3}>
        <Button variant="text" color="primary" onClick={() => navigate("/rent/allRent")}>
          All Rents
        </Button>
      </Box>
    </Box>
  );
};

export default UniqueRent;

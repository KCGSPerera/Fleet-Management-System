// UniqueVehicle.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Header from "../../components/Header";

const UniqueVehicle = () => {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState({
    vehicleid: "",
    vehicletype: "",
    fueltype: "",
    manufactureyear: "",
    mileage: "",
    transactiontype: "",
    vehiclestatus: "",
    licenseplate: "",
    location: "",
    vehiclecolor: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8411/vehicle/get/${id}`)
      .then((res) => {
        setVehicle(res.data.manager);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleDelete = (vehicleId) => {
    const userConfirmed = window.confirm("Do you want to delete the vehicle?");

    if (userConfirmed) {
      deleteVehicle(vehicleId);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/vehicle/delete/${vehicleId}`);
      alert("Vehicle deleted successfully.");
      window.location.reload();
    } catch (error) {
      alert("Error deleting vehicle:", error.message);
    }
  };

  return (
    <Box m="20px">
      <Header title={`UNIQUE VEHICLE - ${id}`} subtitle="Vehicle Details" />
      <div className="uniqueVehicleForm">
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        >
          <div>
            <TextField
              fullWidth
              id="vehicleid"
              name="vehicleid"
              label="Vehicle ID"
              variant="outlined"
              disabled
              value={vehicle.vehicleid}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="vehicletype"
              name="vehicletype"
              label="Vehicle Type"
              variant="outlined"
              disabled
              value={vehicle.vehicletype}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="fueltype"
              name="fueltype"
              label="Fuel Type"
              variant="outlined"
              disabled
              value={vehicle.fueltype}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="manufactureyear"
              name="manufactureyear"
              label="Manufacture Year"
              variant="outlined"
              disabled
              value={vehicle.manufactureyear}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="mileage"
              name="mileage"
              label="Mileage"
              variant="outlined"
              disabled
              value={vehicle.mileage}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="transactiontype"
              name="transactiontype"
              label="Transaction Type"
              variant="outlined"
              disabled
              value={vehicle.transactiontype}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="vehiclestatus"
              name="vehiclestatus"
              label="Vehicle Status"
              variant="outlined"
              disabled
              value={vehicle.vehiclestatus}
            />
          </div>
          {/* <div>
            <TextField
              fullWidth
              id="licenseplate"
              name="licenseplate"
              label="License Plate"
              variant="outlined"
              disabled
              value={vehicle.licenseplate}
            />
          </div> */}
          <div>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              disabled
              value={vehicle.location}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="vehiclecolor"
              name="vehiclecolor"
              label="Vehicle Color"
              variant="outlined"
              disabled
              value={vehicle.vehiclecolor}
            />
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Fuel Type</FormLabel>
              <RadioGroup
                aria-label="fueltype"
                name="fueltype"
                value={vehicle.fueltype}
                disabled
              >
                <FormControlLabel
                  value="Gasoline"
                  control={<Radio />}
                  label="Gasoline"
                />
                <FormControlLabel
                  value="Diesel"
                  control={<Radio />}
                  label="Diesel"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => handleDelete(vehicle.vehicleid)}
          >
            DELETE VEHICLE
          </Button>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Link to="/vehicle/vehicledata">
            <Button color="primary" variant="contained">
              BACK TO VEHICLE DATA
            </Button>
          </Link>
        </Box>

        {message && (
          <Box display="flex" justifyContent="center" mt="20px" color="green">
            {message}
          </Box>
        )}
      </div>
    </Box>
  );
};

export default UniqueVehicle;

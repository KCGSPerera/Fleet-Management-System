import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./UpdateVehicle.css";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:8411/vehicle/update/${id}`, vehicle) 
      .then((res) => {
        setMessage("Vehicle details updated successfully!");
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/vehicle/vehicledata`); 
        }, 500);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  

  const handleButtonClick = () => {
    navigate(`/vehicle/vehicledetails/${id}`);
  };

  return (
    <Box m="20px">
      <Header title={`EDIT VEHICLE - ${id}`} subtitle="Update Vehicle Data" />
      <form className="updateVehicleForm" onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(3, minmax(0, 1fr))">
          <div>
            <TextField
              fullWidth
              id="vehicleType"
              name="vehicletype"
              label="Vehicle Type"
              variant="outlined"
              value={vehicle.vehicletype}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="manufactureYear"
              name="manufactureyear"
              label="Manufacture Year"
              variant="outlined"
              value={vehicle.manufactureyear}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="mileage"
              name="mileage"
              label="Mileage"
              variant="outlined"
              value={vehicle.mileage}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="transactionType"
              name="transactiontype"
              label="Transaction Type"
              variant="outlined"
              value={vehicle.transactiontype}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="vehicleStatus"
              name="vehiclestatus"
              label="Vehicle Status"
              variant="outlined"
              value={vehicle.vehiclestatus}
              onChange={handleInputChange}
            />
          </div>
          {/* <div>
            <TextField
              fullWidth
              id="licensePlate"
              name="licenseplate"
              label="License Plate"
              variant="outlined"
              value={vehicle.licenseplate}
              onChange={handleInputChange}
            />
          </div> */}
          <div>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              value={vehicle.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="vehicleColor"
              name="vehiclecolor"
              label="Vehicle Color"
              variant="outlined"
              value={vehicle.vehiclecolor}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Fuel Type</FormLabel>
              <RadioGroup
                aria-label="fueltype"
                name="fueltype"
                value={vehicle.fueltype}
                onChange={handleInputChange}
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
          <Button type="submit" color="secondary" variant="contained" fullWidth>
            UPDATE VEHICLE
          </Button>
        </Box>

        {isSuccess && (
          <Box display="flex" justifyContent="center" mt="20px" color="green">
            {message}
          </Box>
        )}

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleButtonClick}
          >
            BACK TO VEHICLE DETAILS
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateVehicle;

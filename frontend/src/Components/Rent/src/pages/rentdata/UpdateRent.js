import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./UpdateRent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateRent() {
  const { id } = useParams(); // Get the rent ID from the URL

  const [rent, setRent] = useState({
    vehicle_no: "",
    brand: "",
    vehicle_model: "",
    milage: "",
    capacity: "",
    description: "",
    receive_date: "",
    return_date: "",
    owner_name: "",
    owner_phone: "",
    owner_email: "",
    rental: "",
    total_rental: "",
  });

  const [errors, setErrors] = useState({});

  const [isVehicleNoUnique, setIsVehicleNoUnique] = useState(true);

  const Notify = (message, type) => {
    toast[type](message, {
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      position: "top-right",
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        width: "300px",
        height: "100px",
        fontSize: "22px",
        alignItems: "center",
        fontFamily: "Ropa Sans",
        display: "flex",
        justifyContent: "center",
        color: "white",
      },
      bodyClassName: "custom-toast-body",
    });
  };

  useEffect(() => {
    // Fetch rent details when the component mounts
    axios
      .get(`http://localhost:8411/rent/get/${id}`)
      .then((response) => {
        const rentDetails = response.data.rent;
        setRent(rentDetails);
      })
      .catch((error) => {
        console.error("Error fetching rent details:", error.message);
      });
  }, [id]);

  useEffect(() => {
    calculateTotalRent();
  }, [rent.receive_date, rent.return_date, rent.rental]);

  const calculateTotalRent = () => {
    if (rent.return_date && rent.receive_date && rent.rental) {
      const returnDate = new Date(rent.return_date);
      const receiveDate = new Date(rent.receive_date);
      const rentalAmount = parseFloat(rent.rental);

      if (!isNaN(rentalAmount)) {
        const daysDifference = (returnDate - receiveDate) / (1000 * 60 * 60 * 24);
        const totalRentAmount = daysDifference * rentalAmount;

        setRent({ ...rent, total_rental: totalRentAmount.toFixed(2) });
      } else {
        setRent({ ...rent, total_rental: "" });
      }
    } else {
      setRent({ ...rent, total_rental: "" });
    }
  };

  const handleInputChange = (name, value) => {
    setRent({ ...rent, [name]: value });
    validateField(name, value);
  };

  // You should define this function in the same file or import it from another module.
const checkIfVehicleNoExists = async (vehicleNo) => {
  try {
    // Send a request to your server to check if the vehicle number exists in your database.
    const response = await axios.get(`http://localhost:8411/rent/checkVehicleNoExists/${vehicleNo}`);

    // Return true if the vehicle number exists, otherwise return false.
    return response.data.exists;
  } catch (error) {
    console.error("Error checking vehicle number:", error.message);
    return false; // Assume it doesn't exist on error
  }
};


  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "vehicle_no":
        if (!value.match(/^([A-Z]{2,3}-\d{4})$/)) {
          newErrors.vehicle_no = "Invalid format (e.g., XX-0000 or XXX-0000)";
        } else {
          newErrors.vehicle_no = "";
          // Check if the vehicle number already exists
          checkIfVehicleNoExists(value).then((exists) => {
            setIsVehicleNoUnique(!exists);
          });
        }
        break;
      case "brand":
        if (!value) {
          newErrors.brand = "Brand is required";
        } else {
          newErrors.brand = "";
        }
        break;
      case "vehicle_model":
        if (!value) {
          newErrors.vehicle_model = "Vehicle Model is required";
        } else {
          newErrors.vehicle_model = "";
        }
        break;
      case "milage":
        if (!value) {
          newErrors.milage = "Mileage is required";
        } else {
          newErrors.milage = "";
        }
        break;
      case "description":
        if (!value) {
          newErrors.description = "Description is required";
        } else {
          newErrors.description = "";
        }
        break;
      case "owner_name":
        if (!value) {
          newErrors.owner_name = "Owner Name is required";
        } else {
          newErrors.owner_name = "";
        }
        break;
      case "owner_phone":
        if (!value.match(/^\d{10}$/)) {
          newErrors.owner_phone = "Owner Phone must be 10 digits";
        } else {
          newErrors.owner_phone = "";
        }
        break;
      case "owner_email":
        if (!value.match(/^\S+@\S+\.\S+$/)) {
          newErrors.owner_email = "Invalid email format";
        } else {
          newErrors.owner_email = "";
        }
        break;
      case "receive_date":
        if (value < getCurrentDate()) {
          newErrors.receive_date = "Receive Date cannot be in the past";
        } else {
          newErrors.receive_date = "";
        }
        break;
      case "return_date":
        if (value < rent.receive_date) {
          newErrors.return_date = "Return Date must be after Receive Date";
        } else {
          newErrors.return_date = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    return currentDateString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await axios.put(`http://localhost:8411/rent/update/${id}`, rent);
      Notify("Rent Record Updated Successfully", "success");
      setTimeout(() => {
        window.location.href = "/rent/rentdata";
      }, 2000);
    } catch (error) {
      console.error("Error updating rent:", error.message);
    }
  };

  return (
    <Box m={3}>
      <Paper elevation={3} className="updateRentForm">
        <Typography variant="h4" component="h2" align="center" color="primary" mt={2}>
          Update Rent
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Vehicle Number"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("vehicle_no", e.target.value)}
                value={rent.vehicle_no}
                error={!!errors.vehicle_no || !isVehicleNoUnique}
                helperText={errors.vehicle_no || (!isVehicleNoUnique && "Vehicle No already exists")}
                name="vehicle_no"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Brand"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                value={rent.brand}
                error={!!errors.brand}
                helperText={errors.brand}
                name="brand"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Vehicle Model"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("vehicle_model", e.target.value)}
                value={rent.vehicle_model}
                error={!!errors.vehicle_model}
                helperText={errors.vehicle_model}
                name="vehicle_model"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Mileage (in km)"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("milage", e.target.value)}
                value={rent.milage}
                error={!!errors.milage}
                helperText={errors.milage}
                name="milage"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Capacity"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                value={rent.capacity}
                error={!!errors.capacity}
                helperText={errors.capacity}
                name="capacity"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Description"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("description", e.target.value)}
                value={rent.description}
                error={!!errors.description}
                helperText={errors.description}
                name="description"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Receive Date"
                type="date"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("receive_date", e.target.value)}
                value={rent.receive_date}
                error={!!errors.receive_date}
                helperText={errors.receive_date}
                name="receive_date"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Return Date"
                type="date"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("return_date", e.target.value)}
                value={rent.return_date}
                error={!!errors.return_date}
                helperText={errors.return_date}
                name="return_date"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Name"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("owner_name", e.target.value)}
                value={rent.owner_name}
                error={!!errors.owner_name}
                helperText={errors.owner_name}
                name="owner_name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Phone"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("owner_phone", e.target.value)}
                value={rent.owner_phone}
                error={!!errors.owner_phone}
                helperText={errors.owner_phone}
                name="owner_phone"
                
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Email"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("owner_email", e.target.value)}
                value={rent.owner_email}
                error={!!errors.owner_email}
                helperText={errors.owner_email}
                name="owner_email"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Rental (per day)"
                onBlur={calculateTotalRent}
                onChange={(e) => handleInputChange("rental", e.target.value)}
                value={rent.rental}
                error={!!errors.rental}
                helperText={errors.rental}
                name="rental"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Total Rent" value={rent.total_rental} disabled />
            </Grid>
          </Grid>
          <center>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                UPDATE RENT
              </Button>
              <Link to="/rent/rentdata">
                <Button variant="contained" color="secondary">
                  CANCEL
                </Button>
              </Link>
            </Box>
          </center>
        </form>
      </Paper>
      <ToastContainer />
    </Box>
  );
}

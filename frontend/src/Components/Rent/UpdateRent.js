import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./UpdateRent.css";

export default function UpdateRent() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRent = location.state && location.state.rentDetails
    ? location.state.rentDetails
    : {
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
        total_rental: "", // Add total_rental field
      };

  const [rent, setRent] = useState(initialRent);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRent({ ...rent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for other required fields
    const newErrors = {};

    if (!rent.brand) {
      newErrors.brand = "Brand is required";
    }
    if (!rent.vehicle_model) {
      newErrors.vehicle_model = "Vehicle Model is required";
    }
    if (!rent.milage) {
      newErrors.milage = "Milage is required";
    }
    if (!rent.description) {
      newErrors.description = "Description is required";
    }
    if (!rent.owner_name) {
      newErrors.owner_name = "Owner Name is required";
    }
    /*  if (!rent.owner_phone || !rent.owner_phone.match(/^\d{10}$/)) {
      newErrors.owner_phone = "Owner Phone must be 10 digits";
    } */
    if (!rent.owner_email || !rent.owner_email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.owner_email = "Invalid email format";
    }

    if (rent.receive_date && rent.return_date && rent.receive_date > rent.return_date) {
      newErrors.return_date = "Return Date cannot be before Receive Date";
    }
    
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    
    if (rent.receive_date && rent.receive_date < currentDateString) {
      newErrors.receive_date = "Receive Date cannot be in the past";
    }

    // Check if return_date is before today
    if (rent.return_date && rent.return_date < currentDateString) {
      newErrors.return_date = "Return Date cannot be in the past";
    }

    setErrors(newErrors);

    // Check if there are any validation errors
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.put(`http://localhost:8411/rent/update/${rent.vehicle_no}`, rent);
        alert("Rent record updated successfully!");
        navigate("/rent/allRent");
      } catch (error) {
        console.error("Error updating rent:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Update Rent</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicle_no">Vehicle Number</label>
          <input
            type="text"
            className="form-control"
            id="vehicle_no"
            name="vehicle_no"
            placeholder="Enter Vehicle Number"
            value={rent.vehicle_no}
            onChange={handleInputChange}
            disabled // Disable this input field
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            placeholder="Enter Brand"
            value={rent.brand}
            onChange={handleInputChange}
            disabled // Disable this input field
          />
          {errors.brand && <div className="text-danger">{errors.brand}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="vehicle_model">Vehicle Model</label>
          <input
            type="text"
            className="form-control"
            id="vehicle_model"
            name="vehicle_model"
            placeholder="Enter Vehicle Model"
            value={rent.vehicle_model}
            onChange={handleInputChange}
          />
          {errors.vehicle_model && (
            <div className="text-danger">{errors.vehicle_model}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="milage">Mileage</label>
          <input
            type="number"
            className="form-control"
            id="milage"
            name="milage"
            placeholder="Enter Mileage"
            value={rent.milage}
            onChange={handleInputChange}
          />
          {errors.milage && <div className="text-danger">{errors.milage}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={rent.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="receive_date">Receive Date</label>
          <input
            type="date"
            className="form-control"
            id="receive_date"
            name="receive_date"
            value={rent.receive_date}
            onChange={handleInputChange}
          />
          {errors.receive_date && (
            <div className="text-danger">{errors.receive_date}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="return_date">Return Date</label>
          <input
            type="date"
            className="form-control"
            id="return_date"
            name="return_date"
            value={rent.return_date}
            onChange={handleInputChange}
          />
          {errors.return_date && (
            <div className="text-danger">{errors.return_date}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_name">Owner Name</label>
          <input
            type="text"
            className="form-control"
            id="owner_name"
            name="owner_name"
            placeholder="Enter Owner Name"
            value={rent.owner_name}
            onChange={handleInputChange}
          />
          {errors.owner_name && (
            <div className="text-danger">{errors.owner_name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_phone">Owner Phone</label>
          <input
            type="number"
            className="form-control"
            id="owner_phone"
            name="owner_phone"
            placeholder="Enter Owner Phone"
            value={rent.owner_phone}
            onChange={handleInputChange}
          />
          {errors.owner_phone && (
            <div className="text-danger">{errors.owner_phone}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_email">Owner Email</label>
          <input
            type="email"
            className="form-control"
            id="owner_email"
            name="owner_email"
            placeholder="Enter Owner Email"
            value={rent.owner_email}
            onChange={handleInputChange}
          />
          {errors.owner_email && (
            <div className="text-danger">{errors.owner_email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="rental">Rental Per Day</label>
          <input
            type="number"
            className="form-control"
            id="rental"
            name="rental"
            placeholder="Enter Rental"
            value={rent.rental}
            onChange={handleInputChange}
          />
          {errors.rental && <div className="text-danger">{errors.rental}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="total_rental">Total Rental</label>
          <input
            type="number"
            className="form-control"
            id="total_rental"
            name="total_rental"
            placeholder="Total Rental"
            value={rent.total_rental}
            readOnly // Make it read-only
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

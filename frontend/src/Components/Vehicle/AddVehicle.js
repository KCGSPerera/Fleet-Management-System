import React, { useState } from "react";
import axios from "axios";


export default function AddVehicle() {
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleType, setVehicleType] = useState(""); // Default value is "Car"
  const [fuelType, setFuelType] = useState(""); // Default value is "Petrol"
  const [manufactureYear, setManufactureYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform frontend validation
    if (!validateForm()) {
      return;
    }

    const vehicleData = {
      vehicleid: vehicleId,
      vehicletype: vehicleType,
      fueltype: fuelType,
      manufactureyear: manufactureYear,
      mileage: mileage,
      transactiontype: transactionType,
      vehiclestatus: vehicleStatus,
      licenseplate: licensePlate,
      location: location,
      vehiclecolor: vehicleColor,
    };

    axios
      .post("http://localhost:8411/vehicle/add", vehicleData)
      .then((response) => {
        alert(response.data); // Alert the response from the server
        window.location.href="/vehicle/allVehicles";
        // Reset form fields
        setVehicleId("");
        setVehicleType("");
        setFuelType("");
        setManufactureYear("");
        setMileage("");
        setTransactionType("");
        setVehicleStatus("");
        setLicensePlate("");
        setLocation("");
        setVehicleColor("");
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Frontend validation function
  const validateForm = () => {
    let isValid = true;

    if (!vehicleId) {
      setError("Vehicle ID is required");
      isValid = false;
    } else if (!manufactureYear || isNaN(manufactureYear) || manufactureYear < 1900 || manufactureYear > new Date().getFullYear()) {
      setError("Invalid Manufacture Year. Please enter a valid year.");
      isValid = false;
    } else if (!mileage || isNaN(mileage) || mileage < 0) {
      setError("Invalid Mileage. Please enter a valid value.");
      isValid = false;
    } else if (!transactionType) {
      setError("Transaction Type is required");
      isValid = false;
    } else if (!vehicleStatus) {
      setError("Vehicle Status is required");
      isValid = false;
    } else if (!licensePlate) {
      setError("License Plate is required");
      isValid = false;
    } else if (!location) {
      setError("Location is required");
      isValid = false;
    } else if (!vehicleColor) {
      setError("Vehicle Color is required");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="container">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicleId">Vehicle ID</label>
          <input
            type="text"
            className="form-control"
            id="vehicleId"
            name="vehicleId"
            placeholder="Enter Vehicle ID"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            className="form-control"
            id="vehicleType"
            name="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Lorry">Lorry</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            className="form-control"
            id="fuelType"
            name="fuelType"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="manufactureYear">Manufacture Year</label>
          <input
            type="number"
            className="form-control"
            id="manufactureYear"
            name="manufactureYear"
            placeholder="Manufacture Year"
            value={manufactureYear}
            onChange={(e) => setManufactureYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mileage">Mileage</label>
          <input
            type="number"
            className="form-control"
            id="mileage"
            name="mileage"
            placeholder="Mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type</label>
          <input
            type="text"
            className="form-control"
            id="transactionType"
            name="transactionType"
            placeholder="Transaction Type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleStatus">Vehicle Status</label>
          <input
            type="text"
            className="form-control"
            id="vehicleStatus"
            name="vehicleStatus"
            placeholder="Vehicle Status"
            value={vehicleStatus}
            onChange={(e) => setVehicleStatus(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            type="text"
            className="form-control"
            id="licensePlate"
            name="licensePlate"
            placeholder="License Plate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleColor">Vehicle Color</label>
          <input
            type="text"
            className="form-control"
            id="vehicleColor"
            name="vehicleColor"
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

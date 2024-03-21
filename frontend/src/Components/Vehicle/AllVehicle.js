import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Define the getVehicles function outside useEffect
  const getVehicles = () => {
    axios.get("http://localhost:8411/vehicle/")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    // Call getVehicles inside useEffect
    getVehicles();
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the server to delete the vehicle by its MongoDB ObjectID
    axios.delete(`http://localhost:8411/vehicle/delete/${id}`)
      .then((response) => {
        // Remove the deleted vehicle from the state
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== id));
        alert(response.data.status);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Define the columns and rows for the table
    const columns = [
      'Vehicle ID',
      'Vehicle Type',
      'Fuel Type',
      'Manufacture Year',
      'Mileage',
      'Transaction Type',
      'Vehicle Status',
      'License Plate',
      'Location',
      'Vehicle Color',
    ];

    const filteredVehicles = vehicles.filter(
      (vehicle) =>
        vehicle.vehicleid.includes(searchText) || vehicle.licenseplate.includes(searchText)
    );

    const rows = filteredVehicles.map((vehicle) => [
      vehicle.vehicleid,
      vehicle.vehicletype,
      vehicle.fueltype,
      vehicle.manufactureyear,
      vehicle.mileage,
      vehicle.transactiontype,
      vehicle.vehiclestatus,
      vehicle.licenseplate,
      vehicle.location,
      vehicle.vehiclecolor,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      theme: 'grid',
      startY: 20, // Adjust the starting Y position as needed
    });

    // Save the PDF with a unique name
    const filename = 'vehicle_report.pdf';
    doc.save(filename);
  };

  const handleSearch = () => {
    // Perform the search operation here
    // Filter the vehicles based on searchText and update the state
    const filteredVehicles = vehicles.filter(
      (vehicle) =>
        vehicle.vehicleid.includes(searchText) || vehicle.licenseplate.includes(searchText)
    );
    setVehicles(filteredVehicles);
  };

  const handleClear = () => {
    // Clear the search text and reset the list to all vehicles
    setSearchText('');
    getVehicles();
  };

  return (
    <div className="containerdb1">
      <h1>All Vehicles</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Vehicle ID or License Plate"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary mt-2 ml-2" onClick={handleClear}>
          Clear
        </button>
      </div>
      <button className="btn btn-success" onClick={generatePDF}>
        Download Report
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Type</th>
            <th>Fuel Type</th>
            <th>Manufacture Year</th>
            <th>Mileage</th>
            <th>Transaction Type</th>
            <th>Vehicle Status</th>
            <th>License Plate</th>
            <th>Location</th>
            <th>Vehicle Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleid}</td>
              <td>{vehicle.vehicletype}</td>
              <td>{vehicle.fueltype}</td>
              <td>{vehicle.manufactureyear}</td>
              <td>{vehicle.mileage}</td>
              <td>{vehicle.transactiontype}</td>
              <td>{vehicle.vehiclestatus}</td>
              <td>{vehicle.licenseplate}</td>
              <td>{vehicle.location}</td>
              <td>{vehicle.vehiclecolor}</td>
              <td>
                <div className="btn-group" role="group">
                  <Link to={`/vehicle/updateVehicle/${vehicle._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

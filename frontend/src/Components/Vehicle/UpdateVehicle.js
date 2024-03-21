import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateVehicle() {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8411/vehicle/get/${id}`)
      .then((res) => {
        const { manager } = res.data; // Extract the 'manager' object from the response
        setVehicleData(manager); // Set 'manager' as the 'vehicleData'
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8411/vehicle/update/${id}`, vehicleData)
      .then((response) => {
        alert(response.data.status);
        // setError(null);
        window.location.href="/vehicle/allVehicles";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <h1>Edit Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicleid">Vehicle ID</label>
          <input
            type="text"
            className="form-control"
            id="vehicleid"
            name="vehicleid"
            placeholder="Vehicle ID"
            value={vehicleData.vehicleid || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicletype">Vehicle Type</label>
          <input
            type="text"
            className="form-control"
            id="vehicletype"
            name="vehicletype"
            placeholder="Vehicle Type"
            value={vehicleData.vehicletype || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fueltype">Fuel Type</label>
          <input
            type="text"
            className="form-control"
            id="fueltype"
            name="fueltype"
            placeholder="Fuel Type"
            value={vehicleData.fueltype || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="manufactureyear">Manufacture Year</label>
          <input
            type="number"
            className="form-control"
            id="manufactureyear"
            name="manufactureyear"
            placeholder="Manufacture Year"
            value={vehicleData.manufactureyear || ''}
            onChange={handleChange}
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
            value={vehicleData.mileage || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="transactiontype">Transaction Type</label>
          <input
            type="text"
            className="form-control"
            id="transactiontype"
            name="transactiontype"
            placeholder="Transaction Type"
            value={vehicleData.transactiontype || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehiclestatus">Vehicle Status</label>
          <input
            type="text"
            className="form-control"
            id="vehiclestatus"
            name="vehiclestatus"
            placeholder="Vehicle Status"
            value={vehicleData.vehiclestatus || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="licenseplate">License Plate</label>
          <input
            type="text"
            className="form-control"
            id="licenseplate"
            name="licenseplate"
            placeholder="License Plate"
            value={vehicleData.licenseplate || ''}
            onChange={handleChange}
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
            value={vehicleData.location || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehiclecolor">Vehicle Color</label>
          <input
            type="text"
            className="form-control"
            id="vehiclecolor"
            name="vehiclecolor"
            placeholder="Vehicle Color"
            value={vehicleData.vehiclecolor || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

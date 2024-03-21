import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//import './AllTrip.css';

const AllTrip = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8411/trip/");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error.message);
      }
    };

    getTrips();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrips = trips.filter((trip) => {
    const regex = new RegExp(searchTerm, "i");
    return (
      regex.test(trip.tripid) ||
      regex.test(trip.tripname) ||
      regex.test(trip.tripduration) ||
      regex.test(trip.tripdistance) ||
      regex.test(trip.vehicleno) ||
      regex.test(trip.driverid) ||
      regex.test(trip.startpoint) ||
      regex.test(trip.destination) ||
      regex.test(trip.tripgoods) ||
      regex.test(trip.arrivaltime) ||
      regex.test(trip.departuretime) ||
      regex.test(trip.startfuel) ||
      regex.test(trip.endfuel) 
    );
  });

  return (
    <div className="containeryohan">
      <h1 className="heading">All Trips</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search"
        />
      </div>

      {filteredTrips.length > 0 ? (
        <table className="trip-table">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Trip Name</th>
              <th>Trip Duration</th>
              <th>Trip Distance</th>
              <th>Vehicle Number</th>
              <th>Driver ID</th>
              <th>Starting Point</th>
              <th>Destination</th>
              <th>Trip Goods</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Starting Fuel</th>
              <th>End Fuel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.tripid}>
                <td>{trip.tripid}</td>
                <td>{trip.tripname}</td>
                <td>{trip.tripduration}</td>
                <td>{trip.tripdistance}</td>
                <td>{trip.vehicleno}</td>
                <td>{trip.driverid}</td>
                <td>{trip.startpoint}</td>
                <td>{trip.destination}</td>
                <td>{trip.tripgoods}</td>
                <td>{trip.arrivaltime}</td>
                <td>{trip.departuretime}</td>
                <td>{trip.startfuel}</td>
                <td>{trip.endfuel}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/trip/updateTrip/${trip._id}`}
                      state={{ tripData: trip }}
                    >
                      <button className="update-button">Update</button>
                    </Link>
                    <Link
                      to={`/trip/uniqueTrip/${trip._id}`}
                      state={{ tripData: trip }}
                    >
                      <button className="view-button">View</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
};

export default AllTrip;

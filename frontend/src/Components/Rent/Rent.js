import React from 'react';
import { Link } from 'react-router-dom';

const Rent = () => {
  // Define your inline CSS styles as an object
  const containerStyle = {
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    color: 'blue',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'green',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Rent Management</h2>
      <ul>
        <li>
          <Link to="/rent/addRent" style={linkStyle}>
            Add Rent Vehicle
          </Link>
        </li>
        <li>
          <Link to="/rent/allRent" style={linkStyle}>
            View Rent Vehicles
          </Link>
        </li>
       {/*  <li>
          <Link to="/rent/UpdateRent" style={linkStyle}>
            Update Rent
          </Link>
        </li> */}
        <li>
          <Link to="/rent/UniqueRent" style={linkStyle}>
            Unique Rent Vehicle
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Rent;


import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = () => {
  return (
    <div>
      <h2>Vehicle Main Page</h2>
      <ul>
        <li>
          <Link to="/vehicle/addVehicle">Add  Vehicle</Link>
        </li>
        <li>
          <Link to="/vehicle/allVehicles">View Vehicle</Link>
        </li>
        
         </ul>
    </div>
  );
}

export default  Vehicle;



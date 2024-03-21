
import React from 'react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div>
      <h2>Maintenance Main Page</h2>
      <ul>
        <li>
          <Link to="/maintenance/addmaintenance">Add Maintenance</Link>
        </li>
        <li>
          <Link to="/maintenance/allmaintenance">View Maintenance</Link>
        </li>
        <li>
          <Link to="/maintenance/updatemaintenance">Update Maintenance</Link>
        </li>
        <li>
          <Link to="/maintenance/uniquemaintenance">Unique Maintenance</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Maintenance;
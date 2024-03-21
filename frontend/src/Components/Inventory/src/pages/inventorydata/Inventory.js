import React from 'react';
import { Link } from 'react-router-dom';
//import './Inventory.css';

const Inventory = () => {
  return (
    <div className="inventory-containerg-10">
      <div className="left-column-g11">
        <h2>Inventory Management System</h2>
        <ul className="nav-list-g12">
          <li>
            <Link to="/inventory/addInventory" className="nav-link-g13">
              <button className="tab-button-g14">Add New Item</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/allInventory" className="nav-link-g13">
              <button className="tab-button-g14">Display All Items</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/updateInventory" className="nav-link-g13">
              <button className="tab-button-g14">Update Item</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/uniqueInventory" className="nav-link-g13">
              <button className="tab-button-g14">Display Unique Item</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Inventory;

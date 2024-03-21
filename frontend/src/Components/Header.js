import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";



function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-bg">
      <img className="logo" alt="" src="/logo.png" />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/supplier" className="nav-link">
              Supplier
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory" className="nav-link">
              Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trip" className="nav-link">
              Trip
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/maintenance" className="nav-link">
              Maintenance
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/fuel" className="nav-link">
              Fuel
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vehicle" className="nav-link">
              Vehicle
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employee" className="nav-link">
              Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rent" className="nav-link">
              Rent
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

}

export default Header;

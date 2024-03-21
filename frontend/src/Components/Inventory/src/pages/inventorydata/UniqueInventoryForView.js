import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the product ID from the URL
import axios from "axios";
import "./PopUp.css"; // Import the CSS file for styling

// Create a PopUp component to display messages
function PopUp({ message, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function UniqueInventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showNotFoundPopUp, setShowNotFoundPopUp] = useState(false); // New state for "No Product found" message

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  // Get the product ID from the URL using useParams
 const { id } = useParams();

 const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8411/inventory/get/${id}`);
      const inventoryData = response.data.inventory;

      if (inventoryData) {
        setInventoryList([inventoryData]);
      } else {
        setInventoryList([]);
        setPopUpMessage("No Product found with the specified ID.");
        setShowNotFoundPopUp(true);
      }
    } catch (error) {
      setPopUpMessage(`Error fetching product: ${error.message}`);
      setShowPopUp(true);
    }
  };

  // Call the fetchProductDetails function when the component mounts
  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
      setPopUpMessage("Item deleted successfully.");
      setShowPopUp(true);
    } catch (error) {
      setPopUpMessage(`Product cannot be deleted: ${error.message}`);
      setShowPopUp(true);
    }
  };

  const closePopUp = () => {
    setShowPopUp(false);
    // You can perform additional actions after closing the pop-up here
  };

  const closeNotFoundPopUp = () => {
    setShowNotFoundPopUp(false);
    // You can perform additional actions after closing the "No Product found" pop-up here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInventoryDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique Product</h1>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={searchQ}
                onChange={handleSearchQ}
                className="form-control"
                placeholder="Enter Product ID"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Fetch Product Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {inventoryList.length > 0 ? (
        <div className="row">
          {inventoryList.map((inventoryItem) => (
            <div key={inventoryItem.id} className="col-md-6 mb-4">
              <h2>Product ID: {inventoryItem.pid}</h2>
              <p>
                <strong>Product Type:</strong> {inventoryItem.type}
              </p>
              <p>
                <strong>Product Name:</strong> {inventoryItem.name}
              </p>
              <p>
                <strong>Product Brand:</strong> {inventoryItem.brand}
              </p>
              <p>
                <strong>Quantity:</strong> {inventoryItem.qty}
              </p>
              <p>
                <strong>Unit Price:</strong> {inventoryItem.unit_price}
              </p>
              <p>
                <strong>Product Size:</strong> {inventoryItem.size}
              </p>
              <p>
                <strong>Voltage:</strong> {inventoryItem.voltage}
              </p>
              <p>
                <strong>Ampier Hours:</strong> {inventoryItem.amp_hrs}
              </p>
              <p>
                <strong>Manufacture Date:</strong> {inventoryItem.man_date}
              </p>
              <p>
                <strong>Expiry Date:</strong> {inventoryItem.exp_date}
              </p>
              <p>
                <strong>Vehicle Brand and Model:</strong>{" "}
                {inventoryItem.vehicle_brand_and_model}
              </p>
              <p>
                <strong>Vehicle Manufacture Year:</strong>{" "}
                {inventoryItem.vehicle_man_year}
              </p>
              <p>
                <strong>Re-Ordered Level:</strong>{" "}
                {inventoryItem.reorder_level}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(inventoryItem.pid)}
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {showPopUp && <PopUp message={popUpMessage} onClose={closePopUp} />}

      {/* Show the "No Product found" popup */}
      {showNotFoundPopUp && (
        <PopUp message={popUpMessage} onClose={closeNotFoundPopUp} />
      )}
    </div>
  );
}

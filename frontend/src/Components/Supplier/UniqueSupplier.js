import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function UniqueSupplier() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/supplier/get/${id}`);
          setSupplier(response.data.supplier);
        }
      } catch (error) {
        alert('Error fetching supplier:', error.message);
      }
    };

    fetchSupplierData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchSupplierDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/supplier/get/${searchQ}`);
        setSupplier(response.data.supplier);
      }
    } catch (error) {
      alert('Error fetching supplier:', error.message);
    }
  };

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:8411/supplier/delete/${supplierId}`);
      alert('Supplier deleted successfully.');
      // Navigate to All Suppliers page
      window.location.href = "/supplier/allSuppliers";
    } catch (error) {
      alert('Error deleting supplier:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSupplierDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique Supplier</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Supplier ID"
        />
        <button type="submit">Fetch Supplier Data</button>
        
      </form>

       {supplier ? (
        <ul>
          <li key={supplier.id}>
            Supplier ID: {supplier.supplier_id}<br />
            Supplier Name: {supplier.supplier_name}<br />
            {/*Supplier NIC: {supplier.supplier_NIC}<br />*/}
            Phone Number: {supplier.phone_number}<br />
            Supplier Position: {supplier.supplier_possition}<br />
            Email: {supplier.email}<br />
            Company Name: {supplier.company_name}<br />
            Item Type: {supplier.item_type}<br />
            Item Size: {supplier.item_size}<br />
            Item Code: {supplier.item_code}<br />
            Brand: {supplier.brand}<br />
            Quantity: {supplier.quntity}<br />
            Unit Price: {supplier.unit_price}<br />
            Total Price: {(parseFloat(supplier.quntity) * parseFloat(supplier.unit_price)).toFixed(2)}<br />
            Ordered Date: {supplier.orderd_date}<br />
            Manufactured Date: {supplier.manufatured_date}<br />
            Invoice Number: {supplier.invoice_number}<br />
            <Link to="/supplier/allSuppliers">
          <button type="button">Cancel</button>
        </Link>
            <button onClick={() => handleDelete(supplier.supplier_id)}>Delete Supplier</button>
          </li>
        </ul>
      ) : (
        <p>No supplier found with the specified ID.</p>
      )} 
      {/* Link to All Suppliers page */}
     <Link to="/supplier/allSuppliers">All Suppliers</Link>
    </div>
  );
}
 

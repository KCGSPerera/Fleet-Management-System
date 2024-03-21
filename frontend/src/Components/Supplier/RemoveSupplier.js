 import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UniqueSupplier() {
  const [supplier, setSupplier] = useState(null);
  const [searchQ, setSearchQ] = useState(""); // Assuming you want to search by ID

  useEffect(() => {
    const getSupplier = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/supplier/delete/${searchQ}`
          );
          setSupplier(response.data);
        }
      } catch (error) {
        alert('Error removing supplier:', error.message);
      }
    };

    getSupplier();
  }, [searchQ]);

  return (
    <div className="container">
      <h1>Remove Supplier</h1>
      {supplier ? (
        <ul>
          <li key={supplier.id}>
            Supplier ID: {supplier.supplier_id}<br />
            Supplier Name: {supplier.supplier_name}<br />
            {/*Supplier NIC: {supplier.supplier_NIC}<br />*/}
            Phone Number: {supplier.phone_number}<br />
            Supplier Position: {supplier.supplier_position}<br />
            Email: {supplier.email}<br />
            Company Name: {supplier.company_name}<br />
            Item Type: {supplier.item_type}<br />
            Item Size: {supplier.item_size}<br />
            Item Code: {supplier.item_code}<br />
            Brand: {supplier.brand}<br />
            Quantity: {supplier.quantity}<br />
            Unit Price: {supplier.unit_price}<br />
            Total Price: {supplier.total_price}<br />
            Ordered Date: {supplier.ordered_date}<br />
            Manufactured Date: {supplier.manufactured_date}<br />
            Invoice Number: {supplier.invoice_number}<br />
          </li>
        </ul>
      ) : (
        <p>No supplier found for the delete.</p>
      )}
    </div>
  );
}
 
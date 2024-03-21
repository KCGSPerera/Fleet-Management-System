import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function AllSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8411/supplier/");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error.message);
      }
    };

    getSuppliers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const columns = [
      "Supplier ID",
      "Supplier Name",
      "Phone Number",
      "Supplier Possition",
      "Email",
      /* "Company Name",
      "Item Type",
      "Item Size",
      "Item code",
      "Brand",
      "Quantity",
      "Unit Price",
      "Total Price",
      "Ordered Date",
      "Manufactured Date",
      "Invoice Number", */
    ];

    const rows = filteredSuppliers.map((supplier) => [
      supplier.supplier_id,
      supplier.supplier_name,
      supplier.phone_number,
      supplier.supplier_possition,
      supplier.email,
      /* supplier.company_name,
      supplier.item_type,
      supplier.item_size,
      supplier.item_code,
      supplier.brand,
      supplier.quntity,
      supplier.unit_price,
      supplier.total_price,
      supplier.orderd_date,
      supplier.manufatured_date,
      supplier.invoice_number, */
    ]);

    // Calculate the page height based on the number of rows
    const pageHeight = doc.internal.pageSize.height;
    const tableHeight = rows.length * 20; // Adjust as needed
    let y = 20; // Initial Y position

    if (tableHeight > pageHeight) {
      // Add a new page if the table exceeds the current page height
      doc.addPage();
    }

    // Add a page, set font size and text
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: y, // Start the table at the adjusted Y position
    });

    doc.save("suppliers.pdf");
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const regex = new RegExp(searchTerm, "i");
    return (
      regex.test(supplier.supplier_id) ||
      regex.test(supplier.supplier_name) ||
      //regex.test(supplier.supplier_NIC) ||
      regex.test(supplier.phone_number) ||
      regex.test(supplier.supplier_possition) ||
      regex.test(supplier.email) ||
      regex.test(supplier.company_name) ||
      regex.test(supplier.item_type) ||
      regex.test(supplier.item_size) ||
      regex.test(supplier.item_code) ||
      regex.test(supplier.brand) ||
      regex.test(supplier.quntity) ||
      regex.test(supplier.unit_price) ||
      regex.test(supplier.total_price) ||
      regex.test(supplier.orderd_date) ||
      regex.test(supplier.manufatured_date) ||
      regex.test(supplier.invoice_number)
    );
  });

  return (
    <div className="container">
      <h1 className="heading">All Suppliers</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Apply the search-input class
          placeholder="Search"
        />
      </div>

      <div className="buttons">
        <button onClick={handleDownloadPdf} className="update-button">
          Download as PDF
        </button>
      </div>

      {filteredSuppliers.length > 0 ? (
        <ul className="supplier-list">
          {filteredSuppliers.map((supplier) => (
            <li key={supplier.id} className="supplier-item">
              Supplier ID: {supplier.supplier_id}
              <br />
              Supplier Name: {supplier.supplier_name}
              <br />
              Item Type: {supplier.item_type}
              <br />
              Quantity: {supplier.quntity}
              <br />
              <Link
                to={`/supplier/updateSupplier/${supplier.supplier_id}`}
                state={{ supplierData: supplier }}
              >
                <button className="update-button">Update</button>
              </Link>
              <Link
                to={`/supplier/uniqueSupplier/${supplier.supplier_id}`}
                state={{ supplierData: supplier }}
              >
                <button className="view-button">View</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No suppliers found.</p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//import "./AllInventory.css";



export default function AllInventory() {

  const [inventories, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventories, setFilteredInventories] = useState([]);



  // function to display all the items 

  useEffect(() => {

    const getInventory = async ()=>{
        try{
            const response =  await axios.get('http://localhost:8411/inventory/');
            setInventory(response.data);
        }catch(error){
            alert('Error fetching Items:', error.message);
        }
    };

    // function getInventory() {
    //   axios
    //     .get("http://localhost:8411/inventory/")
    //     .then((res) => {
    //       setInventory(res.data);
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // }
    getInventory();
  }, []);

// Function to handle deletion of an inventory item
const handleDelete = async (itemId) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Do you want to delete the item?");
  
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
        // After successful deletion, update the inventories list to reflect the changes
        const updatedInventories = inventories.filter(
          (inventory) => inventory.pid !== itemId
        );
        setInventory(updatedInventories);
        alert("Item deleted successfully.");
      } catch (error) {
        alert(`Error deleting item: ${error.message}`);
      }
    } else {
      // User clicked "No," do nothing
    }
  };
  

  useEffect(() => {
    // Filter the data based on the search term
    const filteredData = inventories.filter((inventory) =>
      Object.values(inventory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredInventories(filteredData);
  }, [searchTerm, inventories]);



//   const handleResetSearch = () => {
//     setSearchQuery("");
//     const getInventory = async () => {
//       try {
//         const response = await axios.get("http://localhost:8411/inventory/");
//         setInventory(response.data);
//       } catch (error) {
//         alert("Error fetching Items:", error.message);
//       }
//     };

//     getInventory();
//   };



// Function to generate and download the PDF report
const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    // Define columns and rows for the table (similar to what you did in your existing code)
    const columns = [
      "Product ID",
      "Product Name",
      "Product Brand",
      "Product Quantity",
      "Unit Price",
      "Re-Order Level",
    ];
    const rows = filteredInventories.map((inventory) => [
      inventory.pid,
      inventory.name,
      inventory.brand,
      inventory.qty,
      inventory.unit_price,
      inventory.reorder_level,
    ]);

    // Calculate the page height based on the number of rows
    const pageHeight = doc.internal.pageSize.height;
    const tableHeight = rows.length * 10; // Adjust as needed
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

    // Save the PDF with a name
    doc.save("inventory_report.pdf");

};



  return (
    <div className="all-inventory-container-g9">
        <div className="left-g1">
      <h1>Inventory</h1>

      {/* Search input and buttons */}
        <div className="search-container-g2">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        </div>

        <div className="buttons-container-g3">
        <button type="button" onClick={generatePdf}>Generate and Download Monthly Report</button>
      </div>

        {/* <button onClick={handleSearch}>Search</button>
        <button onClick={handleResetSearch}>Reset</button> */}

      </div>

        
      <div className="table-container-g4">
      <table className="table-g5">
        <thead>
          <tr>
            <th>Product ID</th>
            {/* <th>Product Type</th> */}
            <th>Product Name</th>
            <th>Product Brand</th>
            <th>Product Quantity</th>
            <th>Unit Price</th>
            {/* <th>Product Size</th> */}
            {/* <th>Voltage</th>
            <th>Battery Ampers</th>
            <th>Manufactured Date</th>
            <th>Expiry Date</th>
            <th>Vehicle Brand and Model</th>
            <th>Vehicle Manufactured Year</th> */}
            <th>Re-Order Level</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>


          {filteredInventories.map((inventory) => (         // before => {inventories.map((inventory) => (
            <tr key={inventory._id}>
              <td>{inventory.pid}</td>
              {/* <td>{inventory.type}</td> */}
              <td>{inventory.name}</td>
              <td>{inventory.brand}</td>
              <td>{inventory.qty}</td>
              <td>{inventory.unit_price}</td>
              {/* <td>{inventory.size}</td>
              <td>{inventory.voltage}</td>
              <td>{inventory.amp_hrs}</td>
              <td>{inventory.man_date}</td>
              <td>{inventory.exp_date}</td>
              <td>{inventory.vehicle_brand_and_model}</td>
              <td>{inventory.vehicle_man_year}</td> */}
              <td>{inventory.reorder_level}</td>
              <td>
                
              <Link to={`/inventory/uniqueInventory/${inventory.pid}`} state={{ inventoryData: inventory}}>
                <button className="btn btn-primary-g6">View</button>
                </Link>
              </td>
{/* <td>
<Link
  to={{
    pathname: `/inventory/uniqueInventory/${inventory._id}`,
    state: { inventoryData: inventory },
  }}
>
  <button className="btn btn-primary">View</button>
</Link>
</td> */}


              <td>
              <Link to={`/inventory/updateInventory/${inventory.pid}`} state={{ inventoryData: inventory}}>
                <button className="btn btn-primary-g7">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger-g8"
                  onClick={() => handleDelete(inventory.pid)}
                >
                  Delete
                </button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>



      </div>

     </div>
  );
}

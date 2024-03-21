import React from 'react';
import { Link } from 'react-router-dom';

//import Button from 'react-bootstrap/Button';

const Supplier = () => {
  return (
    <div className="supplier-container">
      <h2>Supplier Main Page</h2>
      <ul className="supplier-list">
        {/* <li>
        <Link to="/supplier/addSupplier">
          <Button variant="primary">
          {/* <Link to="/supplier/addSupplier">Add Supplier</Link> }
          Add Suppllier
            </Button>{' '}
            </Link>
        </li>
 */}
      <li>
          <button className="supplier-button">
          <Link to="/supplier/addSupplier" className="supplier-link">Add Supplier</Link>
          </button>
        </li>
        <li>
          <button className="supplier-button">
            <Link to="/supplier/allSuppliers" className="supplier-link">View Supplier</Link>
          </button>
        </li>
        <li>
          <button className="supplier-button">
            <Link to="/supplier/updateSupplier" className="supplier-link">Update Supplier</Link>
          </button>
        </li>
        <li>
          <button className="supplier-button">
            <Link to="/supplier/uniqueSupplier" className="supplier-link">Unique Supplier</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Supplier;

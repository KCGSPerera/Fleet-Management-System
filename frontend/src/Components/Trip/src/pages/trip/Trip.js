import React from 'react';
import { Link } from 'react-router-dom';
//import './AllTrip.css'; // Import the CSS with the desired styles

const Trip = () => {
  return (
    <div className="container dark"> {/* Use the "light" class to match the light theme */}
      <h2 className="heading">Trip Main Page</h2> {/* Use the "heading" class for consistent styling */}
      <ul className="trip-list"> {/* Use the "trip-list" class for consistent styling */}
        <li className="trip-item"> {/* Use the "trip-item" class for consistent styling */}
          <Link to="/Trip/addTrip" className="update-button">Add Trip</Link> {/* Use the "update-button" class for consistent styling */}
        </li>
        <li className="trip-item"> {/* Use the "trip-item" class for consistent styling */}
          <Link to="/Trip/allTrip" className="view-button">View Trip</Link> {/* Use the "view-button" class for consistent styling */}
        </li>
      </ul>
    </div>
  );
}

export default Trip;

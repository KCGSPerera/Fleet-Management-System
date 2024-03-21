import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./AllMaintenance.css";

export default function AllMaintenanceJobs() {
  const [maintenanceJobs, setMaintenanceJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMaintenanceJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8411/corrective/display");
        setMaintenanceJobs(response.data);
      } catch (error) {
        alert("Error fetching maintenance jobs:", error.message);
      }
    };

    getMaintenanceJobs();
  }, []);

  //Fiter changes
  const filterMaintenanceJobs = () => {
    return maintenanceJobs.filter((job) => {
      return (
        job.jobID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return (
    <div className="container1">
      <Link to="/maintenance/addmaintenance" className="create-job-button">
        Create a Job
      </Link>
      <h1><b>Jobs</b></h1>

      <input
        type="text1"
        placeholder="Search by job ID or vehicle number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="maintenance-job-list1">
        {filterMaintenanceJobs().map((job) => (
          <li
            key={job.jobID}
            className={`maintenance-job-box ${job.priority}`}
            onClick={() => {
              // Navigate to the view job page
              window.location.href = `/maintenance/viewJob/${job.jobID}`;
            }}
          >
            <div className="job-info1">
              <div>
                <strong>{job.jobID}</strong>
              </div>
              <div>
                <strong>{job.priority}</strong>
              </div>
              <div>
                <strong>{job.vehicleNo}</strong>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}


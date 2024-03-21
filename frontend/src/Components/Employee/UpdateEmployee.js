import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
    eid: '',
    ename: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
    jobroll: '',
    bsal: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8411/employee/get/${id}`)
      .then((res) => {
        setEmployee(res.data.employee);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8411/employee/update/${id}`, employee)
      .then((res) => {
        setMessage('Employee details updated successfully!');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="containercp2">
      <h1>Update Employee</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-groupcp">
          <label>Employee Name</label>
          <input
            type="text"
            className="form-control"
            name="ename"
            value={employee.ename}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={employee.gender === 'Male'}
              onChange={handleInputChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={employee.gender === 'Female'}
              onChange={handleInputChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-groupcp">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={employee.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={employee.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Job Roll</label>
          <input
            type="text"
            className="form-control"
            name="jobroll"
            value={employee.jobroll}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Basic Salary</label>
          <input
            type="text"
            className="form-control"
            name="bsal"
            value={employee.bsal}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
}

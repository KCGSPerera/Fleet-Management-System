import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";
import { useParams, Link } from "react-router-dom";
import { useTheme, ThemeProvider } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const UniqueEmployee = () => {
  const theme = useTheme();
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


  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/employee/employeedata');
  };

  const handleDelete = async (eid) => {
    try {
      await axios.delete(`http://localhost:8411/employee/delete/${eid}`);
      alert('Employee deleted successfully.');
    
      window.location.href = "/employee/employeedata";
    } catch (error) {
      alert('Error deleting employee:', error.message);
    }
  };

return (
  <ThemeProvider theme={theme}>
  <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form className="uniqueEmployeeForm" onSubmit={handleSubmit}>
        {id && (
      <Header
        title={`EDIT EMPLOYEE DATA FOR ${id}`}
        subtitle="Update Employee Data"
      />
    )}
    
  
        <Box
            display="grid"
            gap=""
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeName"
    label="Employee Name"
    variant="outlined"
    disabled
    value={employee.ename}
    onChange={(e) => handleInputChange(e, setEmployee, "ename")}
  />

<FormControl component="fieldset" className="form-groupcp">
  <FormLabel component="legend">Gender</FormLabel>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>
      <input
        type="radio"
        id="male"
        name="gender"
        disabled
        value="Male"
        checked={employee.gender === 'Male'}
        onChange={(e) => handleInputChange(e, setEmployee, "gender")}
      />
      <label htmlFor="male">Male</label>
    </div>
    <div style={{ marginLeft: '20px' }}>
      <input
        type="radio"
        id="female"
        name="gender"
        disabled
        value="Female"
        checked={employee.gender === 'Female'}
        onChange={(e) => handleInputChange(e, setEmployee, "gender")}
      />
      <label htmlFor="female">Female</label>
    </div>
  </div>
</FormControl>

</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeAddress"
    label="Address"
    disabled
    variant="outlined"
    value={employee.address}
    onChange={(e) => handleInputChange(e, setEmployee, "address")}
  />

  <TextField
    fullWidth
    id="employeePhone"
    disabled
    label="Phone"
    variant="outlined"
    value={employee.phone}
    onChange={(e) => handleInputChange(e, setEmployee, "phone")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeEmail"
    label="Email"
    disabled
    variant="outlined"
    value={employee.email}
    onChange={(e) => handleInputChange(e, setEmployee, "email")}
  />

  <TextField
    fullWidth
    id="employeeDOB"
    label="Date of Birth"
    disabled
    variant="outlined"
    type="date"
    value={employee.dob}
    onChange={(e) => handleInputChange(e, setEmployee, "dob")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeJobroll"
    label="Job Roll"
    disabled
    variant="outlined"
    value={employee.jobroll}
    onChange={(e) => handleInputChange(e, setEmployee, "jobroll")}
  />

  <TextField
    fullWidth
    id="employeeBsal"
    label="Basic Salary"
    variant="outlined"
    disabled
    value={employee.bsal}
    onChange={(e) => handleInputChange(e, setEmployee, "bsal")}
  />
</Box>


</Box>
<Box display="flex" justifyContent="end" mt="20px">
            <button
               className="buttonm"
               onClick={() => handleDelete(employee.eid)}
               fullWidth
               style={{
                 width: '100%',
                 backgroundColor: 'red',
                 color: 'white',
                 padding: '10px',
                 border: 'none',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s',
               }}
               onMouseEnter={(e) => {
                 e.target.style.backgroundColor = 'darkred';
               }}
               onMouseLeave={(e) => {
                 e.target.style.backgroundColor = 'red';
               }}
             >
               DELETE FUEL DISPATCH
             </button>
             <button
               className="buttonm"
               onClick={handleButtonClick}
               fullWidth
               style={{
                 width: '100%',
                 backgroundColor: 'green',
                 color: 'white',
                 padding: '10px',
                 border: 'none',
                 cursor: 'pointer',
                 transition: 'background-color 0.3s',
               }}
               onMouseEnter={(e) => {
                 e.target.style.backgroundColor = 'darkred';
               }}
               onMouseLeave={(e) => {
                 e.target.style.backgroundColor = 'green';
               }}
             >
               BACK FUEL DISPATCH
             </button>
            </Box>
        
        </form>
        </Formik>
        </Box>
        </ThemeProvider>
    
   
       
);

};

export default UniqueEmployee;
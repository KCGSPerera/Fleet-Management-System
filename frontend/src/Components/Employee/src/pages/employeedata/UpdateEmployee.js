import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, Box, Button, TextField, FormLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useTheme, ThemeProvider } from '@mui/material';
import * as yup from "yup";



const validationSchema = yup.object().shape({
  ename: yup
    .string()
    .required("Employee Name is required.")
    .matches(/^[A-Za-z\s]+$/, "Employee Name can only contain letters and spaces."),
  address: yup.string().required("Address is required."),
  phone: yup.string(),
  email: yup.string().email("Invalid email format.").required("Email is required."),
  dob: yup.string().required("Date of Birth is required."),
  jobroll: yup.string(),
  dlicense: yup.string(),
  bsal: yup.string(),
});

const UpdateEmployee = () => {

  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    eid: "",
    ename: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    dob: "",
    jobroll: "",
    dlicense: "",
    bsal: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

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

    validationSchema
      .validate(employee, { abortEarly: false })
      .then(() => {
        axios
          .put(`http://localhost:8411/employee/update/${id}`, employee)
          .then((res) => {
            setMessage("Employee details updated successfully!");
            setIsSuccess(true);
            setTimeout(() => {
              navigate(`/employee/employeedata`);
            }, 2000);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleButtonClick = () => {
    navigate(`/employee/employeedata`);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px">
      <Header title={`EDIT EMPLOYEE DATA FOR ${id}`} subtitle="Update Employee Data" />
      <form className="updateEmployeeForm" onSubmit={handleSubmit}>
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
              name="ename"
              label="Employee Name"
              variant="outlined"
              value={employee.ename}
              onChange={handleInputChange}
              error={!!errors.ename}
              helperText={errors.ename}
            />
          
            <FormControl component="fieldset" className="form-groupcp">
              <FormLabel component="legend">Gender</FormLabel>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={employee.gender === "Male"}
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
                  checked={employee.gender === "Female"}
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              id="employeeAddress"
              name="address"
              label="Address"
              variant="outlined"
              value={employee.address}
              onChange={handleInputChange}
            />
          
            <TextField
              fullWidth
              id="employeePhone"
              name="phone"
              label="Phone"
              variant="outlined"
              value={employee.phone}
              onChange={handleInputChange}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              id="employeeEmail"
              name="email"
              label="Email"
              variant="outlined"
              value={employee.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          
            <TextField
              fullWidth
              id="employeeDOB"
              name="dob"
              label="Date of Birth"
              variant="outlined"
              type="date"
              value={employee.dob}
              onChange={handleInputChange}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              id="employeeJobroll"
              name="jobroll"
              label="Job Roll"
              variant="outlined"
              value={employee.jobroll}
              onChange={handleInputChange}
            />
          
            <TextField
              fullWidth
              id="employeeDLicense"
              name="dlicense"
              label="Driving License"
              variant="outlined"
              value={employee.dlicense}
              onChange={handleInputChange}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              id="employeeBsal"
              name="bsal"
              label="Basic Salary"
              variant="outlined"
              value={employee.bsal}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px" >
<button
               className="buttonm"
               type="submit"
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
               UPDATE EMPLOYEE
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
               BACK TO EMPLOYEE DATA
             </button>
          </Box>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default UpdateEmployee;

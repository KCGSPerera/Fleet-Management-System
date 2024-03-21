import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, ThemeProvider  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../theme"; 

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";

import "./AddEmployee.css";


const AddEmployee = ({ onClose }) => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const location = useLocation();
  const navigate = useNavigate();

  const [eid, setEid] = useState("");
  const [ename, setEname] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [jobroll, setJobroll] = useState("Driver");
  const [dlicense, setDlicense] = useState("");
  const [bsal, setBsal] = useState("");
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (e) => {
    setDob(e.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onClose(); // Close the Add Employee form
    window.location.reload();
  };
  
  function sendData(e) {
    e.preventDefault();

    const newErrors = {};
    if (!eid) {
      newErrors.eid = "Employee ID is required.";
    }
    if (!ename) {
      newErrors.ename = "Employee Name is required.";
    }
    if (!address) {
      newErrors.address = "Address is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEmployee = {
      eid,
      ename,
      gender,
      address,
      phone,
      email,
      dob,
      jobroll,
      dlicense,
      bsal,
    };

    axios
      .post("http://localhost:8411/employee/add", newEmployee)
      .then(() => {
        setOpenDialog(true);
        setEid("");
        setEname("");
        setGender("Male");
        setAddress("");
        setPhone("");
        setEmail("");
        setDob("");
        setJobroll("Driver");
        setDlicense("");
        setBsal("");
        setErrors({});
      })
      .catch((err) => {
        alert(err);
      });
  }

  const validationSchema = yup.object().shape({
    eid: yup.string().required("Employee ID is required."),
    ename: yup.string().required("Employee Name is required."),
    address: yup.string().required("Address is required."),
    phone: yup.string(),
    email: yup.string().email("Invalid email format.").required("Email is required."),
    dob: yup.string().required("Date of Birth is required."),
  });

  return (
    <ThemeProvider theme={theme}>
    <Box m="20px" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isNonMobile ? 600 : '100%', // full width on mobile
          height: 'auto',
          bgcolor: 'background.default', // use default background color from theme
          p: 3, // padding: 35px
          borderRadius: 2, // border-radius: 15px
        }}>
      <button className="addEmployee-close" onClick={onClose}>
          CLOSE
        </button>
      <Formik onSubmit={sendData} validationSchema={validationSchema}>
        {({ errors, touched, handleBlur, handleChange }) => (
          <form className="addEmployeeForm" onSubmit={sendData}>
            <center>
              <Header title="ADD EMPLOYEE" subtitle="Add a new employee to Fleet" />
            </center>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee ID"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setEid(e.target.value);
                  }}
                  value={eid}
                  name="eid"
                  error={!!touched.eid && !!errors.eid}
                  helperText={touched.eid && errors.eid}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.eid && <div className="text-danger">{errors.eid}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee Name"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setEname(e.target.value);
                  }}
                  value={ename}
                  name="ename"
                  error={!!touched.ename && !!errors.ename}
                  helperText={touched.ename && errors.ename}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.ename && <div className="text-danger">{errors.ename}</div>}
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ADDRESS"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Date of Birth"
                  onChange={handleDateChange}
                  value={dob}
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.dob && <div className="text-danger">{errors.dob}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Job Roll"
                  onChange={(e) => {
                    setJobroll(e.target.value);
                  }}
                  value={jobroll}
                  error={!!touched.jobroll && !!errors.jobroll}
                  helperText={touched.jobroll && errors.jobroll}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Driver">Driver</MenuItem>
                  <MenuItem value="Cleaner">Cleaner</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </TextField>
                {errors.jobroll && <div className="text-danger">{errors.jobroll}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Driving License"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setDlicense(e.target.value);
                  }}
                  value={dlicense}
                  name="dlicense"
                  error={!!touched.dlicense && !!errors.dlicense}
                  helperText={touched.dlicense && errors.dlicense}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.dlicense && <div className="text-danger">{errors.dlicense}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Basic Salary"
                  onChange={(e) => {
                    setBsal(e.target.value);
                  }}
                  value={bsal}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>
            </Box>
            <center>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  ADD EMPLOYEE
                </Button>
              </Box>
            </center>
          </form>
        )}
      </Formik>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Employee Added</DialogTitle>
        <DialogContent>
          Employee has been added successfully.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" style={{ color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </ThemeProvider>
  );
};

export default AddEmployee;

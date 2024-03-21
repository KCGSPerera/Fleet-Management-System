import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material';
//import { DatePicker } from '@mui/lab';

import './UpdateSupplier.css';

const UpdateSupplier = () => {
  const theme = useTheme();
  const location = useLocation();

  const [supplierData, setSupplierData] = useState(
    location.state?.supplierData || {
      supplier_id: "",
      supplier_name: "",
      phone_number: "",
      supplier_possition: "",
      email: "",
      company_name: "",
      item_type: "",
      item_size: "",
      item_code: "",
      brand: "",
      quntity: "",
      unit_price: "",
      total_price: "",
      orderd_date: "",
      manufatured_date: "",
      invoice_number: "",
    }
  );


  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const today = new Date().toISOString().split('T')[0];

  const calculateTotalPrice = useCallback(() => {
    const unitPriceValue = parseFloat(supplierData.unit_price) || 0;
    const quantityValue = parseInt(supplierData.quntity, 10) || 0;
    const totalPriceValue = unitPriceValue * quantityValue;
    setTotalPrice(totalPriceValue.toFixed(2)); // Round to 2 decimal places
  }, [supplierData.unit_price, supplierData.quntity]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice, supplierData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
  
    setSupplierData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  
    validateInput(id, newValue);
    if (id === 'unit_price' || id === 'quntity') {
      calculateTotalPrice();
    }
  };

  const handleDateChange = (newValue, id) => {
    setSupplierData((prevData) => ({
      ...prevData,
      [id]: newValue, // Update the date value
    }));
    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // const numberRegex = /^[0-9]*$/;
    const itemCodeRegex = /^[A-Za-z]{2}\d{4}$/;
    
    switch (id) {

    case "supplier_id":
        error = value.length !== 6 ? "Supplier ID must be 6 characters" : "";
        break;

        case "supplier_name":
          error = value.trim() === "" ? "Supplier Name is required" : "";
          break;

    case "phone_number":
        const phoneNumberRegex = /^[0-9]{10}$/;
          error = !phoneNumberRegex.test(value) ? "Phone Number must be exactly 10 digits" : "";
          break;

    case "supplier_possition":
        error = value.trim() === "" ? "Supplier Position is required" : "";
        break;

    case "email":
        error = !emailRegex.test(value) ? "Enter a valid email address" : "";
        break;

    case "company_name":
        error = value.trim() === "" ? "Company Name is required" : "";
        break;

    case "item_type":
        error = value.trim() === "" ? "Item Name is required" : "";
        break;

        case "item_size":
          error =
            value.trim() === "" || !/^\d+(\.\d+)?$/.test(value)
              ? "Item Size should be a valid number"
              : "";
          break;
        

     case "item_code":
        error =
          value.trim() === "" || !itemCodeRegex.test(value)
            ? "Item Code should be 2 letters followed by 4 numbers"
            : "";
        break;

        case "brand":
            error = value.trim() === "" ? "Brand is required" : "";
            break;                            
                                                              
          case "quntity":
              error = isNaN(value) ? "Quantity should contain only numbers" : "";
              break;

        case "unit_price":
          error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
          break;    

          case "orderd_date":
            if (!value) {
              error = "Order Date is required";
            } else {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                error = "Invalid date format";
              } else if (value > today) {
                error = "Order Date cannot be in the future";
              }
            }
            break;
        
          case "manufatured_date":
            if (!value) {
              error = "Manufactured Date is required";
            } else {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                error = "Invalid date format";
              } else if (value > today) {
                error = "Manufactured Date cannot be in the future";
              }
            }
            break;

        case "invoice_number":
                const invoiceNumberRegex = /^[A-Za-z]{2}\d{5}$/;
                if (!value) {
                  error = "Invoice Number is required";
                } else if (!invoiceNumberRegex.test(value)) {
                  error = "Invoice Number should have 2 letters followed by 5 numbers";
                }
                break;
            
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

  if (hasErrors) {
    alert("Please correct the errors before updating.");
    return; // Stop the form submission
  }

  const newSupplier = { ...supplierData };

  if (newSupplier.supplier_id) {
    axios
      .put(`http://localhost:8411/supplier/update/${newSupplier.supplier_id}`, newSupplier)
      .then((response) => {
        resetForm();
        //alert("Supplier successfully updated.");
        window.location.href = "/supplier/supplierdata";
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    alert("Supplier ID is required.");
  }
    //alert("Insert");
    const { supplier_id, 
        supplier_name, 
        //supplier_NIC, 
        phone_number,
        supplier_possition,
        email,
        company_name,
        item_type,
        item_size,
        item_code,
        brand,
        quntity,
        unit_price,
        total_price,
        orderd_date,
        manufatured_date,
        invoice_number } = supplierData;

    if (supplierData.supplier_id) {
      const newSupplier = {
        supplier_id,
        supplier_name,
       // supplier_NIC,
        phone_number,
        supplier_possition,
        email,
        company_name,
        item_type,
        item_size,
        item_code,
        brand,
        quntity,
        unit_price,
        total_price,
        orderd_date,
        manufatured_date,
        invoice_number
      };

      axios
        .put(`http://localhost:8411/supplier/update/${supplier_id}`, newSupplier)
        .then((response) => {
          resetForm();
          alert("Supplier successfully updated.");
          window.location.href = "/supplier/supplierdata"; 
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Supplier ID is required.");
    }
  };

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/supplier/get/${searchQ}`
          );

          if (response.data.supplier) {
            setSupplierData(response.data.supplier);
          }
        }
      } catch (error) {
        alert("Error fetching supplier: " + error.message);
      }
    };

    fetchSupplierData();
  }, [searchQ]);

  const resetForm = () => {
    setSupplierData({
        supplier_id: "",
        supplier_name: "",
        phone_number:"",
        supplier_possition:"",
        email:"",
        company_name:"",
        item_type:"",
        item_size:"",
        item_code:"",
        brand:"",
        quntity:"",
        unit_price:"",
        total_price:"",
        orderd_date:"",
        manufatured_date:"",
        invoice_number:"" 
    });
    setErrors({});
  };

  const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/supplier/supplierdata');
    };




   /* const fetchSupplier = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/supplier/get/${supplierData.supplier_id}`
      );

      const fetchedSupplier = response.data.supplier;

      setSupplierData(fetchedSupplier);
    } catch (error) {
      alert("Error fetching supplier: " + error.message);
    }
  };  */



  

  
  

return (
  <ThemeProvider theme={theme}>
  <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form onSubmit={handleSubmit}>
        {supplierData.supplier_id && (
      <Header
        title={`EDIT SUPPLIER DATA FOR ${supplierData.supplier_id}`}
        subtitle="Update Supplier Data"
      />
    )}
    
    <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Supplier Id to Update"
            id="supplier_id"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Supplier Data"
            name="supplier_id"
            sx={{ gridColumn: "span 2" }}
          />

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
            id="supplier_id"
            label="Supplier ID"
            variant="outlined"
            value={supplierData.supplier_id}
            onChange={handleInputChange}
            error={!!errors.supplier_id}
            helperText={errors.supplier_id}
          />{errors.supplier_id && (
            <div className="invalid-feedback">{errors.supplier_id}</div>
          )}
          <TextField
            fullWidth
            id="supplier_name"
            label="Supplier Name"
            variant="outlined"
            value={supplierData.supplier_name}
            onChange={handleInputChange}
            error={!!errors.supplier_name}
            helperText={errors.supplier_name}
          />
          <TextField
            fullWidth
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            value={supplierData.phone_number}
            onChange={handleInputChange}
            error={!!errors.phone_number}
            helperText={errors.phone_number}
          />
          <TextField
    fullWidth
    id="supplier_possition"
    label="Supplier Position"
    variant="outlined"
    value={supplierData.supplier_possition}
    onChange={(e) => handleInputChange(e, "supplier_possition")}
    error={!!errors.supplier_possition}
    helperText={errors.supplier_possition}
  />
          </Box>
            
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
    fullWidth
    id="email"
    label="Email"
    variant="outlined"
    value={supplierData.email}
    onChange={(e) => handleInputChange(e, "email")}
    error={!!errors.email}
    helperText={errors.email}
  />
  <TextField
    fullWidth
    id="company_name"
    label="Company Name"
    variant="outlined"
    value={supplierData.company_name}
    onChange={(e) => handleInputChange(e, "company_name")}
    error={!!errors.company_name}
    helperText={errors.company_name}
  />
   <TextField
    fullWidth
    id="item_type"
    label="Item Name"
    variant="outlined"
    value={supplierData.item_type}
    onChange={(e) => handleInputChange(e, "item_type")}
    error={!!errors.item_type}
    helperText={errors.item_type}
  />
        <TextField
    fullWidth
    id="item_size"
    label="Item Size"
    variant="outlined"
    value={supplierData.item_size}
    onChange={(e) => handleInputChange(e, "item_size")}
    error={!!errors.item_size}
    helperText={errors.item_size}
  />  
          
          </Box>
          
          
<Box display="flex" justifyContent="end" mt="20px" gap="30px">


 
  
  <TextField
    fullWidth
    id="item_code"
    label="Item Code"
    variant="outlined"
    value={supplierData.item_code}
    onChange={(e) => handleInputChange(e, "item_code")}
    error={!!errors.item_code}
    helperText={errors.item_code}
  />
  <TextField
    fullWidth
    id="brand"
    label="Brand"
    variant="outlined"
    value={supplierData.brand}
    onChange={(e) => handleInputChange(e, "brand")}
    error={!!errors.brand}
    helperText={errors.brand}
  />
  <TextField
    fullWidth
    id="quntity"
    label="Quantity"
    variant="outlined"
    type="number"
    value={supplierData.quntity}
    onChange={(e) => handleInputChange(e, "quntity")}
    error={!!errors.quntity}
    helperText={errors.quntity}
  />
  <TextField
    fullWidth
    id="unit_price"
    label="Unit Price"
    variant="outlined"
    type="number"
    step="0.01"
    value={supplierData.unit_price}
    onChange={(e) => handleInputChange(e, "unit_price")}
    error={!!errors.unit_price}
    helperText={errors.unit_price}
  />
</Box>


<Box display="flex" justifyContent="end" mt="20px" gap="30px">

  <TextField
    fullWidth
    id="total_price"
    label="Total Price"
    variant="outlined"
    type="number"
    value={totalPrice}
    disabled
  />
 <TextField
    fullWidth
    id="orderd_date"
    label="Order Date"
    variant="outlined"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={supplierData.orderd_date?.split('T')[0]}
    onChange={(e) => handleInputChange(e, "orderd_date")}
    error={!!errors.orderd_date}
    helperText={errors.orderd_date}
    max={today} // Setting maximum date to today
/>

<TextField
    fullWidth
    id="manufatured_date"
    label="Manufactured Date"
    variant="outlined"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={supplierData.manufatured_date?.split('T')[0]}
    onChange={(e) => handleInputChange(e, "manufatured_date")}
    error={!!errors.manufatured_date}
    helperText={errors.manufatured_date}
    max={today} // Setting maximum date to today
/>


   {/* <TextField
            fullWidth
            id="orderd_date"
            label="Order Date"
            value={supplierData.orderd_date}
            onChange={(newValue) => handleDateChange(newValue, "orderd_date")}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            error={!!errors.orderd_date}
            helperText={errors.orderd_date}
          />

          <TextField
            fullWidth
            id="manufatured_date"
            label="Manufactured Date"
            value={supplierData.manufatured_date}
            onChange={(newValue) => handleDateChange(newValue, "manufatured_date")}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            error={!!errors.manufatured_date}
            helperText={errors.manufatured_date}
          /> */}

  <TextField
    fullWidth
    id="invoice_number"
    label="Invoice Number"
    variant="outlined"
    value={supplierData.invoice_number}
    onChange={(e) => handleInputChange(e, "invoice_number")}
    error={!!errors.invoice_number}
    helperText={errors.invoice_number}
  />

</Box>


<Box display="flex" justifyContent="end" mt="20px" gap="30px">


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
               UPDATE SUPPLIER DATA
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
               BACK TO SUPPLIER DATA
             </button>
          </Box>
        
        </form>
        </Formik>
        </Box>
        </ThemeProvider>
    

);

};

export default UpdateSupplier;
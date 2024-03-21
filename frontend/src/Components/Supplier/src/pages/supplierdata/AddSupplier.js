import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button} from '@mui/material'; // Import Select and MenuItem from Material-UI
import { Formik } from "formik";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material';
import "./AddSupplier.css";

const generateRandomLetters = (length) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};

const generateSupplierID = () => {
  const randomLetters = generateRandomLetters(2);
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  return `${randomLetters}${randomNumber}`;
};

const AddSupplier = ({ onClose }) => {
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    supplier_id:"",
    supplier_name: "",
    phone_number: "",
    supplier_possition: "",
    email: "",
    company_name: "",
    item_type:"",
    item_size:"",
    item_code:"",
    brand:"",
    quntity:"",
    unit_price:"",
    total_price:"",
    orderd_date:"",
    manufatured_date:"",
    invoice_number:"",

  };

  const[supplier_id, setSupplier_ID] = useState(generateSupplierID()); 
  const[supplier_name, setSupplier_Name] = useState ("");
  const[phone_number, setPhone_Number] = useState ("");
  const[supplier_possition, setSupplier_Position] = useState ("");
  const[email, setEmail] = useState ("");
  const[company_name, setCompany_Name] = useState ("");
  const[item_type, setItem_type] = useState ("");
  const[item_size, setItem_Size] = useState ("");
  const[item_code, setItem_Code] = useState ("");
  const[brand, setBrand] = useState ("");
  const[quntity, setQuntity] = useState ("");
  const[unit_price, setUnit_Price] = useState ("");
  const[total_price, setTotal_Price] = useState ("");
  const[orderd_date, setOrderd_date] = useState ("");
  const[manufatured_date, setManufactured_Date] = useState ("");
  const[invoice_number, setInvoice_Number] = useState ("");

  //const [supplier_idError, setSupplier_idErrorr] = useState("");
  const [supplier_nameError, setSupplier_nameError] = useState("");
  const [phone_numberError, setPhone_numberError] = useState("");
  const [supplier_possitionError, setSupplier_possitionError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [company_nameError, setCompany_nameError] = useState("");
  const [item_typeError, setItem_typeError] = useState("");
  const [item_sizeError, setItem_sizeError] = useState("");
  const [item_codeError, setItem_codeError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [quntityError, setQuntityError] = useState("");
  const [unit_priceError, setUnit_priceError] = useState("");
  //const [total_priceError, setTotal_priceError] = useState("");
  const [orderd_dateError, setOrderd_dateError] = useState("");
  const [manufatured_dateError, setManufatured_dateError] = useState("");
  const [invoice_numberError, setInvoice_numberError] = useState("");

 const [touched, setTouched] = useState({ item_type: false, brand: false });
 const [brandOptions, setBrandOptions] = useState([]);
 //const [errors, setErrors] = useState({});
 const [errors, setErrors] = useState({ item_type: "", brand: "" });
 

  const sentData = (e) => {
    e.preventDefault();

    alert("Insert");
    if (
      
      //!validateSupplierId(supplier_id) ||
      !validateSupplierName(supplier_name) ||
      !validatePhoneNumber(phone_number) ||
      !validateSuppierPossition(supplier_possition) ||
      !validateEmail(email) ||
      !validateCompanyName(company_name) ||
      !validateItemType(item_type) ||
      !validateItemSize(item_size) ||
      !validateItemCode(item_code) ||
      !validateBrand(brand) ||
      !validateQuantity(quntity) ||
      !validateUnitPrice(unit_price) ||
      //!validateTotalPrice(total_price) ||
      !validateOrderdDate(orderd_date)||
      !validateManufaturedDate(manufatured_date) ||
      !validateInvoiceNumber(invoice_number)
    )
    {
      return;
    }
    const newSupplier = {
      supplier_id,
        supplier_name,
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
  .post("http://localhost:8411/supplier/add", newSupplier)
  .then((response) => {
    alert("Supplier added successfully");
    window.location.href = "/supplierdata";
    window.location.reload();

    setSupplier_ID("");
    setSupplier_Name("");
    setPhone_Number("");
    setSupplier_Position("");
    setEmail("");
    setCompany_Name("");
    setItem_type("");
    setItem_Size("");
    setItem_Code("");
    setBrand("");
    setQuntity("");
    setUnit_Price("");
    setTotal_Price("");
    setOrderd_date("");
    setManufactured_Date("");
    setInvoice_Number("");

   
  })
  .catch((err) => {
    alert(err);
    console.error(err);
  });
};

const navigate = useNavigate();

function handleCancel() {
  // Clear form fields when the "Cancel" button is clicked
  setSupplier_ID("");
  setSupplier_Name("");
  setPhone_Number("");
  setSupplier_Position("");
  setEmail("");
  setCompany_Name("");
  setItem_type("");
  setItem_Size("");
  setItem_Code("");
  setBrand("");
  setQuntity("");
  setUnit_Price("");
  setTotal_Price("");
  setOrderd_date("");
  setManufactured_Date("");
  setInvoice_Number("");
}

// Replace setValues with handleChange for handling input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
 // handleChange(e); // Use Formik's handleChange to update Formik state
  if (!value) {
    setErrors({ ...errors, [name]: 'Supplier ID is required' });
  } else {
    const regex = /^[A-Za-z]{2}\d{4}$/;
    setErrors({
      ...errors,
      [name]: regex.test(value) ? null : 'Supplier ID should be 2 letters followed by 4 numbers',
    });
  }
};

const validateSupplierName = (supplierName) => {
  if (!supplierName) {
    setSupplier_nameError("Supplier Name is required.");
    return false;
  }

  setSupplier_nameError("");
  return true;
};

const validateSuppierPossition = (supplier_possition) => {
  if (!supplier_possition) {
    setSupplier_possitionError("Supplier Position is required.");
    return false;
  }

  setSupplier_possitionError("");
  return true;
};


const validatePhoneNumber = (phone_number) => {
  if (!phone_number) {
    setPhone_Number("Phone number is required.");
    return false;
  }

  const regexPattern = /^\d{10}$/;
  if (!regexPattern.test(phone_number)) {
    setPhone_numberError("Entered phone number is invalid. Please enter a 10-digit phone number.");
    return false;
  }

  setPhone_numberError("");  // Clear the error if 10 digits are entered
  return true;
};


const validateEmail = (email) => {
  if (!email) {
    setEmail("Email is required.");
    return false;
  }
  const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexPattern.test(email)) {
    setEmailError("Entered email is invalid");
    return false;
  }

  setEmailError("");
  return true;

};

const validateCompanyName = (company_name) => {
  if (!company_name) {
    setCompany_nameError("Company Name is required.");
    return false;
  }

  setCompany_nameError("");
  return true;
};

const brandOptionsMap = {
  Lubricants: ["Mobil", "Valvoline", "Shell", "Caltex", "Laugfs"],
  Tyres: ["Dunlop", "Michelin", "DSI", "Hankook"],
  BrakePads: ["FBK", "Akebono", "Power Stop", "StopTech"],
  Battery: ["Amaron", "Exide", "Lucas", "Dagenite", "Yokohama"],
  Filters: ["Toyota", "Mitsubishi", "Sakura", "TATA"],
  Fuel: ["Ceypetco", "Synopec"],
};

const validateItemType = (selectedItemType) => {
  if (brandOptionsMap[selectedItemType]) {
    setErrors({ ...errors, item_type: "" });
    setBrandOptions(brandOptionsMap[selectedItemType]);
    return true;
  } else {
    setErrors({ ...errors, item_type: "Please select a valid item type." });
    return false;
  }
};

const handleItemTypeChange = (e) => {
  const selectedItemType = e.target.value;
  setItem_type(selectedItemType);
  setTouched({ ...touched, item_type: true });

  // Set the brand options based on the selected item type
  const options = brandOptionsMap[selectedItemType] || [];
  setBrandOptions(options);

  if (!selectedItemType) {
    setErrors({ ...errors, item_type: "Please select a valid item type." });
  } else {
    setErrors({ ...errors, item_type: "" });
  }
};


const validateBrand = (brandValue) => {
  if (brandValue) {
    setErrors({ ...errors, brand: "" });
    return true;
  } else {
    setErrors({ ...errors, brand: "Brand is required" });
    return false;
  }
};

const handleBrandChange = (e) => {
  const brandValue = e.target.value;
  setBrand(brandValue);
  setTouched({ ...touched, brand: true });
  validateBrand(brandValue);
};

/* const validateItemType = (itemType) => {
  return !!itemType && itemType.trim() !== '';
}; */

/* const handleItemTypeChange = (e) => {
  const selectedItemType = e.target.value;
  setItem_type(selectedItemType);
  setTouched({ ...touched, item_type: true });

  const options = brandOptionsMap[selectedItemType] || [];
  setBrandOptions(options);

  if (!selectedItemType) {
    setItem_typeError('Please select a valid item type.');
  } else {
    setItem_typeError('');
  }
};
 */
/*const validateItemType = (item_type) => {
  if (!item_type) {
    setItem_typeError("Item Name is required.");
    return false;
  }

  setItem_typeError("");
  return true;
};*/

const validateItemSize = (itemSize) => {
  if (!itemSize) {
    setItem_sizeError("Item Size is required.");
    return false;
  }

  const regexPattern = /^\d+(\.\d{1,2})?$/;
  if (!regexPattern.test(itemSize)) {
    setItem_sizeError("Item Size should be a valid number with up to 2 decimal places");
    return false;
  }

  setItem_sizeError("");
  return true;
};


const validateItemCode = (item_code) => {
  if (!item_code) {
    setItem_Code("Item Code is required.");
    return false;
  }
  const regexPattern = /^[A-Za-z]{2}\d{4}$/;
  if (!regexPattern.test(item_code)) {
    setItem_codeError("Item Code should be 3 letters followed by 4 numbers");
    return false;
  }

  setItem_codeError("");
  return true;

};


/* const validateBrand = (brand) => {
  if (!brand) {
    setBrandError("Brand is required.");
    return false;
  }

  setBrandError("");
  return true;
}; */


const validateQuantity = (quantity) => {
  if (!quantity) {
    setQuntityError("Quantity is required.");
    return false;
  }

  const regexPattern = /^[1-9]\d*$/;
  if (!regexPattern.test(quantity)) {
    setQuntityError("Quantity should be a positive integer (only full numbers).");
    return false;
  }
  //calculateTotalPrice(quantityValue);
  setQuntityError("");
  return true;
};


const validateUnitPrice = (unit_price) => {
  if (!unit_price) {
    setUnit_Price("Unit Price is required.");
    return false;
  }

  const regexPattern = /^\d+(\.\d{1,2})?$/;
  if (!regexPattern.test(unit_price)) {
    setUnit_priceError("Unit Price should be a valid number with up to 2 decimal places");
    return false;
  }
  //calculateTotalPrice(unitPriceValue);
  setUnit_priceError("");
  return true;
};


/*   const isDateTodayOrPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison
    return selectedDate <= today;
  }; */

  const validateOrderdDate = (dateString) => {
    if (!dateString) {
      setOrderd_dateError("Ordered Date is required.");
      return false;
    }

    // Extract date components from selectedDate
    const selectedDate = new Date(dateString);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    // Extract date components from today
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    // Compare date components
    if (
      selectedYear > todayYear ||
      (selectedYear === todayYear && selectedMonth > todayMonth) ||
      (selectedYear === todayYear && selectedMonth === todayMonth && selectedDay > todayDay)
    ) {
      setOrderd_dateError("Ordered Date should be today or a past date.");
      return false;
    }

    setOrderd_dateError("");
    return true;
};

  

  const validateManufaturedDate = (dateString) => {
    if (!dateString) {
      setManufactured_Date("Manufactured Date is required.");
      return false;
    }
  
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison
  
    if (selectedDate > today) {
      setManufatured_dateError("Manufactured Date should be today or a past date.");
      return false;
    }
  
    setManufatured_dateError("");
    return true;
  };

const validateInvoiceNumber = (invoiceNumber) => {
  if (!invoiceNumber) {
    setInvoice_numberError("Invoice Number is required.");
    return false;
  }

  const regexPattern = /^[A-Za-z]{2}\d{5}$/;
  if (!regexPattern.test(invoiceNumber)) {
    setInvoice_numberError("Invoice Number should have 2 letters followed by 5 numbers");
    return false;
  }

  setInvoice_numberError("");
  return true;
};




/* const handleChange = (e) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  setValues((prevValues) => ({
    ...prevValues,
    [fieldName]: fieldValue,
  }));
};
 */


  const calculateTotalPrice = useCallback(() => {
    const unitPriceValue = parseFloat(unit_price) || 0;
    const quantityValue = parseInt(quntity, 10) || 0;
    const totalPriceValue = unitPriceValue * quantityValue;
    setTotal_Price(totalPriceValue.toFixed(2)); // Round to 2 decimal places
  }, [unit_price, quntity]);

    useEffect(() => {
      calculateTotalPrice();
    }, [calculateTotalPrice]);

    useEffect(() => {
      const newSupplierId = generateSupplierID();
      setSupplier_ID(newSupplierId);
    }, []);
  
 /*    const handleBlur = (e) => {
      const fieldName = e.target.name;
      setTouched((prevTouched) => ({
        ...prevTouched,
        [fieldName]: true,
      }));
    }; */

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
      <button className="addSupplier-close" onClick={onClose}>
        Close
      </button>
     <Formik onSubmit={sentData} initialValues={initialValues}>
  {({values, errors, touched, handleBlur, handleChange }) => (
    <form onSubmit={sentData}>
            <center>
              <Header title="ADD SUPPLIER" subtitle="Add a new supplier to the supplier management system" />
            </center>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

<TextField
              fullWidth
              variant="filled"
              type="text"
              label="SUPPLIER ID"
              value={supplier_id}  // Use supplier_id instead of generatedSupplierId
              name="supplier_id"
              disabled // Disable editing of supplier ID
              error={!!touched.supplier_id && !!errors.supplier_id}
              helperText={touched.supplier_id && errors.supplier_id}
              sx={{ gridColumn: 'span 2' }}
              onBlur={handleBlur}  // Add onBlur handler
              onChange={handleInputChange}  // Add onChange handler
            />

<div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="SUPPLIER NAME"
      onBlur={handleBlur}
      onChange={(e) => {
        setSupplier_Name(e.target.value);
        validateSupplierName(e.target.value);
        handleChange(e);
      }}
      value={values.supplier_name}
      name="supplier_name"
      error={!!touched.supplier_name && !!errors.supplier_name}
      helperText={touched.supplier_name && errors.supplier_name}
      sx={{ gridColumn: "span 2" }}
    />
    {supplier_nameError && <div className="text-danger">{supplier_nameError}</div>}
    </div>

      <div>
<TextField
  fullWidth
  variant="filled"
  type="number"
  label="PHONE NUMBER"
  onBlur={handleBlur}
  onChange={(e) => {
    const phoneNumber = e.target.value;
    setPhone_Number(phoneNumber);
    validatePhoneNumber(phoneNumber);
    handleChange(e);
    if (phoneNumber.length === 10) {
      setPhone_numberError("");  // Clear the error if 10 digits are entered
    }
  }}
  value={values.phone_number}
  name="phone_number"
  error={!!touched.phone_number && !!errors.phone_number}
  helperText={touched.phone_number && errors.phone_number}
  sx={{ gridColumn: 'span 2' }}
/>
{phone_numberError && <div className="text-danger">{phone_numberError}</div>}

</div>

<div>
<TextField
  fullWidth
  variant="filled"
  type="email"
  label="EMAIL"
  onBlur={handleBlur}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
    handleChange(e)
  }}
  value={values.email}
  name="email"
  error={!!touched.email && !!errors.email}
  helperText={touched.email && errors.email}
  sx={{ gridColumn: "span 2" }}
/>
{emailError && <div className="text-danger">{emailError}</div>}
</div>

<div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="SUPPLIER POSITION"
      onBlur={handleBlur}
      onChange={(e) => {
        setSupplier_Position(e.target.value);
        validateSuppierPossition(e.target.value);
        handleChange(e);
      }}
      value={values.supplier_possition}
      name="supplier_possition"
      error={!!touched.supplier_possition && !!errors.supplier_possition}
      helperText={touched.supplier_possition && errors.supplier_possition}
      sx={{ gridColumn: "span 2" }}
    />
    {supplier_possitionError && <div className="text-danger">{supplier_possitionError}</div>}
    </div>

    <div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="COMAPANY NAME"
      onBlur={handleBlur}
      onChange={(e) => {
        setCompany_Name(e.target.value);
        validateCompanyName(e.target.value);
        handleChange(e);
      }}
      value={values.company_name}
      name="company_name"
      error={!!touched.company_name&& !!errors.company_name}
      helperText={touched.company_name && errors.company_name}
      sx={{ gridColumn: "span 2" }}
    />
    {company_nameError && <div className="text-danger">{company_nameError}</div>}
    </div>

{/*} <div>
<TextField
      fullWidth
      variant="filled"
      label="ITEM NAME"
      onBlur={handleBlur}
      onChange={(e) => {
        //setItem_type(e.target.value);
        //setValues({ ...values, item_type: e.target.value });
        //setErrors({ ...errors, item_type: null });
        setItem_type(e.target.value);
        validateItemType(e.target.value);
        handleItemTypeChange(e);
      }}
      value={values.item_type}
      name="item_type"
      error={!!touched.item_type && !!errors.item_type}
      helperText={touched.item_type && errors.item_type}
      sx={{ gridColumn: "span 2" }}
    >
      <Select
        value={item_type}
        onChange={handleItemTypeChange}
      >
        <MenuItem value="">Select Item Type</MenuItem>
        <MenuItem value="Lubricants">Lubricants (oil)</MenuItem>
        <MenuItem value="Tyres">Tyres</MenuItem>
        <MenuItem value="BrakePads">Brake Pads</MenuItem>
        <MenuItem value="Battery">Battery</MenuItem>
        <MenuItem value="Filters">Filters</MenuItem>
        <MenuItem value="Fuel">Fuel (Diesel & Petrol)</MenuItem>
      </Select>
    </TextField>
    {item_typeError && <div className="text-danger">{item_typeError}</div>}
    </div> */}


{/*<div>
<TextField
        fullWidth
        variant="filled"
        label="ITEM NAME"
        onBlur={() => setTouched({ ...touched, item_type: true })}
        onChange={handleItemTypeChange}
        value={item_type}
        name="item_type"
        error={!!touched.item_type && !!errors.item_type}
        helperText={touched.item_type && errors.item_type}
        sx={{ gridColumn: "span 2" }}
      >
      <Select value={item_type}>
        {/* ... other MenuItems ...
        <MenuItem value="">Select Item Type</MenuItem>
        <MenuItem value="Lubricants">Lubricants (oil)</MenuItem>
        <MenuItem value="Tyres">Tyres</MenuItem>
        <MenuItem value="BrakePads">Brake Pads</MenuItem>
        <MenuItem value="Battery">Battery</MenuItem>
        <MenuItem value="Filters">Filters</MenuItem>
        <MenuItem value="Fuel">Fuel (Diesel & Petrol)</MenuItem>
        </Select>
      </TextField>
      {errors.item_type && <div className="text-danger">{errors.item_type}</div>}
    </div> */}

<div>
  <TextField
    select
    fullWidth
    variant="filled"
    label="ITEM NAME"
    onBlur={() => setTouched({ ...touched, item_type: true })}
    onChange={handleItemTypeChange}
    value={item_type}
    name="item_type"
    error={!!touched.item_type && !!errors.item_type}
    helperText={touched.item_type && errors.item_type}
    sx={{ gridColumn: "span 2" }}
  >
    <MenuItem value="">Select Item Type</MenuItem>
    {Object.keys(brandOptionsMap).map((type) => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
  {errors.item_type && (
    <div className="text-danger">{errors.item_type}</div>
  )}
</div>

<div>
  <TextField
    select
    fullWidth
    variant="filled"
    label="BRAND"
    onBlur={() => setTouched({ ...touched, brand: true })}
    onChange={handleBrandChange}
    value={brand}
    name="brand"
    error={!!touched.brand && !!errors.brand}
    helperText={touched.brand && errors.brand}
    sx={{ gridColumn: "span 2" }}
  >
    {brandOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
  {errors.brand && <div className="text-danger">{errors.brand}</div>}
</div>

{/* <div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="ITEM NAME"
      onBlur={handleBlur}
      onChange={(e) => {
        setItem_type(e.target.value);
        validateItemType(e.target.value);
        handleChange(e);
      }}
      value={values.item_type}
      name="item_type"
      error={!!touched.item_type && !!errors.item_type}
      helperText={touched.item_type && errors.item_type}
      sx={{ gridColumn: "span 2" }}
    />
    {item_typeError && <div className="text-danger">{item_typeError}</div>}
    </div> */}

    <div>
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="ITEM SIZE"
      onBlur={handleBlur}
      onChange={(e) => {
        setItem_Size(e.target.value);
        validateItemSize(e.target.value);
        handleChange(e);
      }}
      value={values.item_size}
      name="item_size"
      error={!!touched.item_size && !!errors.item_size}
      helperText={touched.item_size && errors.item_size}
      sx={{ gridColumn: "span 2" }}
    />
    {item_sizeError && <div className="text-danger">{item_sizeError}</div>}
    </div>

<div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="ITEM CODE"
      onBlur={handleBlur}
      onChange={(e) => {
        setItem_Code(e.target.value);
        validateItemCode(e.target.value);
        handleChange(e);
      }}
      value={values.item_code}
      name="item_code"
      error={!!touched.item_code && !!errors.item_code}
      helperText={touched.item_code && errors.item_code}
      sx={{ gridColumn: "span 2" }}
    />
    {item_codeError && <div className="text-danger">{item_codeError}</div>}
    </div>

 

{/* <div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="BRAND"
      onBlur={handleBlur}
      onChange={(e) => {
        setBrand(e.target.value);
        validateBrand(e.target.value);
        handleChange(e);
      }}
      value={values.brand}
      name="brand"
      error={!!touched.brand && !!errors.brand}
      helperText={touched.brand && errors.brand}
      sx={{ gridColumn: "span 2" }}
    />
    {brandError && <div className="text-danger">{brandError}</div>}
    </div> */}


<div>
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="QUANTITY"
      onBlur={handleBlur}
      onChange={(e) => {
        setQuntity(e.target.value);
        validateQuantity(e.target.value);
        handleChange(e);
      }}
      value={values.quntity}
      name="quntity"
      error={!!touched.quntity && !!errors.quntity}
      helperText={touched.quntity && errors.quntity}
      sx={{ gridColumn: "span 2" }}
    />
    {quntityError && <div className="text-danger">{quntityError}</div>}
    </div>
    

    <div>
<TextField
      fullWidth
      variant="filled"
      type="number"
      label="UNIT PRICE"
      onBlur={handleBlur}
      onChange={(e) => {
        setUnit_Price(e.target.value);
        validateUnitPrice(e.target.value);
        handleChange(e);
      }}
      value={values.unit_price}
      name="unit_price"
      error={!!touched.unit_price && !!errors.unit_price}
      helperText={touched.unit_price && errors.unit_price}
      sx={{ gridColumn: "span 2" }}
    />
    {unit_priceError && <div className="text-danger">{unit_priceError}</div>}
    </div>


<TextField
      fullWidth
      variant="filled"
      type="number"
      label="TOTAL PRICE"
      onBlur={handleBlur}
      onChange={(e) => {
        
        handleChange(e); // Call the Formik handleChange to keep the Formik state updated
      }}
      value={total_price}
      name="total_price"
      error={!!touched.total_price && !!errors.total_price}
      helperText={touched.total_price && errors.total_price}
      sx={{ gridColumn: 'span 2' }}
    />

<div>
<TextField
      fullWidth
      variant="filled"
      type="date"
      label="ORDER DATE"
      onBlur={handleBlur}
      onChange={(e) => {
        setOrderd_date(e.target.value);
        validateOrderdDate(e.target.value);
        handleChange(e);
      }}
      value={values.orderd_date}
      name="orderd_date"
      error={!!touched.orderd_date && !!errors.orderd_date}
      helperText={touched.orderd_date && errors.orderd_date}
      sx={{ gridColumn: "span 2" }}
    />
    {orderd_dateError && <div className="text-danger">{orderd_dateError}</div>}
    </div>
    
    <div>
<TextField
      fullWidth
      variant="filled"
      type="date"
      label="MANUFACTURED DATE"
      onBlur={handleBlur}
      onChange={(e) => {
        setManufactured_Date(e.target.value);
        validateManufaturedDate(e.target.value);
        handleChange(e);
      }}
      value={values.manufatured_date}
      name="manufatured_date"
      error={!!touched.manufatured_date && !!errors.manufatured_date}
      helperText={touched.manufatured_date && errors.manufatured_date}
      sx={{ gridColumn: "span 2" }}
    />
    {manufatured_dateError&& <div className="text-danger">{manufatured_dateError}</div>}
    </div>
    

<div>
<TextField
      fullWidth
      variant="filled"
      type="text"
      label="INVOICE NUMBER"
      onBlur={handleBlur}
      onChange={(e) => {
        setInvoice_Number(e.target.value);
        validateInvoiceNumber(e.target.value);
        handleChange(e);
      }}
      value={values.invoice_number}
      name="invoice_number"
      error={!!touched.invoice_number && !!errors.invoice_number}
      helperText={touched.invoice_number && errors.invoice_number}
      sx={{ gridColumn: "span 2" }}
    />
    {invoice_numberError && <div className="text-danger">{invoice_numberError}</div>}
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
            ADD SUPPLIER
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            //type="button"
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </Box>
      </center>
          </form>
        )}
      </Formik>
    </Box>
    </ThemeProvider>
  );
};

export default AddSupplier;
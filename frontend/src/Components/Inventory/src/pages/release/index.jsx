// import React, { useState, useEffect } from "react";
// import { Box, useTheme, Button, IconButton, } from "@mui/material";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import "./index.css";




// const Fuelstock = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

  
  


// };

// export default Fuelstock;



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


import '../inventorydata/UpdateInventory.css';
import '../inventorydata/PopUp.css';

emailjs.init("RnzlVKpWiSPUCD2ru");

const UpdateInventory = () => {
  const theme = useTheme();
  const location = useLocation();

  const { id } = useParams();
  console.log("Received ID:", id);
  

  



const [pid, setPid] = useState("");
const [type, setType] = useState("");
const [name, setName] = useState("");
const [brand, setBrand] = useState("");
const [qty, setQty] = useState("");
const [unit_price, setUnitPrice] = useState("");
const [size, setSize] = useState("");
const [voltage, setVoltage] = useState("");
const [amp_hrs, setAmpHrs] = useState("");
const [man_date, setManDate] = useState("");
const [exp_date, setExpDate] = useState("");
const [vehicle_brand_and_model,  setVehicleBrandAndModel] = useState("");
const [vehicle_man_year, setVehicleManYear] = useState("");
const [reorder_level, setReOrderLevel] = useState("");

const [searchQ, setSearchQ] = useState("");
const [inventory, setInventory] = useState(null);
const [showReorderWarning, setShowReorderWarning] = useState(false);
const [showReorderWarningModal, setShowReorderWarningModal] = useState(false);

// Step 1: Add a state variable for quantity to release
const [qtyToRelease, setQtyToRelease] = useState(0);
//   const [reorderReached, setReorderReached] = useState(false);

//   const history = useHistory(); // Initialize the useHistory hook


//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialInventory = location.state && location.state.InventoryDetails
//   ? location.state.InventoryDetails
//   : {
//     pid: "",
//     type: "",
//     name: "",
//     brand: "",
//     qty: "",
//     unit_price: "",
//     size: "",
//     voltage: "",
//     amp_hrs: "",
//     man_date: "",
//     exp_date: "",
//     vehicle_brand_and_model: "",
//     vehicle_man_year: "",
//     reorder_level: "",

//   };

const [errors, setErrors] = useState({
  pid: "",
  type: "",
  name: "",
  brand: "",
  qty: "",
  unit_price: "",
  size: "",
  voltage: "",
  amp_hrs: "",
  man_date: "",
  exp_date: "",
  vehicle_brand_and_model: "",
  vehicle_man_year: "",
  reorder_level: "",
});



// useEffect for searchQ

useEffect(() => {
  const fetchInventoryData = async () => {
    try {
      if (searchQ ) {  // searchQ
        const response = await axios.get(
          `http://localhost:8411/inventory/get/${searchQ}`  //searchQ
        );

        if (response.data.inventory) {
          setInventory(response.data.inventory);

          const inventoryData = response.data.inventory;

          const manDate = new Date(inventoryData.man_date);
          const expDate = new Date(inventoryData.exp_date);

          const formattedManDate = manDate.toISOString().split('T')[0];
          const formattedExpDate = expDate.toISOString().split('T')[0];

          setPid(inventoryData.pid);
          setType(inventoryData.type);
          setName(inventoryData.name);
          setBrand(inventoryData.brand);
          setQty(inventoryData.qty);
          setUnitPrice(inventoryData.unit_price);
          setSize(inventoryData.size);
          setVoltage(inventoryData.voltage);
          setAmpHrs(inventoryData.amp_hrs);
          setManDate(formattedManDate);
          setExpDate(formattedExpDate);
          setVehicleBrandAndModel(inventoryData.vehicle_brand_and_model);
          setVehicleManYear(inventoryData.vehicle_man_year);
          setReOrderLevel(inventoryData.reorder_level);
        }
      }
    } catch (error) {
      alert("Error fetching inventory: " + error.message);
    }
  };

  fetchInventoryData();
}, [searchQ]);


// useEffect for id

useEffect(() => {
  const fetchInventoryData = async () => {
    try {
      if (id ) {  // searchQ
        const response = await axios.get(
          `http://localhost:8411/inventory/get/${id}`  //searchQ
        );

        if (response.data.inventory) {
          setInventory(response.data.inventory);

          const inventoryData = response.data.inventory;

          const manDate = new Date(inventoryData.man_date);
          const expDate = new Date(inventoryData.exp_date);

          const formattedManDate = manDate.toISOString().split('T')[0];
          const formattedExpDate = expDate.toISOString().split('T')[0];

          setPid(inventoryData.pid);
          setType(inventoryData.type);
          setName(inventoryData.name);
          setBrand(inventoryData.brand);
          setQty(inventoryData.qty);
          setUnitPrice(inventoryData.unit_price);
          setSize(inventoryData.size);
          setVoltage(inventoryData.voltage);
          setAmpHrs(inventoryData.amp_hrs);
          setManDate(formattedManDate);
          setExpDate(formattedExpDate);
          setVehicleBrandAndModel(inventoryData.vehicle_brand_and_model);
          setVehicleManYear(inventoryData.vehicle_man_year);
          setReOrderLevel(inventoryData.reorder_level);
        }
      }
    } catch (error) {
      alert("Error fetching inventory: " + error.message);
    }
  };

  fetchInventoryData();
}, [id]);


  // Function to check if the quantity reaches the reorder level and show a warning
  const checkReorderLevel = (updatedQty, reorderLevel) => {
      if (updatedQty <= reorderLevel) {
        setShowReorderWarningModal(true);
      } else {
        setShowReorderWarningModal(false);
      }
    };
    
  
    // Function to handle quantity input change
    const handleQtyChange = (e) => {
      const updatedQty = parseInt(e.target.value, 10); // Convert input to an integer
      setQty(updatedQty); // Update the quantity state
  
      // Call the function to check if reorder level is reached
      checkReorderLevel(updatedQty, reorder_level);

      // Call the function to check if reorder level is reached
//   if (updatedQty <= reorder_level) {
//     setShowReorderWarning(true);
//   } else {
//     setShowReorderWarning(false);
//   }

    };


    




// Function to send an email to supplier


    function contactSupplyManager  ()  {
      // Define your EmailJS service ID, template ID, and user ID
      const serviceId = "service_gy8ucp6";
      const templateId = "template_yi0ely8";
      const userId = "RnzlVKpWiSPUCD2ru";

      const message = `Re Order Level has reached for product ${id}. Please take necessary actions.`;

    
      // Create a template parameters object with the product ID and any other data you want to include
      const templateParams = {
        productID: id, // Assuming urlPid contains the product ID
        message,//: 'Re Order Level has reached for product ${id}. Please take nessasarry actions.',
        to_name: 'Supply Manager',
        from_name: 'Inventory Manager'
        
      };
    
      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          console.log("Email sent successfully:",response);
          alert("Email sent successfully:");
          // Close the modal or perform any other actions
          setShowReorderWarningModal(false);

          
        })
        .catch((error) => {
          // console.error("Email send error:", error);
          alert("Email send error:", error);
          // Handle the error, e.g., display an error message to the user
        });
    };
    


function handleInputChange(e, setter, fieldName) {
  const value = e.target.value;
  setter(value);

  const validationFunction = getValidationFunction(fieldName);
  const isValid = validationFunction(value);
  setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: isValid ? "" : getErrorMessage(fieldName),
  }));
}

function sentData(e) {
  e.preventDefault();

  const hasErrors = Object.values(errors).some((error) => error !== "");
  if (hasErrors) {
    alert("Please fix validation errors before submitting.");
    return;
  }

  if (inventory) {
    const newInventory = {
      pid,
      type,
      name,
      brand,
      qty,
      unit_price,
      size,
      voltage,
      amp_hrs,
      man_date,
      exp_date,
      vehicle_brand_and_model,
      vehicle_man_year,
      reorder_level
    };

    axios
      .put(`http://localhost:8411/inventory/update/${pid}`, newInventory)
      .then((response) => {

          //  alert("Updated Successfully...")
          // window.location.href = '/inventory/allInventory';
      //   resetForm();
        console.log(response);
      })
      .catch((err) => {
        alert(err);
      });
      alert("Updated Successfully...")
      resetForm();
              // Redirect to the AllInventory page
       window.location.href = '/inventory/inventorydata'; 

      // history.push("/inventory/allInventory");  // Redirect to the AllInventory page after a successful update


  } else {
    alert("Inventory data is null.");
  }
}

function resetForm() {
  setPid("");
  setType("");
  setName("");
  setBrand("");
  setQty("");
  setUnitPrice("");
  setSize("");
  setVoltage("");
  setAmpHrs("");
  setManDate("");
  setExpDate("");
  setVehicleBrandAndModel("");
  setVehicleManYear("");
  setReOrderLevel("");
}

const validatePid = (pid) => {
  const regexPattern = /^[a-zA-Z]{3}\d{5}$/;
  return regexPattern.test(pid);
};

const validateType = (type) => {
  return type.length <= 25;
};

const validateName = (name) => {
  return name.length <= 25;
};

const validateBrand = (brand) => {
  return brand.length <= 25;
};

const validateQty = (qty) => {
  return /^\d+$/.test(qty);
};

const validateUnitPrice = (unitPrice) => {
  return !isNaN(parseFloat(unitPrice)) && parseFloat(unitPrice) && (/^\d+$/.test(unitPrice))>= 0;
};

const validateSize = (size) => {
  return size.length <= 50 || size === "";
};

/*
const validateVoltage = (voltage) => {
  return !isNaN(parseFloat(voltage)) || voltage === "";
};
*/

const validateVoltage = (voltage) => {
  if (voltage === "") {
    return true; // Field is empty, so it's valid
  }

  const parsedVoltage = parseInt(voltage);
  return !isNaN(parsedVoltage) && parsedVoltage >= 0 && parsedVoltage <= 24;
};


/*
const validateAmpHrs = (ampHrs) => {
  if (ampHrs === "") {
    return true;
  }
  return !isNaN(parseFloat(ampHrs)) && parseFloat(ampHrs) >= 0;
};
*/

const validateAmpHrs = (ampHrs) => {
  if (ampHrs === "") {
    return true; // Field is empty, so it's valid
  }

  const parsedAmpHrs = parseFloat(ampHrs);
  return !isNaN(parsedAmpHrs) && parsedAmpHrs >= 0 && parsedAmpHrs <= 500 && Number.isInteger(parsedAmpHrs);
};

/*
const validateManDate = (manDate) => {
  const currentDate = new Date();
  return new Date(manDate) < currentDate;
};
*/

const validateManDate = (manDate) => {
const inputDate = new Date(manDate);
const currentDate = new Date(); // Get the current date

return inputDate < currentDate;
};



const validateExpDate = (expDate) => {
  const currentDate = new Date();
  return new Date(expDate) > currentDate;
};

const validateVehicleBrandAndModel = (value) => {
  return value.length <= 50 || value === "";
};

/*
const validateVehicleManYear = (year) => {
  const currentYear = new Date().getFullYear();
  return !isNaN(parseInt(year)) && parseInt(year) < currentYear;
};
*/

//   const validateVehicleManYear = (year) => {
//     const currentYear = new Date().getFullYear();
//     const parsedYear = parseInt(year);

//     if (year === "") {
//       return true; // Field is empty, so it's valid
//     }

  const validateVehicleManYear = (value) => {
      if (value === "") {
        return true; // Field is empty, so it's valid
      }
    
      const parsedValue = parseInt(value);
      const currentYear = new Date().getFullYear();
    
      return (
        !isNaN(parsedValue) &&
        parsedValue >= 1990 &&
        parsedValue <= currentYear
      );
    };









const validateReorderLevel = (level) => {
  return /^\d+$/.test(level) && parseInt(level) >= 10 && parseInt(level) <= 100;
};

const getValidationFunction = (fieldName) => {
  switch (fieldName) {
    case "pid":
      return validatePid;
    case "type":
      return validateType;
    case "name":
      return validateName;
    case "brand":
      return validateBrand;
    case "qty":
      return validateQty;
    case "unit_price":
      return validateUnitPrice;
    case "size":
      return validateSize;
    case "voltage":
      return validateVoltage;
    case "amp_hrs":
      return validateAmpHrs;
    case "man_date":
      return validateManDate;
    case "exp_date":
      return validateExpDate;
    case "vehicle_brand_and_model":
      return validateVehicleBrandAndModel;
    case "vehicle_man_year":
      return validateVehicleManYear;
    case "reorder_level":
      return validateReorderLevel;
    default:
      return () => true; // Default to always valid
  }
};

const getErrorMessage = (fieldName) => {
  switch (fieldName) {
    case "pid":
      return "Invalid Product ID. It should be 3 uppercase or lowercase letters followed by 5 whole numbers and cannot be edited.";
    case "type":
      return "Product Type should contain a maximum of 25 characters.";
    case "name":
      return "Product Name should contain a maximum of 25 characters.";
    case "brand":
      return "Brand should contain a maximum of 25 characters.";
    case "qty":
      return "Quantity should be a non-negative whole number.";
    case "unit_price":
      return "Unit Price should be a non-negative real number.";
    case "size":
      return "Product Size should contain a maximum of 50 characters.";
    case "voltage":
      return "Voltage should be a non-negative whole or real number and should not exceed 24 Volts.";
    case "amp_hrs":
      return "Ampiers should be a non-negative whole or real number and should not exceed 500 Ampiers.";
    case "man_date":
      return "Manufactured Date should be before the current date.";
    case "exp_date":
      return "Expiry Date should be after the current date.";
    case "vehicle_brand_and_model":
      return "Vehicle Brand And Model should contain a maximum of 50 characters.";
    case "vehicle_man_year":
      return "Vehicle Manufacture Year should be a positive whole number less than the current year. Vehicles before 1990 are not accepted";
    case "reorder_level":
      return "Re-Order Level should be a positive whole number greater than or equal to 10 and less than or equal to 100.";
    default:
      return ""; // Default error message
  }

};




const handleRelease = () => {
  if (qtyToRelease > 0 && qtyToRelease <= qty) {
    const updatedQty = qty - qtyToRelease;
    setQty(updatedQty);

    // Call the function to check if reorder level is reached
    checkReorderLevel(updatedQty, reorder_level);
  } else {
    alert("Invalid quantity to release");
  }
};




const navigate = useNavigate();
  
const handleButtonClick = () => {
  navigate('/inventory/inventorydata');
};



return (
  <ThemeProvider theme={theme}>
  <Box m="20px">
      
      <Formik
      
        onSubmit={sentData}
      >
        
        <form onSubmit={sentData}>
        {pid && (
      <Header
        title={`RELEASE SPARE PART ${pid} TO MAINTENANCE UNIT`}
        subtitle="Release Spare Parts"
      />
    )}





    
    <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Product Id to Update"
            id="pid"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Supplier Data"
            name="pid"
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
    id="pid"
    label="PRODUCT ID"
    variant="outlined"
    value={pid}
    onChange={(e) => handleInputChange(e, setPid, "pid")}
    disabled
    error={!!errors.pid}
    helperText={errors.pid}
/>

</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
    fullWidth
    id="type"
    label="TYPE"
    variant="outlined"
    value={type}
    onChange={(e) => handleInputChange(e, setType, "type")}
    disabled
    error={!!errors.type}
    helperText={errors.type}
/>

<TextField
    fullWidth
    id="name"
    label="NAME"
    variant="outlined"
    value={name}
    onChange={(e) => handleInputChange(e, setName, "name")}
    disabled
    error={!!errors.name}
    helperText={errors.name}
/>

<TextField
    fullWidth
    id="brand"
    label="BRAND"
    variant="outlined"
    value={brand}
    onChange={(e) => handleInputChange(e, setBrand, "brand")}
    disabled
    error={!!errors.brand}
    helperText={errors.brand}
    
/>
<TextField
    fullWidth
    id="reorder_level"
    label="REORDER LEVEL"
    variant="outlined"
    value={reorder_level}
    onChange={(e) => handleInputChange(e, setReOrderLevel, "reorder_level")}
    disabled
    error={!!errors.reorder_level}
    helperText={errors.reorder_level}
   
/>


</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
<TextField
    fullWidth
    id="qty"
    label="QUANTITY"
    variant="outlined"
    value={qty}
    onChange={(e) => {
      handleInputChange(e, setQty, "qty");
      handleQtyChange(e);
  }}
  disabled
  error={!!errors.qty}
  helperText={errors.qty}
/>
 {/* Render the warning modal */}
 {showReorderWarningModal && (  
                <div className="modal">
                 <div className="modal-content">
                    <h2>Reorder Level is reached!</h2>
                    <p>Product ID: {id}</p>     
                    <p>Contact the Supply Manager?</p>
                    <button type="button" onClick={contactSupplyManager}>Contact Supply Manager</button>
                    <button onClick={() => setShowReorderWarningModal(false)}>Cancel</button>
                 </div>
                </div>
            )}



{/* Step 2: Create an input field for the quantity to release */}
<TextField
            fullWidth
            type="number"
            label="Quantity to Release"
            variant="outlined"
            value={qtyToRelease}
            onChange={(e) => setQtyToRelease(parseInt(e.target.value))}
          />

          <Box
            display="grid"
            gap=""
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            {/* ... (previous code) */}



{/* <TextField
    fullWidth
    id="unit_price"
    label="UNIT PRICE"
    variant="outlined"
    value={unit_price}
    onChange={(e) => handleInputChange(e, setUnitPrice, "unit_price")}
    error={!!errors.unit_price}
    helperText={errors.unit_price}
    
/>

<TextField
    fullWidth
    id="size"
    label="SIZE"
    variant="outlined"
    value={size}
    onChange={(e) => handleInputChange(e, setSize, "size")}
    error={!!errors.size}
    helperText={errors.size}
/>


<TextField
    fullWidth
    id="voltage"
    label="VOLTAGE"
    variant="outlined"
    value={voltage}
    onChange={(e) => handleInputChange(e, setVoltage, "voltage")}
    error={!!errors.voltage}
    helperText={errors.voltage}
    
/> */}


</Box>
{/* <Box display="flex" justifyContent="end" mt="20px" gap="30px">
<TextField
    fullWidth
    id="amp_hrs"
    label="AMP HOURS"
    variant="outlined"
    value={amp_hrs}
    onChange={(e) => handleInputChange(e, setAmpHrs, "amp_hrs")}
    error={!!errors.amp_hrs}
    helperText={errors.amp_hrs}
    
/>
<TextField
    fullWidth
    id="man_date"
    label="MANUFACTURE DATE"
    variant="outlined"
    value={man_date}
    onChange={(e) => handleInputChange(e, setManDate, "man_date")}
    error={!!errors.man_date}
    helperText={errors.man_date}
    
/>


<TextField
    fullWidth
    id="exp_date"
    label="EXPIRY DATE"
    variant="outlined"
    value={exp_date}
    onChange={(e) => handleInputChange(e, setExpDate, "exp_date")}
    error={!!errors.exp_date}
    helperText={errors.exp_date}
    
/>




<TextField
    fullWidth
    id="vehicle_man_year"
    label="VEHICLE MANUFACTURE YEAR"
    variant="outlined"
    value={vehicle_man_year}
    onChange={(e) => handleInputChange(e, setVehicleManYear, "vehicle_man_year")}
    error={!!errors.vehicle_man_year}
    helperText={errors.vehicle_man_year}
  
/>

</Box> */}
<Box display="flex" justifyContent="end" mt="20px" gap="30px">

{/* <TextField
    fullWidth
    id="vehicle_brand_and_model"
    label="VEHICLE BRAND & MODEL"
    variant="outlined"
    value={vehicle_brand_and_model}
    onChange={(e) => handleInputChange(e, setVehicleBrandAndModel, "vehicle_brand_and_model")}
    error={!!errors.vehicle_brand_and_model}
    helperText={errors.vehicle_brand_and_model}
  
/> */}

</Box>

</Box>
<Box display="flex" justifyContent="end" mt="20px">

<Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleRelease} // Step 3: Handle the release action
              >
                Release Item
              </Button>
            
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
               UPDATE PRODUCT
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
               BACK TO INVENTORY DATA
             </button>
          </Box>
          </Box>
        </form>
        
        </Formik>
        </Box>
    
        </ThemeProvider>
       
);

};


export default UpdateInventory;
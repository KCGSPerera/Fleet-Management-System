import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme, ThemeProvider } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import { useParams} from "react-router-dom";


import './UpdateInventory.css';



const UniqueInventory = () => {
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



const handleDelete = async (pid) => {
  try {
    await axios.delete(`http://localhost:8411/inventory/delete/${pid}`);
    alert('Product deleted successfully.');
    // Navigate to All Fuel entry page
    window.location.href = "/inventory/inventorydata";
  } catch (error) {
    alert('Error deleting fuel entry:', error.message);
  }
};



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


const navigate = useNavigate();
  
const handleButtonClick = () => {
  navigate('/inventory/inventorydata');
};



return (
  <ThemeProvider theme={theme}>
  <Box m="20px">
      
      <Formik
      
        
      >
        
        <form  >
        {pid && (
      <Header
        title={`SPARE PARTS DETAILS FOR ${pid}`}
        subtitle="Display details"
      />
    )}
    
    <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Product ID to view"
            id="pid"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Product ID"
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
    
    disabled

/>

</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
    fullWidth
    id="type"
    label="TYPE"
    variant="outlined"
    disabled
    value={type}
    

/>

<TextField
    fullWidth
    id="name"
    label="NAME"
    variant="outlined"
    disabled
    value={name}
    

/>

<TextField
    fullWidth
    id="brand"
    label="BRAND"
    variant="outlined"
    disabled
    value={brand}
    

    
/>
<TextField
    fullWidth
    id="reorder_level"
    label="REORDER LEVEL"
    disabled
    variant="outlined"
    value={reorder_level}
   

   
/>


</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
<TextField
    fullWidth
    id="qty"
    label="QUANTITY"
    variant="outlined"
    disabled
    value={qty}
    

/>
 
<TextField
    fullWidth
    id="unit_price"
    label="UNIT PRICE"
    disabled
    variant="outlined"
    value={unit_price}
    

    
/>

<TextField
    fullWidth
    id="size"
    label="SIZE"
    variant="outlined"
    disabled
    value={size}
  

/>


<TextField
    fullWidth
    id="voltage"
    label="VOLTAGE"
    variant="outlined"
    disabled
    value={voltage}
   

    
/>


</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">
<TextField
    fullWidth
    id="amp_hrs"
    label="AMP HOURS"
    variant="outlined"
    disabled
    value={amp_hrs}
    

    
    
/>
<TextField
    fullWidth
    id="man_date"
    label="MANUFACTURE DATE"
    disabled
    variant="outlined"
    value={man_date}
   
    
/>


<TextField
    fullWidth
    id="exp_date"
    label="EXPIRY DATE"
    disabled
    variant="outlined"
    value={exp_date}
  

    
/>




<TextField
    fullWidth
    id="vehicle_man_year"
    label="VEHICLE MANUFACTURE YEAR"
    disabled
    variant="outlined"
    value={vehicle_man_year}
  
   
  
/>

</Box>
<Box display="flex" justifyContent="end" mt="20px" gap="30px">

<TextField
    fullWidth
    id="vehicle_brand_and_model"
    label="VEHICLE BRAND & MODEL"
    disabled
    variant="outlined"
    value={vehicle_brand_and_model}
   
  
/>

</Box>

</Box>
<Box display="flex" justifyContent="end" mt="20px" >
<button
               className="buttonm"
               onClick={() => handleDelete(pid)}
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
               DELETE PRODUCT
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
               BACK TO SPARE PARTS
             </button>
          </Box>

         
          
        
        </form>
        </Formik>
        </Box>
        </ThemeProvider>
   
       
);

};

export default UniqueInventory;
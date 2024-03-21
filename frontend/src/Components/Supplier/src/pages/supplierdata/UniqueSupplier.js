import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { useParams} from "react-router-dom";
import { useTheme, ThemeProvider } from '@mui/material';

const UniqueSupplier = () => {
  const theme = useTheme();
  const location = useLocation();

  const { id } = useParams();
  console.log("Received ID:", id);

const [supplier_id, setSupplierId] = useState("");
const [supplier_name, setSupplierName] = useState("");
const [phone_number, setPhoneNumber] = useState("");
const [supplier_possition, setSupplierPosition] = useState("");
const [email, setEmail] = useState("");
const [company_name, setCompanyName] = useState("");
const [item_type, setItemType] = useState("");
const [item_size, setItemSize] = useState("");
const [item_code, setItemCode] = useState("");
const [brand, setBrand] = useState("");
const [quntity, setQuantity] = useState("");
const [unit_price, setUnitPrice] = useState("");
const [total_price, setTotalPrice] = useState("");
const [orderd_date, setOrderDate] = useState("");
const [manufatured_date, setManufacturedDate] = useState("");
const [invoice_number, setInvoiceNumber] = useState("");

const [searchQ, setSearchQ] = useState("");
const [supplier, setSupplier] = useState(null);
  
const handleDelete = async (supplier_id) => {
  try {
    await axios.delete(`http://localhost:8411/supplier/delete/${supplier_id}`);
    alert('Product deleted successfully.');
    
    window.location.href = "/supplier/supplierdata";
  } catch (error) {
    alert('Error deleting supplier entry:', error.message);
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
          setSupplier(response.data.supplier);

          const supplierData = response.data.supplier;

          // Convert and format the orderd_date
          const orderDate = new Date(supplierData.orderd_date);
          const formattedOrderDate = orderDate.toISOString().split('T')[0];

          // Convert and format the manufatured_date
          const manufacturedDate = new Date(supplierData.manufatured_date);
          const formattedManufacturedDate = manufacturedDate.toISOString().split('T')[0];

          setSupplierId(supplierData.supplier_id);
          setSupplierName(supplierData.supplier_name);
          setPhoneNumber(supplierData.phone_number);
          setSupplierPosition(supplierData.supplier_possition);
          setEmail(supplierData.email);
          setCompanyName(supplierData.company_name);
          setItemType(supplierData.item_type);
          setItemSize(supplierData.item_size);
          setItemCode(supplierData.item_code);
          setBrand(supplierData.brand);
          setQuantity(supplierData.quntity);
          setUnitPrice(supplierData.unit_price);
          setTotalPrice(supplierData.total_price);
          setOrderDate(formattedOrderDate);  // Set the formatted order date
          setManufacturedDate(formattedManufacturedDate);  // Set the formatted manufactured date
          setInvoiceNumber(supplierData.invoice_number);
        }
      }
    } catch (error) {
      alert("Error fetching supplier: " + error.message);
    }
  };

  fetchSupplierData();
}, [searchQ]);

useEffect(() => {
  const fetchSupplierData = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:8411/supplier/get/${id}`
        );

        if (response.data.supplier) {
          setSupplier(response.data.supplier);

          const supplierData = response.data.supplier;

          // Convert and format the orderd_date
          const orderDate = new Date(supplierData.orderd_date);
          const formattedOrderDate = orderDate.toISOString().split('T')[0];

          // Convert and format the manufatured_date
          const manufacturedDate = new Date(supplierData.manufatured_date);
          const formattedManufacturedDate = manufacturedDate.toISOString().split('T')[0];

          setSupplierId(supplierData.supplier_id);
          setSupplierName(supplierData.supplier_name);
          setPhoneNumber(supplierData.phone_number);
          setSupplierPosition(supplierData.supplier_possition);
          setEmail(supplierData.email);
          setCompanyName(supplierData.company_name);
          setItemType(supplierData.item_type);
          setItemSize(supplierData.item_size);
          setItemCode(supplierData.item_code);
          setBrand(supplierData.brand);
          setQuantity(supplierData.quntity);
          setUnitPrice(supplierData.unit_price);
          setTotalPrice(supplierData.total_price);
          setOrderDate(formattedOrderDate);  // Set the formatted order date
          setManufacturedDate(formattedManufacturedDate);  // Set the formatted manufactured date
          setInvoiceNumber(supplierData.invoice_number);
        }
      }
    } catch (error) {
      alert("Error fetching supplier: " + error.message);
    }
  };

  fetchSupplierData();
}, [id]);








const navigate = useNavigate();
  
const handleButtonClick = () => {
  navigate('/supplier/supplierdata');
};
  //await axios.delete(`http://localhost:8411/supplier/delete/${supplierId}`);
  // `http://localhost:8411/supplier/get/${searchQ}`

return (<ThemeProvider theme={theme}>
  <Box m="20px">
      
      <Formik>
        
        <form>
        {supplier_id && (
      <Header
        title={` SUPPLIER DETAILS FOR ${supplier_id}`}
        subtitle="Display details"
      />
    )}
    
    <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Supplier Id to View"
            id="supplier_id"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Supplier ID"
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
            disabled
            variant="outlined"
            value={supplier_id}
           
          />
          <TextField
            fullWidth
            id="supplier_name"
            label="Supplier Name"
            disabled
            variant="outlined"
            value={supplier_name}
            
          />
          <TextField
            fullWidth
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            disabled
            value={phone_number}
            
          />
          <TextField
    fullWidth
    id="supplier_possition"
    label="Supplier Position"
    variant="outlined"
    disabled
    value={supplier_possition}
   
  />
          </Box>
            
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
    fullWidth
    id="email"
    label="Email"
    variant="outlined"
    disabled
    value={email}
   
  />
  <TextField
    fullWidth
    id="company_name"
    label="Company Name"
    disabled
    variant="outlined"
    value={company_name}
    
  />
   <TextField
    fullWidth
    id="item_type"
    label="Item Name"
    disabled
    variant="outlined"
    value={item_type}
    
  />
        <TextField
    fullWidth
    id="item_size"
    label="Item Size"
    variant="outlined"
    disabled
    value={item_size}
   
  />  
          
          </Box>
          
          
<Box display="flex" justifyContent="end" mt="20px" gap="30px">


 
  
  <TextField
    fullWidth
    id="item_code"
    label="Item Code"
    variant="outlined"
    disabled
    value={item_code}
   
  />
  <TextField
    fullWidth
    id="brand"
    label="Brand"
    disabled
    variant="outlined"
    value={brand}
    
  />
  <TextField
    fullWidth
    id="quntity"
    label="Quantity"
    variant="outlined"
    disabled
    value={quntity}
    
  />
  <TextField
    fullWidth
    id="unit_price"
    label="Unit Price"
    variant="outlined"
    disabled
    value={unit_price}
  
  />
</Box>


<Box display="flex" justifyContent="end" mt="20px" gap="30px">

  <TextField
    fullWidth
    id="total_price"
    label="Total Price"
    disabled
    variant="outlined"
    type="number"
    value={total_price}
  />
  <TextField
    fullWidth
    id="orderd_date"
    label="Order Date"
    variant="outlined"
    disabled
    value={orderd_date}
   
  />
<TextField
    fullWidth
    id="manufatured_date"
    label="Manufactured Date"
    variant="outlined"
    disabled
    value={manufatured_date}
   
  />
  <TextField
    fullWidth
    id="invoice_number"
    label="Invoice Number"
    disabled
    variant="outlined"
    value={invoice_number}
    
  />

</Box>



</Box>
<Box display="flex" justifyContent="end" mt="20px" >
<button
               className="buttonm"
               onClick={() => handleDelete(supplier_id)}
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
               DELETE SUPPLIER
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

export default UniqueSupplier;
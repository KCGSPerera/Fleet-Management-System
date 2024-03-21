import React, { useState, useEffect,  useCallback} from "react";
import axios from "axios";



// Function to generate random letters
const generateRandomLetters = (length) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
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

// Function to validate item size
const validateItemSize = (input) => {
  const regex = /^\d+(\.\d+)?$/; // Regular expression for integers and floats
  if (!input) {
    return "Item Size is required";
  } else if (!regex.test(input)) {
    return "Item Size should be a valid number";
  }
  return null; // No errors
};

export default function AddSupplier() {

  const[supplier_id, setSupplier_ID] = useState ("");
  const[supplier_name, setSupplier_Name] = useState ("");
  //const[supplier_NIC, setSupplier_NIC] = useState ("");
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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // New state to track form submission
  const isSubmitDisabled = Object.values(errors).some((error) => error);

  const isDateTodayOrPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison
    return selectedDate <= today;
  };

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handlePhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    setPhone_Number(inputPhoneNumber);

    const isValidPhoneNumber = /^\d{10}$/.test(inputPhoneNumber);

    // Update errors based on phone number validity
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone_number: isValidPhoneNumber ? null : 'Phone Number should be exactly 10 numbers',
    }));
  };

  const handleItemSizeChange = (e) => {
    const input = e.target.value;
    setItem_Size(input);
    const error = validateItemSize(input);
    setErrors({ ...errors, item_size: error });
  };

 /* const handleItemTypeChange = (e) => {
    setItem_type(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      item_type: null, // Clear the error for item_type
    }));
  };*/


  const [brandOptions, setBrandOptions] = useState([]);
  // ... other state variables and functions

  /*const handleItemTypeChange = (e) => {
    const selectedItemType = e.target.value;
    setItem_type(selectedItemType);

    // Update brand options based on the selected item type
    if (selectedItemType === "Fuel") {
      setBrandOptions(["Ceypetco", "Synopec"]);
    } else if (selectedItemType === "Battery") {
      setBrandOptions(["Amaron", "Exide"]);
    } else if (selectedItemType === "Lubricants (oil)") {
      setBrandOptions(["Caltex", "Shell", " Valvoline ","Mobil" ]);
    }else {
      setBrandOptions([]); // Reset brand options for other item types
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      item_type: null, // Clear the error for item_type
    }));
  };*/

  const handleItemTypeChange = (e) => {
    const selectedItemType = e.target.value;
    setItem_type(selectedItemType);
  
    // Define a mapping of item types to brand options
    const brandOptionsMap = {
      Fuel: ["Ceypetco", "Synopec"],
      Battery: ["Amaron", "Exide", "Lucas", "Dagenite","Yokohama"],
      Lubricants: ["Mobil", "Valvoline", "Shell", "Caltex","Laugfs"],
      Tyres: ["Dunlop", "Michelin", "DSI", "Hankook",],
      Filters: ["Toyota", "Mitsubishi", "Sakura","TATA"],
      BrakePads: ["FBK", "Akebono","Power Stop ","StopTech" ], 
      // Add more mappings as needed
    };
  
    // Update brand options based on the selected item type
    setBrandOptions(brandOptionsMap[selectedItemType] || []);
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      item_type: null, // Clear the error for item_type
    }));
  };


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setItem_Code(inputValue);
    setErrors({ ...errors, item_code: null }); // Clear the error when input changes

    if (!inputValue) {
      setErrors({ ...errors, item_code: "Item Code is required" });
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(inputValue)) {
        setErrors({ ...errors, item_code: "Item Code should be 2 letters followed by 4 numbers" });
      }
    }
  };

  const handleBrandChange = (e) => {
    const brandValue = e.target.value;
    setBrand(brandValue);
    setErrors({ ...errors, brand: null }); // Clear the error when input changes

    if (!brandValue) {
      setErrors({ ...errors, brand: "Brand is required" });
    }
  };

  const handleQuantityChange = (e) => {
    const quantityValue = e.target.value;
    setQuntity(quantityValue);
  
    const error = !quantityValue ? "Quantity is required" : /^[0-9]+$/.test(quantityValue) ? null : "Quantity should contain only numbers";
    setErrors({ ...errors, quantity: error });
  
    calculateTotalPrice(quantityValue);
  };

  const handleUnitPriceChange = (e) => {
    const unitPriceValue = e.target.value;
    setUnit_Price(unitPriceValue);
  
    const error = !unitPriceValue ? "Unit Price is required" : /^\d+(\.\d{1,2})?$/.test(unitPriceValue) ? null : "Unit Price should be a valid float value";
    setErrors({ ...errors, unit_price: error });
  
    calculateTotalPrice(unitPriceValue);
  };

  const handleOrderDateChange = (e) => {
    const orderDateValue = e.target.value;
    setOrderd_date(orderDateValue);
    setErrors({ ...errors, orderd_date: null });

  if (!orderDateValue) {
    setErrors({ ...errors, orderd_date: "Order Date is required" });
  } else {
    const isValidOrderDate = isDateTodayOrPast(orderDateValue);
    if (!isValidOrderDate) {
      setErrors({
        ...errors,
        orderd_date: "Order Date should be today or a previous date",
      });
    }
  }
};

const handleManufacturedDateChange = (e) => {
  const manufacturedDateValue = e.target.value;
  setManufactured_Date(manufacturedDateValue);
  setErrors({ ...errors, manufatured_date: null });

  if (!manufacturedDateValue) {
    setErrors({
      ...errors,
      manufatured_date: "Manufactured Date is required",
    });
  } else {
    const isValidManufacturedDate = isDateTodayOrPast(manufacturedDateValue);
    if (!isValidManufacturedDate) {
      setErrors({
        ...errors,
        manufatured_date:
          "Manufactured Date should be today or a previous date",
      });
    }
  }
};

const handleInvoiceNumberChange = (e) => {
  const inputValue = e.target.value;
  setInvoice_Number(inputValue);
  setErrors({ ...errors, invoice_number: null });

  if (!inputValue) {
    setErrors({ ...errors, invoice_number: "Invoice Number is required" });
  } else {
    const regex = /^[A-Za-z]{2}[0-9]{5}$/;
    if (!regex.test(inputValue)) {
      setErrors({
        ...errors,
        invoice_number: "Invoice Number should have 2 letters followed by 5 numbers",
      });
    }
  }
};



  function validateForm() {
    const errors = {};

    const errorsCopy = { ...errors };

      if (!supplier_id) {
      errorsCopy.supplier_id = "Supplier ID is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(supplier_id)) {
        errorsCopy.supplier_id = "Supplier ID should be 2 letters followed by 4 numbers";
      } else {
        errorsCopy.supplier_id = null;
      }
    }

     if (!supplier_name) {
      errors.supplier_name = "Supplier Name is required";
    }

    /*if (!supplier_NIC) {
      errorsCopy.supplier_NIC = "Supplier NIC is required";
    } else if (supplier_NIC.length !== 12) {
      errorsCopy.supplier_NIC = "Supplier NIC should be exactly 12 characters";
    }*/

    if (!phone_number) {
      errors.phone_number = "Phone Number is required";
    } else {
      const regex = /^\d{10}$/;
      if (!regex.test(phone_number)) {
        errors.phone_number = "Phone Number should be exactly 10 numbers";
      }
    }

    if (!supplier_possition) {
      errors.supplier_possition = "Supplier Position is required";
    }

   if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!company_name) {
      errors.company_name = "Company Name is required";
    }

    if (!item_type) {
      errors.item_type = "Item Name is required";
    }

    if (!item_code) {
      errors.item_code = "Item Code is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(item_code)) {
        errors.item_code = "Item Code should be 2 letters followed by 4 numbers";
      }
    }

    if (!brand) {
      errors.brand = "Brand is required";
    }

    if (!quntity) {
      errors.quntity = "Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(quntity)) {
        errors.quntity = "Quantity should contain only numbers";
      }
    }

    if (!unit_price) {
      errors.unitPrice = "Unit Price is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/; 
      if (!regex.test(unit_price)) {
        errors.unit_price = "Unit Price should be a valid float value";
      }
    }

    if (!orderd_date) {
      errors.orderd_date = "Order Date is required";
    } else {
      const isValidOrderDate = isDateTodayOrPast(orderd_date);
  
      if (!isValidOrderDate) {
        errors.orderd_date = "Order Date should be today or a previous date";
      }
    }

    if (!manufatured_date) {
      errors.manufatured_date = "Manufactured Date is required";
    } else {
      const isValidManufacturedDate = isDateTodayOrPast(manufatured_date);
  
      if (!isValidManufacturedDate) {
        errors.manufatured_date = "Manufactured Date should be today or a previous date";
      }
    }

    if (!invoice_number) {
      errors.invoice_number = "Invoice Number is required";
    } else {
      const regex = /^[A-Za-z]{2}[0-9]{5}$/;
      if (!regex.test(invoice_number)) {
        errors.invoice_number = "Invoice Number should have 2 letters followed by 5 numbers";
      }
    }

   setErrors(errors);
    setErrors(errorsCopy);
    return Object.keys(errors).length === 0;
  }

  const calculateTotalPrice = useCallback(() => {
      const unitPriceValue = parseFloat(unit_price) || 0;
      const quantityValue = parseInt(quntity, 10) || 0;
      const totalPriceValue = unitPriceValue * quantityValue;
      setTotal_Price(totalPriceValue.toFixed(2));// Round to 2 decimal places
      
    }, [unit_price, quntity, setTotal_Price]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice])

  useEffect(() => {
    setSupplier_ID(generateSupplierID());
  }, []);

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Supplier added successfully");

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
        .post("http://localhost:8411/supplier/add", newSupplier)
        .then((response) => {
          setSuccessMessage("Supplier added successfully");
          setSubmitted(true);
          window.location.href = "/supplier";

    //reset the form         
          setSupplier_ID("");
          setSupplier_Name("");
          //setSupplier_NIC("");
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
        });
    }
  }

  return (
    <div className="container">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

{submitted && successMessage && (
        <div className="alert alert-success" role="alert">
          Supplier added successfully
        </div>
      )}

<form onSubmit={sentData}>
        {/* Add validation errors display */}
        

<div className="form-group">
  <label htmlFor="supplier_ID">Supplier ID</label>
  <input
    type="text"
    className={`form-control ${errors.supplier_id ? "is-invalid" : ""}`}
    id="supplier_ID"
    placeholder="Enter Supplier ID"
    value={supplier_id}
    onChange={(e) => {
      setSupplier_ID(generateSupplierID()); // Regenerate on change
      setErrors({ ...errors, supplier_id: null });
      validateForm();  // Call the correct validation function
    }}
  />
  {errors.supplier_id && (
    <div className="invalid-feedback">{errors.supplier_id}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="supplier_Name">Supplier Name</label>
  <input
    type="text"
    className={`form-control ${errors.supplier_name ? "is-invalid" : ""}`}
    id="supplier_Name"
    placeholder="Enter Supplier Name"
    value={supplier_name}
    onChange={(e) => {
      setSupplier_Name(e.target.value);
      setErrors({ ...errors, supplier_name: null });
    }}
  />
  {errors.supplier_name && (
    <div className="invalid-feedback">{errors.supplier_name}</div>
  )}
</div>

{/*<div className="form-group">
  <label htmlFor="supplier_NIC">Supplier NIC</label>
  <input
    type="text"
    className={`form-control ${errors.supplier_NIC ? "is-invalid" : ""}`}
    id="supplier_NIC"
    placeholder="Enter Supplier NIC"
    value={supplier_NIC}
    onChange={(e) => {
      const inputNIC = e.target.value;
      setSupplier_NIC(inputNIC);

      // Clear the specific error related to supplier_NIC when a valid input is provided
      if (inputNIC && inputNIC.length === 12) {
        const { supplier_NIC: _, ...restErrors } = errors;
        setErrors(restErrors);
      } else {
        validateForm();  // Call the correct validation function when the input changes
      }
    }}
  />
  {errors.supplier_NIC && (
    <div className="invalid-feedback">{errors.supplier_NIC}</div>
  )}
  </div>*/}

      <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="number"
          className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
          id="phone_number"
          placeholder="Enter Phone Number"
          value={phone_number}
          onChange={handlePhoneChange}
        />
        {errors.phone_number && (
          <div className="invalid-feedback">{errors.phone_number}</div>
        )}
      
    </div>
 


<div className="form-group">
  <label htmlFor="supplier_Possition">Supplier Position</label>
  <input
    type="text"
    className={`form-control ${errors.supplier_possition ? "is-invalid" : ""}`}
    id="supplier_Possition"
    placeholder="Enter Supplier Position"
    value={supplier_possition}
    onChange={(e) => {
      const inputSupplierPosition = e.target.value;
      setSupplier_Position(inputSupplierPosition);

      // Clear the specific error related to supplier_possition when a valid input is provided
      if (inputSupplierPosition) {
        const { supplier_possition: _, ...restErrors } = errors;
        setErrors(restErrors);
      }else {
        validateForm();  // Call the correct validation function when the input changes
      }
    }}
  />
  {errors.supplier_possition && (
    <div className="invalid-feedback">{errors.supplier_possition}</div>
  )}
</div>


<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    className={`form-control ${errors.email ? "is-invalid" : ""}`}
    id="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => {
      const inputEmail = e.target.value;
      setEmail(inputEmail);

      // Clear the specific error related to email when a valid input is provided
      if (isValidEmail(inputEmail)) {
        const { email: _, ...restErrors } = errors;
        setErrors(restErrors);
      }else {
        validateForm();  // Call the correct validation function when the input changes
      }
    }}
  />
  {errors.email && (
    <div className="invalid-feedback">{errors.email}</div>
  )}
</div>


<div className="form-group">
  <label htmlFor="company_name">Company Name</label>
  <input
    type="text"
    className={`form-control ${errors.company_name ? "is-invalid" : ""}`}
    id="company_name"
    placeholder="Enter Company Name"
    value={company_name}
    onChange={(e) => {
      setCompany_Name(e.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        company_name: null, // Clear the error for company_name
      }));
    }}
  />
  {errors.company_name && (
    <div className="invalid-feedback">{errors.company_name}</div>
  )}
</div>


{/*<div className="form-group">
  <label htmlFor="item_type">Item Name</label>
  <input
    type="text"
    className={`form-control ${errors.item_type ? "is-invalid" : ""}`}
    id="item_type"
    placeholder="Enter Item Name"
    value={item_type}
    onChange={(e) => {
      setItem_type(e.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        item_type: null, // Clear the error for item_type
      }));
    }}
  />
  {errors.item_type && (
    <div className="invalid-feedback">{errors.item_type}</div>
  )}
</div>*/}
<div>
      <div className="form-group">
        <label htmlFor="item_type">Item Name</label>
        <select
          className={`form-control ${errors.item_type ? 'is-invalid' : ''}`}
          id="item_type"
          value={item_type}
          onChange={handleItemTypeChange}
        >
          <option value="">Select Item Type</option>
          <option value="Lubricants">Lubricants (oil)</option>
          <option value="Tyres">Tyres</option>
          <option value="BrakePads">Brake Pads</option>
          <option value="Battery">Battery</option>
          <option value="Filters">Filters</option>
          <option value="Fuel">Fuel (Diesel & Petrol)</option>
        </select>
        {errors.item_type && (
          <div className="invalid-feedback">{errors.item_type}</div>
        )}
      </div>
    </div>

<div className="form-group">
          <label htmlFor="item_size">Item Size</label>
          <input
            type="text"
            className={`form-control ${errors.item_size ? "is-invalid" : ""}`}
            id="item_size"
            placeholder="Enter Item Size"
            value={item_size}
            onChange={handleItemSizeChange}
          />
          {errors.item_size && (
            <div className="invalid-feedback">{errors.item_size}</div>
          )}
        </div>

<div className="form-group">
      <label htmlFor="item_code">Item Code</label>
      <input
        type="text"
        className={`form-control ${errors.item_code ? "is-invalid" : ""}`}
        id="item_code"
        placeholder="Enter Item Code"
        value={item_code}
        onChange={handleInputChange}
      />
      {errors.item_code && (
        <div className="invalid-feedback">{errors.item_code}</div>
      )}
    </div>

   {/*<div className="form-group">
      <label htmlFor="brand">Brand</label>
      <input
        type="text"
        className={`form-control ${errors.brand ? "is-invalid" : ""}`}
        id="brand"
        placeholder="Enter Brand"
        value={brand}
        onChange={handleBrandChange}
      />
      {errors.brand && (
        <div className="invalid-feedback">{errors.brand}</div>
      )}
    </div>*/}

    
{/*<div className="form-group">
        <label htmlFor="brand">Brand</label>
        {item_type === "Fuel" || item_type === "Battery" || item_type === "Lubricants (oil)" ? (
          <select
            className={`form-control ${errors.brand  ? "is-invalid" : ""}`}
            id="brand"
            value={brand}
            onChange={handleBrandChange}
          >
            <option value="">Select Brand</option>
            {brandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className={`form-control ${errors.brand ? "is-invalid" : ""}`}
            id="brand"
            placeholder="Enter Brand"
            value={brand}
            onChange={handleBrandChange}
          />
        )}
        {errors.brand && (
          <div className="invalid-feedback">{errors.brand}</div>
        )}
        </div>*/}

<div className="form-group">
  <label htmlFor="brand">Brand</label>
  {brandOptions.length > 0 ? (
    <select
      className={`form-control ${errors.brand ? "is-invalid" : ""}`}
      id="brand"
      value={brand}
      onChange={handleBrandChange}
    >
      <option value="">Select Brand</option>
      {brandOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <input
      type="text"
      className={`form-control ${errors.brand ? "is-invalid" : ""}`}
      id="brand"
      placeholder="Enter Brand"
      value={brand}
      onChange={handleBrandChange}
    />
  )}
  {errors.brand && (
    <div className="invalid-feedback">{errors.brand}</div>
  )}
</div>

    <div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
          id="quantity"
          placeholder="Enter Quantity"
          value={quntity}
          onChange={handleQuantityChange}
        />
        {errors.quantity && (
          <div className="invalid-feedback">{errors.quantity}</div>
        )}
      </div>
    </div>

    <div>
      <div className="form-group">
        <label htmlFor="unit_price">Unit Price</label>
        <input
          type="text"
          className={`form-control ${errors.unit_price ? "is-invalid" : ""}`}
          id="unit_price"
          placeholder="Enter Unit Price"
          value={unit_price}
          onChange={handleUnitPriceChange}
        />
        {errors.unit_price && (
          <div className="invalid-feedback">{errors.unit_price}</div>
        )}
      </div>
    </div>

<div className="form-group">
  <label htmlFor="total_price">Total Price</label>
  <input
    type="text"
    className={`form-control ${errors.total_price ? "is-invalid" : ""}`}
    id="total_price"
    placeholder="Total Price"
    value={total_price}
    readOnly
  />
  {errors.total_price && (
    <div className="invalid-feedback">{errors.total_price}</div>
  )}
</div>

 <div>
      <div className="form-group">
        <label htmlFor="orderd_date">Order Date</label>
        <input
          type="date"
          className={`form-control ${errors.orderd_date ? "is-invalid" : ""}`}
          id="orderd_date"
          placeholder="Enter Order Date"
          value={orderd_date}
          onChange={handleOrderDateChange}
        />
        {errors.orderd_date && (
          <div className="invalid-feedback">{errors.orderd_date}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="manufatured_date">Manufactured Date</label>
        <input
          type="date"
          className={`form-control ${
            errors.manufatured_date ? "is-invalid" : ""
          }`}
          id="manufatured_date"
          placeholder="Enter Manufactured Date"
          value={manufatured_date}
          onChange={handleManufacturedDateChange}
        />
        {errors.manufatured_date && (
          <div className="invalid-feedback">{errors.manufatured_date}</div>
        )}
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="invoice_number">Invoice Number</label>
      <input
        type="text"
        className={`form-control ${errors.invoice_number ? "is-invalid" : ""}`}
        id="invoice_number"
        placeholder="Enter Invoice Number"
        value={invoice_number}
        onChange={handleInvoiceNumberChange}
      />
      {errors.invoice_number && (
        <div className="invalid-feedback">{errors.invoice_number}</div>
      )}
    </div>
        <button type="submit" className="btn btn-primary"  disabled={isSubmitDisabled} >
          Submit
        </button>
      </form>
    </div>
  );
}

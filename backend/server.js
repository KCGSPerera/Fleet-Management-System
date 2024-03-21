const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8411;   

/* app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.get("/", cors() , (req,res) => {

})
 
app.post("/", async(req,res) => {
    const {email , password} = req.body
    try {
            const check = await collection.findOne({email:email})

            if(check){
                res.json("exit")
            }else{
                res.json("notexit")
            }
    }
    catch{
        res.json("notexit")
    }
}) */


app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false, 
});



const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Your MongoDB connection is success!!!!!");
})

const fuelentry = require("./routes/fuelentry.js")
const fuelstock = require("./routes/fuelstock.js")
const inventoryRouter = require("./routes/inventory.js");
const rent = require("./routes/rent.js");
const supplier = require("./routes/supplier.js")
const trip = require("./routes/trip.js");
const corrective_m = require("./routes/maintenance.js");

const vehicle = require("./routes/vehicle.js");

const employee = require("./routes/employees.js");
const fuelConsumptionRoutes = require('./routes/fuelConsumption.js');


app.use("/fuelentry", fuelentry);
app.use("/fuelstock", fuelstock);
app.use("/supplier", supplier);
app.use("/rent", rent);
app.use("/inventory", inventoryRouter);
app.use("/trip", trip);
app.use("/corrective",corrective_m);

app.use("/vehicle",vehicle);

app.use("/employee",employee);


app.use('/fuelconsumption', fuelConsumptionRoutes);

app.listen(PORT, () =>{
    console.log(`Server is up and running on port number is: ${PORT}`)
})


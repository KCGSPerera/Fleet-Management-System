// manager.js
const router = require("express").Router();
const Manager = require("../models/vehicle/vehicle");

// Route to add a new vehicle
router.route("/add").post((req, res) => {
  // Extract vehicle data from request body
  const {
    vehicleid,
    vehicletype,
    fueltype,
    manufactureyear,
    mileage,
    transactiontype,
    vehiclestatus,
    licenseplate,
    location,
    vehiclecolor,
  } = req.body;

  // Create a new Manager instance with the extracted data
  const newManager = new Manager({
    vehicleid,
    vehicletype,
    fueltype,
    manufactureyear,
    mileage,
    transactiontype,
    vehiclestatus,
    licenseplate,
    location,
    vehiclecolor,
  });

  // Save the new vehicle record to the database
  newManager
    .save()
    .then(() => {
      res.json("Vehicle Added");
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Error adding vehicle" });
    });
});

// Route to fetch all vehicles
router.route("/").get((req, res) => {
  Manager.find()
    .then((managers) => {
      res.status(200).json(managers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching vehicles" });
    });
});

// Route to update a vehicle by ID
// Route to update a vehicle by ID
router.route("/update/:id").put(async (req, res) => {
  const vehicleId = req.params.id;
  const {
    vehicleid,
    vehicletype,
    fueltype,
    manufactureyear,
    mileage,
    transactiontype,
    vehiclestatus,
    licenseplate,
    location,
    vehiclecolor,
  } = req.body;

  const updateManager = {
    vehicleid,
    vehicletype,
    fueltype,
    manufactureyear,
    mileage,
    transactiontype,
    vehiclestatus,
    licenseplate,
    location,
    vehiclecolor,
  };

  try {
    // Find and update the vehicle by ID
    await Manager.findOneAndUpdate({ vehicleid: vehicleId }, updateManager);
    res.status(200).json({ status: "Vehicle updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error with updating data",
      error: err.message,
    });
  }
});


// Route to delete a vehicle by ID
router.route("/delete/:id").delete(async (req, res) => {
  const vehicleId = req.params.id;

  try {
    // Find and delete the vehicle by ID
    await Manager.findOneAndDelete(vehicleId);
    res.status(200).json({ status: "Vehicle deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "Error with delete vehicle",
      error: err.message,
    });
  }
});

// Route to get a single vehicle by ID
router.route("/get/:id").get(async (req, res) => {
  let vehicleId = req.params.id;
  const user = await Manager.findOne({vehicleid:vehicleId})
  .then((manager) =>{
    res.status(200).send({status: "Manager Fetched",manager});
  })
  .catch((err) =>{
    console.log(err.message);
    res.status(500).send({status:"Error with getting vehicle",error:err.message})
  });
});


module.exports = router;

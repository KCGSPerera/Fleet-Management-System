const express = require('express');
const router = express.Router();
const FuelConsumption = require('../models/fuel/fuelConsumtion');

// Route to add fuel consumption data

router.route("/add").post((req, res) => {
  const vehicle_id = req.body.vehicle_id;
  const fuel_type = req.body.fuel_type;
  const fuel_quantity = new Number(req.body.fuel_quantity);
  const estimatedConsumption =  new Number(req.body.estimatedConsumption);
  const actualConsumption = new Number(req.body.actualConsumption);
  const difference = ((actualConsumption - estimatedConsumption) / estimatedConsumption) * 100;
  const status = Math.abs(difference) > 10 ? 'Need to Repair' : 'Normal';

    

    const newFuelConsumption = new FuelConsumption({
        
        vehicle_id,
        fuel_type,
        fuel_quantity,
        estimatedConsumption,
        actualConsumption,
        difference: difference.toFixed(2), // Use the calculated difference
        status // Use the calculated status
    })

  newFuelConsumption.save().then(() => {
      res.json("New Fuelconsumption details are successfully added ")
  }).catch ((err) => {
    console.log(err)
  })
})

router.route("/").get((req, res) => {
  FuelConsumption.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/delete/:vehicle_id").delete((req, res) => {
  FuelConsumption.findOneAndDelete({ vehicle_id: req.params.vehicle_id })
    .then(() => res.json('Fuel consumption data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//UNIQUE FUEL DATA
router.route("/get/:vehicle_id").get(async(req,res) =>{
  let entryId = req.params.id;

  const update = await Fuelentry.findOne({vehicle_id : entryId}) 
  .then((fuelconsumptionentry) =>{
      res.status(200).send({status :"Fuel Data Successfully Fetched!!!!!!", fuelconsumptionentry});
  }).catch((err) => {
      console.log(err);
      res.status(500).send({status: "Not Fetched. Error in the fuel data Fetched!!!!", error: err.message});
  })
})



module.exports = router;
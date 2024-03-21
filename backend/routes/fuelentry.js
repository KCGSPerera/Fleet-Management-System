const router = require("express").Router();
let Fuelentry = require("../models/fuel/fuelentry");

//ALL FUEL ENTRY CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/fuel/add*/

router.route("/add").post((req, res) => {
    
    const vehicle_id = req.body.vehicle_id;
    const fuel_date = new Date(req.body.fuel_date);
    const fuel_type = req.body.fuel_type;
    const fuel_quantity = req.body.fuel_quantity;
    const fuel_cost = new Number(req.body.fuel_cost);
    const vehicle_milage = new Number(req.body.vehicle_milage);
    

    const newFuelentry = new Fuelentry({
        
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
    })

    newFuelentry.save().then(() => {
        res.json("New Fuel details are successfully added ")
    }).catch((err) => {
        console.log(err)
    })
   
})

//READ PART
/*http://Localhost:8411/fuel*/

router.route("/").get((req,res) => {
    
    Fuelentry.find().then((fuelentries) => {
        res.json(fuelentries)
    }).catch((err) => {
        console.log(err)
    })
})


//UPDATE PART
/*http://Localhost:8411/fuel/update/id*/ 
router.route("/update/:id").put(async(req, res) => {
    let entryId = req.params.id;
    const { 
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
        } = req.body;
    
        const updateFuelentry = {
            vehicle_id,
            fuel_date,
            fuel_type,
            fuel_quantity,
            fuel_cost,
            vehicle_milage
        }

        const update = await Fuelentry.findOneAndUpdate({vehicle_id : entryId}, updateFuelentry)
        .then(() => {
            res.status(200).send({status: "Fuel Data updated successfully!!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
    })       
})

//DELETE PART
/*http://Localhost:8411/fuel/delete/id*/ 
router.route("/delete/:id").delete(async(req,res) =>{
    let entryId = req.params.id;

    await Fuelentry.findOneAndDelete({vehicle_id : entryId})
    .then(() =>{
        res.status(200).send({status :"Fuel Data Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })
})

//UNIQUE FUEL DATA
router.route("/get/:id").get(async(req,res) =>{
    let entryId = req.params.id;

    const update = await Fuelentry.findOne({vehicle_id : entryId}) 
    .then((fuelentry) =>{
        res.status(200).send({status :"Fuel Data Successfully Fetched!!!!!!", fuelentry});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the fuel data Fetched!!!!", error: err.message});
    })
})

module.exports = router;
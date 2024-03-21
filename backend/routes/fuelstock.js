const router = require("express").Router();
let Fuelstock = require("../models/fuel/fuelstock")

//ALL SUPPLIER CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/fuel/add*/

 router.route("/add").post((req, res) => {
 //app.post("fuel/add", (req,res) => {
    
        const invoice_no = req.body.invoice_no;
        const stocked_fuel_type = req.body.stocked_fuel_type;
        const stocked_fuel_quantity = new Number(req.body.stocked_fuel_quantity);
        const per_leter_cost = new Number(req.body.per_leter_cost);
        const total_cost = new Number(req.body.total_cost);
        const stocked_fuel_date = new Date(req.body.stocked_fuel_date);

    const newFuelstock = new Fuelstock({
        
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date

    })

    newFuelstock.save().then(() => {
        //res.json("Fuel Stock details are successfully added ",newFuelstock)
        res.status(200).json({message : "Fuel stock details are successfully added "});
    }).catch((err) => {
        console.log(err)
    })
})

//READ PART
/*http://Localhost:8411/fuel*/

router.route("/").get((req,res) => {
    
    Fuelstock.find().then((fuelstocks) => {
        res.json(fuelstocks)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    })
})

//UPDATE PART
/*http://Localhost:8411/fuel/update/id*/ 
router.route("/update/:id").put(async(req, res) => {
    let stockId = req.params.id;
    const { 
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
        } = req.body;
    
        const updateFuelstock = {
            invoice_no,
            stocked_fuel_type,
            stocked_fuel_quantity,
            per_leter_cost,
            total_cost,
            stocked_fuel_date
        }

        //const update = await Supplier.findByIdAndUpdate(userId, updateSupplier)
        const update = await Fuelstock.findOneAndUpdate({invoice_no : stockId}, updateFuelstock)
        .then(() => {
            res.status(200).send({status: "Fuel stock updated successfully!!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
    })       
})

//DELETE PART
/*http://Localhost:8411/fuel/delete/id*/ 
router.route("/delete/:id").delete(async(req,res) =>{
    let stockId = req.params.id;

    await Fuelstock.findOneAndDelete({invoice_no : stockId})
    .then(() =>{
        res.status(200).send({status :"Fuel Stock Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })
})

//UNIQUE FUEL STOCK DATA

router.route("/get/:id").get(async(req,res) =>{
    let stockId = req.params.id;

    const update = await Fuelstock.findOne({invoice_no : stockId})
    //const fuelstock = await Fuelstock.findById(stockId) 
    .then((fuelstock) =>{
        res.status(200).send({status :"Fuel Stock Data Successfully Fetched!!!!!!", fuelstock});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the supplier data Fetched!!!!", error: err.message});
    })
})

module.exports = router;
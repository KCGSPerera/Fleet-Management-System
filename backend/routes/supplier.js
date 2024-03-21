const router = require("express").Router();
let Supplier = require("../models/supplier/supplier")

//ALL SUPPLIER CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/supplier/add*/

 router.route("/add").post((req, res) => {
 //app.post("supplier/add", (req,res) => {
    
    const supplier_id = req.body.supplier_id;
    const supplier_name = req.body.supplier_name;
    const phone_number = req.body.phone_number;
    const supplier_possition = req.body.supplier_possition;
    const email = req.body.email;
    const company_name = req.body.company_name;
    const item_type = req.body.item_type;
    const item_size = Number(req.body.item_size);
    const item_code = req.body.item_code;
    const brand = req.body.brand;
    const quntity = Number(req.body.quntity);
    const unit_price = Number(req.body.unit_price);
    const total_price = Number(req.body.total_price);
    const orderd_date = new Date(req.body.orderd_date);
    const manufatured_date = new Date(req.body.manufatured_date);
    const invoice_number = req.body.invoice_number;

    const newSupplier = new Supplier({
        
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

    })

    newSupplier.save().then(() => {
        //res.json("Supplier details are successfully added ",newSupplier)
        res.status(200).json({message : "Supplier details are successfully added "});
    }).catch((err) => {
        console.log(err)
    })
})

//READ PART
/*http://Localhost:8411/spplier*/

router.route("/").get((req,res) => {
    
    Supplier.find().then((suppliers) => {
        res.json(suppliers)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    })
})

//UPDATE PART
/*http://Localhost:8411/supplier/update/id*/ 
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const { 
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
        invoice_number,
        } = req.body;
    
        const updateSupplier = {
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
        }

        //const update = await Supplier.findByIdAndUpdate(userId, updateSupplier)
        const update = await Supplier.findOneAndUpdate({supplier_id : userId}, updateSupplier)
        .then(() => {
            res.status(200).send({status: "Supplier updated successfully!!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
    })       
})

//DELETE PART
/*http://Localhost:8411/supplier/delete/id*/ 
router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Supplier.findOneAndDelete({supplier_id : userId})
    .then(() =>{
        res.status(200).send({status :"Supplier Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })
})

//UNIQUE SUPPLIER DATA

router.route("/get/:id").get(async(req,res) =>{
    let userId = req.params.id;

    const update = await Supplier.findOne({supplier_id : userId})
    //const supplier = await Supplier.findById(userId) 
    .then((supplier) =>{
        res.status(200).send({status :"Supplier Data Successfully Fetched!!!!!!", supplier});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the supplier data Fetched!!!!", error: err.message});
    })
})

module.exports = router;
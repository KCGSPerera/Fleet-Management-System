const router = require("express").Router();
let correctiveMaintence = require("../models/maintenance/maintenance");

//add date to database
router.route("/add").post((req,res)=>{

    const jobID = req.body.jobID;
    const DID = req.body.DID;
    const Dname = req.body.Dname;
    const vehicleNo = req.body.vehicleNo;
    const Date_report = Date(req.body.Date_report);
    const priority = req.body.priority;
    const description = req.body.description;
    const parts_used = req.body.parts_used;
    const Date_complete = Date(req.body.Date_complete);
    

    const newcorrectiveMaintence = new correctiveMaintence({
    
        jobID,
        DID,
        Dname,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete
    })

    newcorrectiveMaintence.save().then(()=>{
        res.json("New Corrective Maintence Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//get data from database
router.route("/display").get((req,res)=>{

    correctiveMaintence.find().then((correctiveMaintences)=>{
        res.json(correctiveMaintences)
    }).catch((err)=>{
        console.log(err)
    })
})


// Update data in the database
router.route("/update/:id").put(async (req, res) => {
    let jId = req.params.id;
    const { jobID,DID,Dname,vehicleNo,Date_report,priority, description, parts_used,Date_complete,latitude,longitude } = req.body;
  
    const updatecorrectiveMaintence = {
        jobID,
        DID,
        Dname,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete,
        latitude,
        longitude
    }

    const update = await correctiveMaintence.findOneAndUpdate({jobID : jId}, updatecorrectiveMaintence)
    .then(()=>{
        res.status(200).send({status: "Job Updated Sucess!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Not Updated. Error in Update", error: err.message});
    })
  });
  

//delete Job
router.route("/delete/:id").delete(async(req,res)=>{
    let jId = req.params.id;

    await correctiveMaintence.findOneAndDelete({jobID : jId})
    .then(()=>{
        res.status(200).send({status:"Job deleted"});
    }).catch((err)=>{
        console.log(ree.message);
        res.status(500).send({status : "Error with delete job"})
    })
})

//Finding Unique job
router.route("/get/:id").get(async(req,res) =>{
    let jId = req.params.id;

    const update = await correctiveMaintence.findOne({jobID : jId})
    
    .then((correctiveMaintence) =>{
        res.status(200).send({status :"Job Data Successfully Fetched!!!!!!", correctiveMaintence});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the job data Fetched!!!!", error: err.message});
    })
})

router.route("/checkJobID/:id").get(async (req, res) => {
    const jobID = req.params.id;
  
    const jobExists = await correctiveMaintence.findOne({ jobID });
    res.json({ isInUse: !!jobExists });
  });
  


module.exports = router;


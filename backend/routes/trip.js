const router = require("express").Router();
let trip = require("../models/trip/trip");

router.route("/add").post((req,res)=>{

    const tripid = Number(req.body.tripid);
    const tripname = req.body.tripname;
    const tripduration = Number(req.body.tripduration);
    const tripdistance = Number(req.body.tripdistance);
    const vehicleno = Number(req.body.vehicleno);
    const driverid = req.body.driverid;
    const startpoint = req.body.startpoint;
    const destination = req.body.destination;
    const tripgoods = req.body.tripgoods;
    const arrivaltime = Date(req.body.arrivaltime);
    const departuretime = Date(req.body.departuretime);
    const startfuel = Number(req.body.startfuel);
    const endfuel = Number(req.body.endfuel);

    const newtrip = new trip({

        tripid,
        tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime,
        startfuel,
        endfuel

    })

    newtrip.save().then(()=>{

        res.json("Trip Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

        trip.find().then((trip)=>{

            res.json(trip)

        }).catch((err)=>{
            console.log(err)
        })

})

router.route("/update/:id").put(async(req,res)=>{

    let tripId = req.params.id;
    const {tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime,
        startfuel,
        endfuel} = req.body; 

    const updateTrip = {
        tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime,
        startfuel,
        endfuel
    }

    const update = await trip.findOneAndUpdate({tripid : tripId}, updateTrip).then(()=>{

        res.status(200).send({status:"Trip Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{

    let tripId =  req.params.id;

    await trip.findOneAndDelete({tripid : tripId}).then(()=>{
        res.status(200).send({status:"Trip Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let tripId = req.params.id;
    const user = await trip.findOne({tripid : tripId}).then((trip)=>{
        res.status(200).send({status:"Trip Fetched",trip})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message})
    })
})

module.exports = router;
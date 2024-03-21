const router = require("express").Router();
let Rent = require("../models/rent/rent");

// Create
router.route("/add").post((req, res) => {
    const vehicle_no = req.body.vehicle_no;
    const brand = req.body.brand;
    const vehicle_model = req.body.vehicle_model;
    const milage = Number(req.body.milage);
    const capacity = req.body.capacity;
    const description = req.body.description;
    const receive_date = new Date(req.body.receive_date);
    const return_date = new Date(req.body.return_date);
    const owner_name = req.body.owner_name;
    const owner_phone = Number(req.body.owner_phone);
    const owner_email = req.body.owner_email;
    const rental = Number(req.body.rental);
    const total_rental = Number(req.body.total_rental); // Add total_rental here

    const newRent = new Rent({
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental,
        total_rental, // Add total_rental here
    });

    newRent.save()
        .then(() => {
            res.json("Rent Vehicle Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

// Read
router.route("/").get((req, res) => {
    Rent.find()
        .then((rent) => {
            res.json(rent);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update
router.route("/update/:id").put(async (req, res) => {
    let userID = req.params.id;

    const {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental,
        total_rental, // Add total_rental here
    } = req.body;

    const updateRent = {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental,
        total_rental, // Add total_rental here
    }

    try {
        const updatedRent = await Rent.findOneAndUpdate({ vehicle_no: userID }, updateRent);
        if (!updatedRent) {
            return res.status(404).send({ status: "Rent Data Not Found" });
        }
        res.status(200).send({ status: "Rent updated successfully!!!!!!!", updatedRent });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Not updated. Error in the Update!!!!", error: err.message });
    }
});

// Delete
router.route("/delete/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await Rent.findOneAndDelete({ vehicle_no: userID })
        .then(() => {
            res.status(200).send({ status: "Rent Deleted Successfully!!!!!!" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Not deleted. Error in the delete!!!!", error: err.message });
        });
});

// Get by ID
router.route('/get/:id').get(async (req, res) => {
    try {
        const userId = req.params.id;
        const rent = await Rent.findOne({ vehicle_no: userId });

        if (!rent) {
            return res.status(404).send({ status: 'Rent Data Not Found' });
        }

        res.status(200).send({ status: 'Rent Data Successfully Fetched!!!!!!', rent });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'Error in Fetching Rent Data', error: err.message });
    }
});

router.route("/check-vehicle-no/:vehicle_no").get(async (req, res) => {
    const { vehicle_no } = req.params;
  
    try {
      const existingRent = await Rent.findOne({ vehicle_no });
      if (existingRent) {
        res.json({ isUnique: false });
      } else {
        res.json({ isUnique: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;

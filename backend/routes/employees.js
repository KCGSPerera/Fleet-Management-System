const router = require("express").Router();
let employee = require("../models/employee/employee");

router.route("/add").post((req, res) => {
  const eid = req.body.eid;
  const ename = req.body.ename;
  const gender = req.body.gender;
  const address = req.body.address;
  const phone = Number(req.body.phone);
  const email = req.body.email;
  const dob = req.body.dob;
  const jobroll = req.body.jobroll;
  const dlicense = req.body.dlicense;
  const bsal = Number(req.body.bsal);

  const newEmployee = new employee({
    eid,
    ename,
    gender,
    address,
    phone,
    email,
    dob,
    jobroll,
    dlicense,
    bsal,
  });

  newEmployee
    .save()
    .then(() => {
      res.json("Successfully Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let Eid = req.params.id;
  const {
    eid,
    ename,
    gender,
    address,
    phone,
    email,
    dob,
    jobroll,
    dlicense,
    bsal,
  } = req.body;
  const updateEmployee = {
    eid,
    ename,
    gender,
    address,
    phone,
    email,
    dob,
    jobroll,
    dlicense,
    bsal,
  };

  const update = await employee.findOneAndUpdate({eid : Eid}, updateEmployee)
    .then(() => {
      res.status(200).send({ status: "Employee Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let Eid = req.params.id;

  await employee.findOneAndDelete(Eid)
    .then(() => {
      res.status(200).send({ status: "Employee Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with deleting user", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let Eid = req.params.id;
  const user = await employee.findOne({eid : Eid})
    .then((employee) => {
      res.status(200).send({ status: "Employee Fetched", employee });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting user", error: err.message });
    });
});

router.route("/check-emp-id/:eid").get(async (req, res) => {
  const { eid } = req.params;

  try {
    const existingRent = await Rent.findOne({ eid });
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

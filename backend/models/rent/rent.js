const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema({

    vehicle_no : {
        type : String,
        unique: true,
        required: true
    },
    brand : {
        type : String,
        required: true
    },
    vehicle_model : {
        type :String,
        required :true
    },
    milage : {
        type: Number,
        required: true
    },
    capacity : {
        type: String,
        required: false
    },
    description : {
        type: String,
        required: true
    },
    receive_date : {
        type: Date,
        required: false
    },
    return_date: {
        type: Date,
        required: false
    },
    owner_name : {
        type: String,
        required: true
    },
    owner_phone : {
        type: Number,
        required: true
    },
    owner_email : {
        type: String,
        required: true
    },
    rental : {
        type : Number,
        required : false
    },
    total_rental: {
        type: Number,
        required: false, // Change this to true if it's required
    },

})

const RentVehicle = mongoose.model("RentVehicle",rentSchema);

module.exports = RentVehicle;
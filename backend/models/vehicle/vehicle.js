const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    vehicleid: {
        type: String,
        unique:true,
        required: true
    },
    vehicletype: {
        type: String,
        required: true
    },
    fueltype: {
        type: String,
        required: true
    },
    manufactureyear: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    transactiontype: {
        type: String,
        required: true
    },
    vehiclestatus: {
        type: String,
        required: true
    },
    licenseplate: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    vehiclecolor: {
        type: String,
        required: true
    }
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tripSchema = new Schema({
    
    tripid : {
        type: Number,
        required: true
    },

    tripname : {
        type: String,
        required: true
    },

    tripduration :{
        type: Number,
        required: true
    },

    tripdistance: {
        type: Number,
        required: true
    },

    vehicleno: {
        type: Number,
        required: true
    },

    driverid: {
        type: String,
        required: true
    },

    startpoint: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    tripgoods: {
        type: String,
        required: true
    },

    arrivaltime: {
        type: Date,
        required: true
    },

    departuretime: {
        type: Date,
        required: true
    },

    startfuel:{
        type: Number,
        required: true
    },

    endfuel:{
        type: Number,
        required: true
    }

})

const trip = mongoose.model("trip", tripSchema)

module.exports = trip;
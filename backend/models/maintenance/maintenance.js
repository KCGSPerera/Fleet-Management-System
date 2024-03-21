const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const correctiveSchema = new Schema({
    jobID: {
        type : String,
        required : true 
    },
    DID : {
        type : String,
        required : true 
    },
    Dname : {
        type : String,
        required : false 
    },
    vehicleNo : {
        type : String,
        required : true
    },

    Date_report : {
        type :Date,
        required : true
    },

    priority : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    parts_used : {
        type : String,
        required : false
    },

    Date_complete :{
        type : Date,
        required : false
    }

})

const correctiveMaintence = mongoose.model("correctiveMaintence",correctiveSchema);

module.exports = correctiveMaintence;
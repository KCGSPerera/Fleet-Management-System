const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fuelentrySchema = new Schema({
    
    vehicle_id : {
        type : String,
        required : true
    },

    fuel_date : {
        type : Date,
        required : true
    },

    fuel_type : {
        type : String,
        required : true
    },

    fuel_quantity : {
        type : Number,
        required : true
    },

    fuel_cost : {
        type : Number,
        required : true
    },

    vehicle_milage : {
        type : Number,
        required : true
    }
})

const Fuelentry = mongoose.model("Fuelentry", fuelentrySchema);

module.exports = Fuelentry;
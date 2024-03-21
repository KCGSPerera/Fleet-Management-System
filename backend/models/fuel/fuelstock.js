const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fuelstockSchema = new Schema({
    
    invoice_no : {
        type : String,
        required : true
    },
    
    stocked_fuel_type : {
        type : String,
        required : true
    },

    stocked_fuel_quantity : {
        type : Number,
        required : true
    },

    per_leter_cost : {
        type : Number,
        required : true
    },

    total_cost : {
        type : Number,
        required : true
    },

    stocked_fuel_date : {
        type : Date,
        required : true
    }
})

const Fuelstock = mongoose.model("Fuelstock", fuelstockSchema);

module.exports = Fuelstock;
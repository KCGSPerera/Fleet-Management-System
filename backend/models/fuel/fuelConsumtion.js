const mongoose = require('mongoose');

const fuelConsumptionSchema = new mongoose.Schema({
  vehicle_id: {
    type: String,
    required: true
  },
  fuel_type: {
    type: String,
    required: true
  },
  fuel_quantity: {
    type: Number,
    required: true
  },
  estimatedConsumption: {
    type: Number,
    required: true
  },
  actualConsumption: {
    type: Number,
    required: true
  },
  difference: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FuelConsumption', fuelConsumptionSchema);

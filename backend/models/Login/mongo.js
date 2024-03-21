//login part
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newSchema = new Schema({
    email:{
      type:String,
      required: true
    },
    password:{
      type:String,
      required:true,
    }
  })
  
  const collection = mongoose.model("collection", newSchema)

  module.exports = collection
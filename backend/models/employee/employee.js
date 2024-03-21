const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

   eid: {
       type: String,
       required: true 
   },

   ename:{
       type: String,
       required: true
   },

   gender:{
       type: String,
       required: true
   },

   address:{
       type: String,
       required: true
   },

   phone:{
       type: Number,
       required: true
   },

   dob:{
       type: Date,
       required: true
   },

   email:{
       type: String,
       required: true
   },

   jobroll:{
       type: String,
       required: true
   },

   dlicense:{
    type: String,
    required: false
},

   bsal:{
       type: Number,
       required: true
   }

})

const employee = mongoose.model("employee",employeeSchema);

module.exports = employee;
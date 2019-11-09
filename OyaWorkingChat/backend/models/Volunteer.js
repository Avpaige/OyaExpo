const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const VolunteerSchema = new Schema({
  mysqlID: {
    type: String, 
    required: true,
    unique: true
  },{
   french: {
    type: Boolean,
    required: true,
    Default: false
  },
  spanish: {
    type: Boolean,
    required: true,
    Default: false
  },
  english: {
    type: Boolean,
    required: true,
    Default: false
 },
  chinese: {
    type: Boolean,
    required: true,
   Default: false
  },
  avail: {
    type: String,
    required: true,
   Default: inactive
  }
,
  verified: {
  required: true,
    Default: false
  }
})
 
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
 
module.exports = Volunteer;
 


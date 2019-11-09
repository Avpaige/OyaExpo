const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
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
})
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;
 


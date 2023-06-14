const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const userSchema = new Schema({  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index:{
      unique: true 
    }
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('user', userSchema, 'users'); //collection name is users
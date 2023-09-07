const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  firstName:{type: String, required: true},
  lastName: {type: String, required: true},
  email:{type: String, required: true},
  phoneNumber:{type: String, required: true},
  designation: {type: String, required: true},
  hobbies:{type: String, required: true},
  address:{type: String, required: true},
  gender:{type: String, required: true},
  confirmPassword: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;

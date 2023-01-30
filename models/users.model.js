const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  name: String,
  deleted_at: {
    type: Date,
    default: null
  }
  
});

module.exports = model('Users', UserSchema);
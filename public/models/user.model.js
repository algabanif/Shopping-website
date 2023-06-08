const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ids = require('short-id');

const User = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default:false
  },
});
module.exports = mongoose.model('Users', User);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ids = require('short-id');

const Product = new Schema({
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: String,
  },
  status: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  image:{
    type:String,
  }
});
module.exports = mongoose.model('Product', Product);

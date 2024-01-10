const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  zip: {
    type: String,
    required: [true, "zip is required"],
  },

  country: {
    type: String,
    required: [true, "country is required"],
  },
});



const Order = mongoose.model('Order' , orderSchema)

module.exports = Order
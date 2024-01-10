const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "provide a valid title"]
  },
  description: {
    type: String,
    required: [true, 'provide a valid description']
  },
  price: {
    type: Number,
    required: [true, 'provide the price for the product']
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: [true, 'provide the brand name']
  },
  latest : {
    type : Boolean , 
    default : false
  },
  category: {
    type: String,
    enum : ["fragrances","skincare", "groceries", "home-decoration", "smartphones", "laptops"],
    required: [true, 'choose the spicific category']
  },
  thumbnail: {
    type: String,
    required: [true, 'provide the required thumbnail']
  },
  images: {
    type: [String],
    required: [true, 'provide the required images']
  },
});

const Product = mongoose.model('Product' , productSchema);

module.exports = Product
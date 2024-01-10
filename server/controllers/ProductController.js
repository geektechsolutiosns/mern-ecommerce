const Product = require("../models/ProductSchema");
const upload = require("../utils/Multer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//-------------------------for users and admins ---------------------------------//
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(products.length < 1 ){
      res.status(200).json({ success: true, message : 'No products to show' });
    }
    res.status(200).json({ success: true, message : 'All products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//---------------------create - a - products-----------------------------//




const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    next(error)
  }
};












//-----------------geta single product-------------------//

const getASingleProduct = async(req, res)=>{
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId)
    if(!product){
      res.status(404).json({success : false , message : 'No product found'})
    }
    res.status(200).json({success : true , message : 'single product fetched successfully' , product})
  } catch (error) {
   next(error)
  }
}

//--------------------update product -------------------------//


    const updateProduct = async (req, res, next) => {
      try {
        const productId = req.params.id;
        const {
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        } = req.body;
    
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
          },
          { new: true }
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
    
        res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
      } catch (error) {
        next(error);
      }
    };
    




const deleteProduct = async(req, res)=>{
  try {
    const productId = req.params.id
    const product = await Product.findByIdAndDelete(productId)
    if(!product) res.status(404).json({success : false , message : 'product not found'})
    res.status(200).json({success : true , message : 'product deleted successfully !'})
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllProducts, createProduct, updateProduct  , deleteProduct , getASingleProduct};

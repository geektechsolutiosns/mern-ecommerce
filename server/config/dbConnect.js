const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Product = require("../models/ProductSchema");

const ConnectDb = async (req, res, next) => {

  const pathtoproducts = path.join(__dirname, "..", "products.json");

  const jsonData = fs.readFileSync(pathtoproducts, "utf8");

  const products = JSON.parse(jsonData);
  try {

    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Database connected successfully");

    for (const product of products.products) {
      // ---------------Check if product with the same identifier exists in the database-----------------//

      const existingProduct = await Product.findOne({ title: product.title });

      //----------------------------- If the product doesn't exist, insert it---------------------------------------//

      if (!existingProduct) {
        const newProduct = new Product(product);
        await newProduct.save();
      }
    }

    console.log("Data inserted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = ConnectDb;

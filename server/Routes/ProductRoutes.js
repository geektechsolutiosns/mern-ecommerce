const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getASingleProduct } = require('../controllers/ProductController.js');
const  isAdmin  = require('../utils/Admin.js'); // Check this import

const verifyToken  = require('../utils/VerifyToken.js');

router.route('/getAllProducts').get(getAllProducts);
router.route('/create').post(verifyToken, isAdmin, createProduct);
router.route('/singleproduct/:id').get(getASingleProduct);
router.route('/update/:id').put(verifyToken, isAdmin,updateProduct);
router.route('/delete/:id').delete(verifyToken, isAdmin,deleteProduct);

module.exports = router;

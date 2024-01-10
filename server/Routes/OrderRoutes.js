const express = require('express')
const router = express.Router()
const {createOrder , getAllOrders} = require('../controllers/OrderController')

router.route('/create').post(createOrder)
router.route('/getAllProducts').get(getAllOrders)



module.exports = router
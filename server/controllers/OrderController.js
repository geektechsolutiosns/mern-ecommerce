const Order = require('../models/OrderSchema')


const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      zip,
      country,

    } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      address,
      city,
      zip,
      country,
    
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not create order', error: error.message });
  }
};


const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
module.exports = { createOrder , getAllOrders};

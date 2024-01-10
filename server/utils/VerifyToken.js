const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(400).json({ success: false, message: 'You are not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid token or user ID' });
    }

    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = verifyToken;

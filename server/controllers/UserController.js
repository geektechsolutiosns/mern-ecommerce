const User = require("../models/UserSchema");
const { generateToken } = require("../utils/CreateToken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.status(200).json({ success: true, message: 'No users to show !' });
    }
    return res.status(200).json({ success: true, message: 'Users fetched successfully', users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });

  }
};

//-----------------------------------user register route------------------------------------------//

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const requiredFields = { username, email, password };
    if (Object.values(requiredFields).some((field) => !field)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    const newUser = await User.create({ ...req.body });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser, // Sending user details without the password
    });
  } catch (error) {
    // Handle any other errors that might occur during user creation
    next(error);
  }
};

//-------------------------------------------user-login-route------------------------------------------------//

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const matchedPassword = await user.comparePassword(password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    // Send the token in the response body instead of setting it as an HTTP-only cookie
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", user , token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




module.exports = { registerUser, loginUser , getAllUsers};

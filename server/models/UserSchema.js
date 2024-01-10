const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "provide a username"],
    unique: true,
    trim: true,
    minlength: [3,"username length should be greater than 3"],
    maxlength: [20, "username length should be less than 20"]
  },
  email: {
    type: String,
    required: [true, "provide an email address"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "provide a password"],
    minlength: [6,"  password length should be greater than 6"],
    maxlength: [100,"password length should be less than 100"]
  },
  role : {
    type:String,
    enum: ['user', 'admin'],
    default :'user'
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error.message, error.stack);
    next(error); // Pass error to the next middleware
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers } =
  require("../controllers/UserController")
const verifyToken = require("../utils/VerifyToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/get-all-users").get(getAllUsers);

module.exports = router;

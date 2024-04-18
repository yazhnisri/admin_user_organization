const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    // Check if the password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ status: false, message: "Invalid Password" });
    }

    // Generate a token
    const token = jwt.sign({ sub: user._id }, JWT_SECRET);

    // Return the token and the user data in the JSON response
    res.json({ status: true, token, user, message: "Login successfully" });
  } catch (error) {
    console.error(error);
    res.json({ status: false, error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, role, organization, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    var userData = await User.findOne({ email: req.body.email });
    if (userData) {
      res.json({ status: false, message: "Email already exists" });
    } else {
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
        organization,
      });
      await user.save();
      res.json({ status: true, message: "Registration successfully" });
    }
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
});

module.exports = router;

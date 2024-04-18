const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const hashedPassword = bcrypt.hashSync("admin_password", 10);
const adminUser = new User({
  username: "admin",
  password: hashedPassword,
  role: "admin",
});

adminUser
  .save()
  .then(() => {
    console.log("Admin user created successfully");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error creating admin user:", err);
    mongoose.disconnect();
  });

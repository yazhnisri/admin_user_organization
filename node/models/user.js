const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  created_data: { type: Date, default: new Date() },
  // Other user fields
});

module.exports = mongoose.model("User", userSchema);

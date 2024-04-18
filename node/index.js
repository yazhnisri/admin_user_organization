const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const { Organization, User } = require("./models");
const authRoutes = require("./routes/auth");
const organizationRoutes = require("./routes/organizations");
const passportConfig = require("./config/passport");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/organization", organizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

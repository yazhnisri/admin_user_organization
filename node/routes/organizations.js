const express = require("express");
const Organization = require("../models/organization");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const getOrganizationsHandler = async (req, res) => {
  try {
    let organizations;

    // Check user role and fetch organizations accordingly
    if (req.body.role === "admin") {
      organizations = await Organization.find();
    } else {
      organizations = await Organization.find({ user: req.body._id }).sort({
        _id: -1,
      });
    }

    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addOrganizationHandler = async (req, res) => {
  try {
    console.log(req.body, "req.bodyyyyyyyyyyyyyyyyyyy");
    const newOrganization = new Organization({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      website: req.body.website,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      establishedYear: req.body.establishedYear,
      numberOfEmployees: req.body.numberOfEmployees,
      isActive: req.body.isActive,
      user: req.body.user, // Assuming user ID is stored in the JWT
    });
    console.log(newOrganization, "newOrganizationnewOrganization");

    const organization = await newOrganization.save();
    return res.json({
      status: true,
      message: "Organization data added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: false, message: error.message });
  }
};

router.post("/get", authMiddleware, getOrganizationsHandler);
router.post("/add", authMiddleware, addOrganizationHandler);

module.exports = router;

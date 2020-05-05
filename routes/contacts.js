const express = require("express");
const router = express.Router();

// @route   POST api/contacts
// @desc    Add a contact for user
// @access  Private
router.post("/", (req, res) => {
  res.send("Register a contact");
});

// @route   GET api/contacts
// @desc    Get all contacts of a user
// @access  Private
router.get("/", (req, res) => {
  res.send("Get All contacts of a user");
});

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update a contact");
});

// @route   DELETE api/contacts/:id
// @desc    Update a contact
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});
module.exports = router;

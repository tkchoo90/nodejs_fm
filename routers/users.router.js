// import * as utils from "../utils/utils";
const utils = require("../utils/utils");
const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// Check whether endpoint is working
router.get("/test", (req, res) => {
  res.send("landing page for users");
});

// Create new user
router.post("/create", async (req, res) => {
  let { email } = req.body;
  try {
    await utils.returnErrIfExist(email);  //check for already created users, throw error if user already exist
  } catch (err) {
    return res.status(400).send({ error: err });
  }

  try {
    const user = new User({ email: email });
    await user.save();
    res.status(201).send({ email: user.email });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send({ error: err.message });
  }
});

//List friends
router.get("/all", async (req, res) => {});

// Add friend
router.post("/add", async (req, res) => {});

//Block user
router.post("/block", async (req, res) => {});

//Subscribe user
router.post("/sub", async (req, res) => {});

module.exports = router;

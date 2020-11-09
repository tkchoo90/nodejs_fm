const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  email: {type: String},
});

// (Model Name, Schema object, Collection Name)
const model = mongoose.model("User", schema, "users");

module.exports = model;

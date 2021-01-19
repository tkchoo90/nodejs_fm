const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {type: String},
  friends: [{type: String}],
  block: [{type: String}],
  subscribe: [{type: String}],
});

// (Model Name, Schema object, Collection Name)
const model = mongoose.model("User", schema, "users");

module.exports = model;

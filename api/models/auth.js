const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  venue: String,
  auth_token: String,
});

module.exports = mongoose.model("Auth", authSchema);

const mongoose = require("mongoose");

const Messages = new mongoose.Schema({
  username: String,
  message: String,
  grupouser: { type: String, default: "" },
  date: String,
});

module.exports = mongoose.model("Messages", Messages);

const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  idU: {
    type: String
  },
  registrado: {
    type: Boolean,
    default: false
  },
  coins: {
    type: Number,
    default: 0
  },
  daily: {
    type: Number,
    default: 0
  }
});

module.exports = model("Users", userSchema);
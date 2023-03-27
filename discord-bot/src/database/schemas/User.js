const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  idUser: {
    type: String
  },
  registrado: {
    type: Boolean,
    default: false
  }
});

module.exports = model("Users", userSchema);
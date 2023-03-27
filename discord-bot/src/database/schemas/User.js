const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  idUser: {
    type: String
  }
});

module.exports = model("Users", userSchema);
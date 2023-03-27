const { Schema, model } = require("mongoose");

let guildSchema = new Schema({
  idGuild: {
    type: String
  }
});

module.exports = model("Guilds", guildSchema)
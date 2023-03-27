const { Schema, model } = require("mongoose");

let guildSchema = new Schema({
  idGuild: {
    type: String
  },
  lang: {
    type: String,
    default: "pt-BR"
  }
});

module.exports = model("Guilds", guildSchema)
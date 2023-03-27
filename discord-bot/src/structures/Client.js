const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = class DiscordBot extends Client {
  constructor(options) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ]
    })
  }
}
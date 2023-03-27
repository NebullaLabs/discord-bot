const Event = require("../../structures/base/Event.js");
const User = require("../../database/schemas/User");
const Guild = require("../../database/schemas/Guild");

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: "ready"
    })
  }
  run = async() => {
    this.client.database.users = User;
    this.client.database.guilds = Guild;
    this.client.registryCommands()
    console.log("[DISCORD] Client connected without errors.")
  }
}
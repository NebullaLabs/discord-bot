const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const database = require("../database/index.js");

module.exports = class DiscordBot extends Client {
  constructor(options) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ]
    })
    this.commands = [];
    this.database = new Collection()
  }
  registryCommands() {
    this.application.commands.set(this.commands)
  }
  loadCommands(path = "discord-bot/src/interactions") {
    const categories = readdirSync(path)
        for (const category of categories) {
            const slashCommands = readdirSync(`${path}/${category}`)
            for (const command of slashCommands) {
            const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
            const cmd = new (commandClass)(this)

     this.commands.push(cmd)
      }
    }
  }
  loadEvents(path = 'discord-bot/src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
  async connect() {
    super.login(process.env.TOKEN)
    this.loadCommands()
    this.loadEvents()
    database.start()
  }
}
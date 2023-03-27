const Command = require("../../structures/base/Command");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Me Convide para seu servidor"
    })
  }
  run = async(interaction) => {
    interaction.reply("Me adicione")
  }
}
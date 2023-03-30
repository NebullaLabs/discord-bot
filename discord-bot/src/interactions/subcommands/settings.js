const Command = require("../../structures/base/Command");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "settings",
      description: "Subcommands para configuração",
      options: [
        {
          type: 1,
          name: "language",
          description: "Altere a linguagem do servidor"
        }
      ]
    })
  }
  run = async(interaction) => {

    		const subCommand = interaction.options.getSubcommand();

    let guild = await this.client.database.guilds.findOne({ idS: interaction.guild.id })
    const lang = require(`../../../../discord-bot/src/languages/${guild.lang}`)

		require(`../../../../discord-bot/src/subCommands/settings/${subCommand}`)(
			this.client,
			interaction,
      lang
		);
  }
}
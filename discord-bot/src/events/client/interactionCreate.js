const Event = require("../../structures/base/Event");
const Guild = require("../../database/schemas/Guild");
const User = require("../../database/schemas/User");

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: "interactionCreate"
    })
  }
  run = async(interaction) => {
    if(interaction.isCommand()) {
      if(!interaction.guild) return
      			const cmd = this.client.commands.find(c => c.name === interaction.commandName)

			if (cmd) {
				if (cmd.requireDatabase) {
					interaction.guild.db =
						await this.client.db.guilds.findById(interaction.guild.id) ||
						new this.client.db.guilds({ idS: interaction.guild.id })
        }
        const user = User.findOne({
          idU: interaction.user.id
        })

        const guild = await Guild.findOne({
          idS: interaction.guild.id
        })

        if(!guild) {
          await Guild.create({
            idS: interaction.guild.id
          })
        } if(!user) {
          await User.create({ 
            idU: interaction.user.id },
						{ $set: { registrado: true }
            })
          interaction.reply("vc n tava registrado ent te registrei")
        }
        const lang = require(`../../languages/${guild.lang}`)
        cmd.run(interaction, lang)
      }
    }
  }
}
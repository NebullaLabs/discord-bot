const Event = require("../../structures/base/Event");

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
        const user = await this.client.database.users.findOne({
          idUser: interaction.user.id
        })

        const guild = await this.client.database.guilds.findOne({
          idGuld: interaction.guild.id
        })

        if(!guild) {
          await this.client.database.guilds.create({
            idGuild: interaction.guild.id
          })
        } if(!user) {
          await this.client.database.users.create({ 
            idUser: interaction.user.id },
						{ $set: { registrado: true }
            })
          interaction.reply("vc n tava registrado ent te registrei")
        }
        cmd.run(interaction)
      }
    }
  }
}
const { ListenerStructure } = require('../../Structures/Base/index');
const { Interaction, Events } = require('discord.js');

class InteractionCreateListener extends ListenerStructure {
    constructor(client) {
        super(client, {
            name: Events.InteractionCreate,
            once: false
        });
    }

    /**
     * @param {Interaction} interaction 
     */
    async eventExecute(interaction) {
        try {
            if (interaction.isCommand() && interaction.guild) {
                const command = this.client.commands.get(interaction.commandName);

                if (command) {
                    if (command.requireDatabase) {
                        interaction.guild.db =
                            await this.client.db.guilds.findById(interaction.guild.id) ||
                            new this.client.db.guilds({ idS: interaction.guild.id });
                    }
                    const user = this.client.database.users.findOne({
                        idU: interaction.user.id
                    });

                    const guild = await this.client.database.guilds.findOne({
                        idS: interaction.guild.id
                    });

                    if (!guild) {
                        await this.client.database.guilds.create({
                            idS: interaction.guild.id
                        });
                    } if (!user) {
                        await this.client.database.users.create({
                            idU: interaction.user.id
                        },
                        {
                            $set: { registrado: true }
                        });
                        interaction.reply('vc n tava registrado ent te registrei');
                    }
                    const lang = require(`../../Languages/${guild.lang}`);
                    return command.commandExecute(interaction, lang);
                }
            }
        } catch (err) {
            this.logger.error(err.stack, InteractionCreateListener.name);
        }
    }
}

module.exports = InteractionCreateListener;
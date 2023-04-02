const { CommandStructure } = require('../../Structures/Base/index');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class InviteCommand extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'invite',
            description: 'Me Convide para seu servidor',
            config: {
                registerSlash: true
            }
        });
    }

    commandExecute(interaction, lang) {
        const Button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(lang.invite.button1)
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/'),
                new ButtonBuilder()
                    .setLabel(lang.invite.button2)
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/')
            );

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username} › Invite`, iconURL: this.client.user.displayAvatarURL() })
                    .addFields(
                        {
                            name: `<:nada:1089609502556426310> <:nada:1089609502556426310> <:aviaomundo:1089609353386004542> » ${lang.invite.fieldname1}`,
                            value: `<:nada:1089609502556426310> ${lang.invite.fieldvalue1}`,
                            inline: false
                        },
                        {
                            name: `<:nada:1089609502556426310> <:nada:1089609502556426310> <:estrelabonita:1089609393542271088> » ${lang.invite.fieldname2}`,
                            value: `<:nada:1089609502556426310> ${lang.invite.fieldvalue2}`,
                            inline: false
                        }
                    )
                    .setFooter({
                        text: `${interaction.user.tag} || ${interaction.user.id}`,
                        iconURL: interaction.user.displayAvatarURL()
                    })
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setColor('#5865F2')
            ],
            components: [
                Button
            ]
        });
    }
};
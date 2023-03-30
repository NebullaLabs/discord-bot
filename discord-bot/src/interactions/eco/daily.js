const Command = require("../../structures/base/Command");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "daily",
      description: "Colete seu diário"
    })
  }
  run = async(interaction, lang) => {

        const Button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel(lang.invite.button1)
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.com/"),
      new ButtonBuilder()
      .setLabel(lang.invite.button2)
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.com/")
    )

    const user = await this.client.database.users.findOne({ idU: interaction.user.id });

    const give = Math.floor(Math.random() * 2300);

    let cooldown = 43200000 * 2;
    let coins = give;
    let daily = user.daily;
    let atual = user.coins;
    let time = daily + cooldown

    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
      return interaction.reply({ content: `<:no1:1090246696405049426> **» ${interaction.user.username},** Você precisa esperar até <t:${Math.ceil(time / 1000)}>`, ephemeral: true})
    } else {
      interaction.reply(`<:yes1:1090246656336859246> **» ${interaction.user.username},** Você coletou seu **diário** com sucesso e ganhou <:Sufy:1090949687021944883> **${coins.toLocaleString} Sufy's**`)
      interaction.reply({content: `<:estrelabonita:1089609393542271088> **»** Você sabia que com premium você ganha **2x** mais <:Sufy:1090949687021944883> **Sufy's**? Se você tivesse o premium teria recebido **${coins * 2} Sufy's**.`, components: [button]})
    }
  }
}
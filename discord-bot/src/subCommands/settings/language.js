const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Guild = require("../../database/schemas/Guild");

module.exports = async(client, interaction, lang) => {
  const server = await Guild.findOne({ idS: interaction.guild.id })
  if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `<:no1:1090246696405049426> **» ${interaction.user.username},** ${lang.language.perm}`, ephemeral: true })

  const row = new ActionRowBuilder()
  const button = new ButtonBuilder().setEmoji("🇧🇷").setStyle(ButtonStyle.Success).setCustomId("br")

  const button2 = new ButtonBuilder().setEmoji("🇺🇲").setStyle(ButtonStyle.Primary).setCustomId("eua")

  row.addComponents([button, button2])

  if(server.lang === "pt-BR") {
    button.setDisabled(true)
  }
  if(server.lang === "en-US") {
    button2.setDisabled(true)
  }

  let bueno = await client.users.fetch("465859183250767882")

  const embed = new EmbedBuilder()
  .setAuthor({ name: `${interaction.user.username} - Language`, iconURL: interaction.user.displayAvatarURL()})
  .setColor("5865F2")
  .setDescription(`<:aviaomundo:1089609353386004542> » ${interaction.user}, ${lang.language.embeddesc}`)
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      {
        name: "🇧🇷 » Português-BR",
        value: `**${lang.language.traduzidopor} \`${bueno.tag}\`**`,
        inline: false
      },
      {
        name: `🇺🇲 » English (United States)`,
        value: `**${lang.language.traduzidopor} \`${bueno.tag}\`**`,
        inline: false
      }
    )
  .setFooter({ text: `${interaction.user.tag} || ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL()})
  interaction.reply({ embeds: [embed], components: [row]})

  const filter1 = i => i.user.id === interaction.user.id;
	const collector1 = interaction.channel.createMessageComponentCollector({ filter1, time: 20000 });

  collector1.on('collect', async (x) => {
    if(x.customId === "br") {
      interaction.editReply({ content: `<:yes1:1090246656336859246> **» ${interaction.user.username},** Prontinho, agora eu falo português neste servidor.`, components: [], embeds: []})
      await Guild.findOneAndUpdate(
        { idS: interaction.guild.id },
        { $set: { lang: "pt-BR"} }
      )
    } else if(x.customId === "eua") {
      interaction.editReply({ content: `<:yes1:1090246656336859246> **» ${interaction.user.username},** Ok, now I speak english language on this server.`, components: [], embeds: []})
      await Guild.findOneAndUpdate(
        { idS: interaction.guild.id },
         { $set: { lang: "en-US"} }
      )
    }
  })
}
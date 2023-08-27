const { EmbedBuilder } = require('discord.js')
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")

module.exports = {
    name: "lock",
    description: "Verrouille un salon",
    permissions: Discord.PermissionFlagsBits.ManageChannels,
    options: [
      {
        type: "string",
        name: "reason",
        description: "Raison",
        required: false,
        autocomplete: false
      }
    ],
    async run(client, interaction) {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
      Success(interaction, "Le salon est maintenant verrouiller avec succès !")

      const reason = interaction.options.getString("reason") || "Aucune raison";

      const channel = await interaction.guild.channels.cache.get(interaction.channel.id);

      const embed = new EmbedBuilder()
        .setTitle("Salon verrouiller")
        .setDescription(`Le salon ${channel} a été verrouiller !`)
        .addFields(
          { name: "Modérateur", value: `${interaction.user}`, inline: false },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor(client.blanc)
        .setTimestamp()  

      interaction.channel.send({ embeds: [embed] })
    }
}
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    description: "Déverrouille un salon",
    permissions: Discord.PermissionFlagsBits.ManageChannels,
    async run(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })

        Success(interaction, `Le salon est déverrouillé !`)
    }
}
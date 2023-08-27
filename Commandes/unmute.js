const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")

module.exports = {
    name: "unmute",
    permissions: Discord.PermissionFlagsBits.MuteMembers,
    description: "Unmute un utilisateur",
    options: [
      {
        type: "user",
        name: "user",
        description: "utilisateur",
        required: true,
      }
    ],
    async run(client, interaction) {
      const target = interaction.options.getMember("user")

      if (!target.isCommunicationDisabled()) return Error(interaction, "Ce membre ne peut pas être démute car il n'est pas mute !")

      target.timeout(null);
      Success(interaction, "Ce membre a bien été unmute !")
    }
}
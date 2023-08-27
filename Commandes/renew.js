const Discord = require("discord.js")

module.exports = {

    name: "renew",
    description: "recrée un salon",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message) {

        message.channel.clone().then(msg => msg.send(` ${message.user} a recrée le salon`))
        message.channel.delete()
    }
}
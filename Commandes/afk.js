const Discord = require("discord.js")

const afkUsers = new Set();

module.exports = {
    name: "afk",
    description: "permet d'activé le mode afk",
    permissions: "Aucune",

    async run(client, interaction) {
        afkUsers.add(interaction.user.id);
        await interaction.reply('Mode AFK activé. Il sera désactivé lorsque vous enverrez un message.');
    },
    afkUsers
};
const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {

    name: "invite",
    description: "Invite Moi",
    permission: "Aucune",
    dm: true,

    async run(client, interaction) {
       
        const invite = new EmbedBuilder()
        .setTitle("**Voici mon Lien d'invitation**")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)

        const button = new ButtonBuilder()
        .setEmoji("🤖")
        .setLabel("Invite Moi")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setStyle(Discord.ButtonStyle.Link)

        const row = new ActionRowBuilder()
        .addComponents(button);

       await interaction.reply({embeds: [invite], components: [row]})
    },
};
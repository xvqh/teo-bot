const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const config = require('../config.js');

module.exports = {
    name: "support",
    description: "Obtenez le lien du serveur de support.",
    permission: "Aucune",
    dm: true,

    async run(client, interaction) {

        const user = interaction.user

        const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(config.inviteLink)
            .setLabel('Rejoignez notre serveur de support');

        const row = new ActionRowBuilder()
            .addComponents(button);

        
        const embed = new EmbedBuilder()
            .setTitle('Support')
            .setDescription(`Vous avez besoin d'aide ? Rejoignez notre [serveur de support](${config.inviteLink}).`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}

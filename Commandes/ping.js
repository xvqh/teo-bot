const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {

    name: "ping",
    description: "pour afficher la latence du bot",
    permission: "Aucune",
    dm: true,

    async run(client, interaction) {

        const message = await interaction.reply({ content: 'Chargement...', fetchReply: true });


        const botPing = message.createdTimestamp - interaction.createdTimestamp;


        const embed = new EmbedBuilder()
        .setTitle('🏓 Pong!')
        .addFields(
            { name: 'Ping du Bot', value: `${botPing}ms` },
            { name: 'Ping de l\'API', value: `${Math.round(interaction.client.ws.ping)}ms` }
        )
        .setColor(client.blanc);

        await interaction.editReply({ content: null, embeds: [embed] });
    }
};
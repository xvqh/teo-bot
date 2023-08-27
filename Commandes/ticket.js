const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const fs = require("fs")

module.exports= {
    name: "ticket",
    description: "Envoi l'embed de ticket",
    permissions: Discord.PermissionFlagsBits.Administrator,

    async run(client, interaction) {
        let ticketConfig = {};
        if (fs.existsSync('./ticket.json')) {
            ticketConfig = JSON.parse(fs.readFileSync('./ticket.json', 'utf-8'));
        }
        
        
        const categoryId = ticketConfig.categoryId;
        if (!categoryId || !interaction.guild.channels.cache.get(categoryId)) {
            return interaction.reply({ content: "Le système de ticket n'est pas correctement configuré sur ce serveur. Contactez un administrateur.", ephemeral: true });
        }

        
        const embed = new EmbedBuilder()
            .setTitle('Support Ticket')
            .setDescription('Cliquez sur le bouton ci-dessous pour ouvrir un ticket.');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('open')
                    .setLabel('Ouvrir un ticket')
                    .setStyle(Discord.ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "account-create",
    description: "Commencez la création de votre compte.",
    permissions: "Aucune",

    async run(client, interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('account-create')
            .setLabel("Crée un compte")
            .setStyle(ButtonStyle.Secondary)
        );

    await interaction.reply({
        content: 'Voulez-vous créer un compte ?',
        components: [row]
    });
    }
};
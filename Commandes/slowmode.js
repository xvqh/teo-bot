const Discord = require('discord.js');

module.exports = {
    name: "slowmode",
    description: "Définit le mode ralenti pour le salon actuel.",
    permissions: Discord.PermissionFlagsBits.ManageChannels,
    options: [
        {
            type: "integer",
            name: "seconds",
            description: "Nombre de secondes pour le ralentissement (0 pour désactiver)",
            required: true,
        }
    ],
    async run(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({
                content: "Vous n'avez pas la permission de modifier le ralentissement de ce salon.",
                ephemeral: true
            });
        }

        const seconds = interaction.options.getInteger('seconds');

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            
            interaction.reply(`✅| Le SlowMode du salon est maintenant de ${seconds} secondes.`);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "Une erreur s'est produite lors de la modification du ralentissement.",
                ephemeral: true
            });
        }
    }
};
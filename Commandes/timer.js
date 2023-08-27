const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "timer",
    description: "Lance un minuteur.",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "temps",
            description: "Durée du minuteur (format: Xs, Xm, Xh pour secondes, minutes, heures).",
            required: true,
            autocomplete: true
        },{
            type: "string",
            name: "raison",
            description: "La raison du minuteur",
            required: false,
            autocomplete: false
        }
    ],
    
    async run(client, interaction) {
        const rawTime = interaction.options.getString('temps');
        const reason = interaction.options.getString('raison') || "Aucune raison spécifiée";

        let multiplier;

        if (rawTime.endsWith('s')) {
            multiplier = 1;
        } else if (rawTime.endsWith('m')) {
            multiplier = 60;
        } else if (rawTime.endsWith('h')) {
            multiplier = 3600;
        } else {
            return interaction.reply('Format de temps invalide. Utilisez Xs, Xm ou Xh.');
        }

        const timeInSeconds = parseInt(rawTime.slice(0, -1)) * multiplier;

        const startEmbed = new EmbedBuilder()
            .setTitle('Minuteur commencé !')
            .setDescription(`Le minuteur a commencé pour ${rawTime}.\n\nRaison : ${reason}`)
            .setColor(client.blanc);
        
        interaction.reply({ embeds: [startEmbed] });

        setTimeout(async () => {
            try {
                await interaction.user.send(`Votre minuteur est fini ! Il a duré ${rawTime}.\nLa raison était : ${reason}`);
                interaction.followUp({ content: `⏲️ Le minuteur est fini <@${interaction.user.id}> ! Il a duré ${rawTime}.`, allowedMentions: { parse: ['users'] } });
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message de fin de minuteur:', error);
            }
        }, timeInSeconds * 1000);
    },
};
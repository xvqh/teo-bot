const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "firstmessage",
    description: "Récupère le premier message du salon.",
    permissions: "Aucune",

    async run(client, interaction) {
        try {
            const messages = await interaction.channel.messages.fetch({ limit: 1, after: '1' });
            const firstMessage = messages.first();

            if (!firstMessage) {
                return interaction.reply('Impossible de trouver le premier message de ce salon.');
            }

            const link = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${firstMessage.id}`;
            const embed = new EmbedBuilder()
                .setTitle('Premier message du salon')
                .setURL(link)
                .setDescription(`Message dans ce salon : [Cliquez ici pour le voir](${link})`)
                .addFields(
                    { name: 'Utilisateur', value: `<@${firstMessage.author.id}>`, inline: true },
                    { name: 'ID du message', value: firstMessage.id, inline: true },
                    { name: 'Créé le', value: firstMessage.createdAt.toLocaleString(), inline: true }
                )
                .setColor(client.blanc);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération du premier message:', error);
            interaction.reply('Une erreur est survenue lors de la récupération du premier message.');
        }
    }
};
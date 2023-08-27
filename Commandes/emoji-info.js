const Discord = require('discord.js');

module.exports = {
    name: "emoji-info",
    description: "Récupère des informations sur un emoji.",
    options: [
        {
            type: "string",
            name: 'emoji',
            description: 'Le nom de l\'emoji dont vous voulez obtenir des informations.',
            required: true,
            autocomplete: false
        }
    ],
    async run(client, interaction) {
        const emojiName = interaction.options.getString('emoji');
        const emoji = interaction.guild.emojis.cache.find(e => e.name === emojiName || e.id === emojiName);

        if (!emoji) {
            return interaction.reply({
                content: "Je n'ai pas pu trouver cet emoji sur ce serveur.",
                ephemeral: true
            });
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle("Informations sur l'emoji")
            .addFields(
                { name: 'Nom', value: emoji.name, inline: true },
                { name: 'ID', value: emoji.id, inline: true },
                { name: 'Perspective', value: emoji.toString(), inline: true },
                { name: 'Créé le', value: emoji.createdAt.toLocaleDateString(), inline: true },
                { name: 'Animé', value: emoji.animated ? 'Oui' : 'Non', inline: true },
                { name: 'Format', value: `[Cliquez ici](${emoji.url})`, inline: true },
                { name: 'Serveur', value: emoji.guild.name, inline: true }
            )
            .setColor(client.blanc)
            .setThumbnail(emoji.url);
            console.log(interaction.guild.emojis.cache.map(e => e.name).join(", "));

        interaction.reply({ embeds: [embed] });
    }
};
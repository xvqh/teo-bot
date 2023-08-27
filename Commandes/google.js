const Discord = require('discord.js');

module.exports = {
    name: "google",
    description: "Recherchez quelque chose sur Google.",
    options: [
        {
            type: "string",
            name: 'text',
            description: 'Ce que vous voulez rechercher sur Google.',
            required: true,
            autocomplete: false
        }
    ],
    async run(client, interaction) {
        const text = interaction.options.getString('text');
        const googleLink = `https://www.google.com/search?q=${encodeURIComponent(text)}`;

        interaction.reply(`Recherchez ceci sur Google: [${text}](${googleLink})`);
    }
};
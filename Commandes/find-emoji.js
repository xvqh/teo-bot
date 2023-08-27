const Discord = require("discord.js")

module.exports = {
    name: "find-emoji",
    description: "Trouve un emoji sur ce serveur par son nom",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "name",
            description: "Nom de l\'emoji à chercher",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction) {
        const emojiName = interaction.options.getString('name');
        
        
        const emoji = interaction.guild.emojis.cache.find(e => e.name === emojiName);

        if (emoji) {
            await interaction.reply(`Voici l'emoji que vous avez recherché: ${emoji}`);
        } else {
            await interaction.reply({content: 'Désolé, je n\'ai pas pu trouver cet emoji sur ce serveur.', ephemeral: true});
        }
    },
};
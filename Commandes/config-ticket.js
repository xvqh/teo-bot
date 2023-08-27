const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "config-ticket",
    description: "Config la catégorie ou serra ouvert les tickets",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "channel",
            name: "catégorie",
            description: "La catégorie ou serront ouvert les tickets",
            required: true
        }
    ],

    async run(client, interaction) {
        const categoryId = interaction.options.getChannel('catégorie').id;

        const config = {
            categoryId: categoryId
        };

        fs.writeFileSync('./ticket.json', JSON.stringify(config, null, 2));

        interaction.reply({ content: 'Catégorie de ticket configurée avec succès!', ephemeral: true });
    }
};
const Discord = require("discord.js")

module.exports = {
    name: "howgay",
    description: "Découvre à quel point quelqu’un est gay!",
    permissions: "Aucune",
    options: [
        {
            type: "user",
            name: "membre",
            description: "L’utilisateur à tester",
            required: false,
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser('membre') || interaction.user;
        const percentage = Math.floor(Math.random() * 101);

        await interaction.reply(`${user.username} est ${percentage}% gay! 🌈`);
    },
};
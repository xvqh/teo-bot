const fs = require('fs');
const Discord = require("discord.js")

module.exports = {
    name: "config-level",
    description: "Configure le canal pour les notifications de niveau",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "channel",
            name: "channel",
            description: "Le channel de notifications",
            required: true
        }
    ],

    async run(client, interaction) {
        const channel = interaction.options.getChannel('channel');

        let levelConfig = {};
        if (fs.existsSync('./level-channel.json')) {
            levelConfig = JSON.parse(fs.readFileSync('./level-channel.json', 'utf-8'));
        }

        levelConfig[interaction.guild.id] = channel.id;
        fs.writeFileSync('./level-channel.json', JSON.stringify(levelConfig, null, 2));

        interaction.reply({ content: `Salon pour les notifications de niveau défini à ${channel.name}.`, ephemeral: true });
    }
};
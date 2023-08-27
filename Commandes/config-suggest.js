const fs = require("fs")
const path = require("path")
const Discord = require("discord.js")

module.exports = {
    name: "config-suggest",
    description: "Configurez le salon pour les suggestions",
    permissions: Discord.PermissionFlagsBits.ManageGuild,
    options: [
        {
            type: "channel",
            name: "channel",
            description: "Salon pour les suggestions",
            required: true
        }
    ],

    async run(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) {
            return await interaction.reply({ content: 'Vous n\'avez pas les permissions nécessaires pour configurer les suggestions.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel');
        const configPath = path.join(__dirname, '..', 'suggest.json');

        let config = {};

        
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        config[interaction.guild.id] = channel.id;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

        await interaction.reply({content: `Salon des suggestions configuré pour ${channel.name}`, ephemeral: true});
    },
};
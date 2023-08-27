const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "anti-join",
    description: "Activer ou désactiver la protection anti-join",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "option",
            description: "Activer ou désactiver la suppression des liens",
            required: true,
        },{
            type: "channel",
            name: "channel",
            description: "Le salon où seront envoyés les notifications",
            required: true,
        }
    ],

    async run(client, interaction) {
            const status = interaction.options.getString("option");
            const channel = interaction.options.getChannel("channel");
    
            if (status === "on" && !channel) {
                return interaction.reply({ content: "Vous devez définir un salon si vous activez l'anti-join.", ephemeral: true });
            }
    
            let settings;
            if (fs.existsSync('../join.json')) {
                settings = JSON.parse(fs.readFileSync('./join.json', 'utf-8'));
            } else {
                settings = {};
            }
    
            settings[interaction.guildId] = {
                status: (status === 'on'),
                channelId: channel.id
            };
    
            fs.writeFileSync('./join.json', JSON.stringify(settings, null, 2));
    
            await interaction.reply({ content: `La protection anti-join a été ${status === 'on' ? 'activée' : 'désactivée'} et les notifications seront envoyées dans ${channel}!`, ephemeral: true });
    }
}
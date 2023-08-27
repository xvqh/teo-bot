const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "anti-spam",
    description: "Activer ou désactiver la protection anti-spam",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "option",
            description: "Activer ou désactiver l\'anti-spam",
            required: true,
            choices: [
                {
                    name: "Activer",
                    value: "on"
                },
                {
                    name: "Désactiver",
                    value: "off"
                }
            ]
        }
    ],

    async run(client, interaction) {
        const choice = interaction.options.getString('option');

        let settings;
        if (fs.existsSync('../spam.json')) {
            settings = JSON.parse(fs.readFileSync('./spam.json', 'utf-8'));
        } else {
            settings = {};
        }

        settings[interaction.guildId] = (choice === 'on');

        fs.writeFileSync('./spam.json', JSON.stringify(settings, null, 2));

        await interaction.reply(`La protection anti-spam a été ${choice === 'on' ? 'activée' : 'désactivée'}!`);
    }
}
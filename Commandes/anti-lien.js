const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "anti-lien",
    description: "Activer ou désactiver la suppression automatique des liens",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "option",
            description: "Activer ou désactiver la suppression des liens",
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
        const choice = interaction.options.getString("option");
        
        let settings = require('../liens.json');
        settings[interaction.guildId] = choice === "on";

        fs.writeFileSync('./liens.json', JSON.stringify(settings, null, 4));
        
        const response = choice === "on" ? "Les liens seront maintenant supprimés automatiquement." : "La suppression automatique des liens est désactivée.";
        interaction.reply({ content: response, ephemeral: true });
    }
}

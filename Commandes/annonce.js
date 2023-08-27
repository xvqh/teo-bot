const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "annonce",
    description: "Fait une annonce dans le salon.",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "text",
            description: "Le texte de l'annonce",
            required: true,
            autocomplete: false
        },{
            type: "string",
            name: "ping",
            description: "Voulez-vous pinguer tous les membres?",
            required: true,
            autocomplete: true,
            choices: [
                { name: 'Oui', value: 'oui' },
                { name: 'Non', value: 'non' }
            ]
        }
    ],
    
    async run(client, interaction) {
        const texte = interaction.options.getString('text');
        const ping = interaction.options.getString('ping');

        const embed = new EmbedBuilder()
            .setTitle('📢 Annonce 📢')
            .setDescription(texte)
            .setColor(client.blanc);

        let content = (ping === 'oui') ? '@everyone' : '';

        interaction.reply({ content: content, embeds: [embed], allowedMentions: { parse: (ping === 'oui') ? ['everyone'] : [] } });
    }
}
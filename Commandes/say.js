const Discord = require("discord.js")

module.exports = {

    name: "say",
    description: "Fait répéter au bot votre message",
    permission: "Aucune",
    dm: true,
    options: [
        {
            type: "string",
            name: "message", 
            description: "Le message que vous voulez que le bot répète",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction, args) {
        const userMessage = interaction.options.getString('message');

        // Envoyer le message à la place de la réponse à l'interaction
        await interaction.channel.send(userMessage);
        // Ensuite, répondre à l'interaction pour la faire disparaître sans envoyer de message visible
        await interaction.deferReply({ ephemeral: true });
      },
    };
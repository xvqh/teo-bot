const fs = require('fs');
const path = require('path');

module.exports = {
    name: "suggest",
    description: "Faite une suggestion sur le serveur",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "message",
            description: "Votre suggestion",
            required: true,
            autocomplete: false
        }
    ],
    
    async run(client, interaction) {
        const suggestion = interaction.options.getString('message');

        const configPath = path.join(__dirname, '..', 'suggest.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        const suggestChannelID = config[interaction.guild.id];
        if (!suggestChannelID) {
            return await interaction.reply({content: 'Le salon des suggestions n\'a pas été configuré pour ce serveur.', ephemeral: true});
        }

        const suggestChannel = interaction.guild.channels.cache.get(suggestChannelID);
        if (!suggestChannel) {
            return await interaction.reply({content: 'Le salon des suggestions configuré semble ne plus exister. Veuillez reconfigurer.', ephemeral: true});
        }

        suggestChannel.send(`Suggestion de ${interaction.user.tag}:\n${suggestion}`);
        await interaction.reply({content: 'Votre suggestion a été soumise.', ephemeral: true});
    },
};
const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: "bin",
    description: "Poste du contenu sur SourceBin.",
    options: [
        {
            type: "string",
            name: 'text',
            description: 'Le texte que vous souhaitez poster sur SourceBin.',
            required: true,
            autocomplete: false
        }
    ],
    
    async run(client, interaction) {
        const contentToPost = interaction.options.getString('text');

        try {
            const response = await axios.post('https://sourceb.in/api/bins/', {
                files: [{
                    name: "file",
                    content: contentToPost
                }]
            });

            if (response.data && response.data.key) {
                interaction.reply(`Votre texte a été posté sur SourceBin : https://sourceb.in/${response.data.key}`);
            } else {
                throw new Error('Réponse inattendue de SourceBin.');
            }
        } catch (error) {
            console.error('Erreur lors de la publication sur SourceBin:', error);
            interaction.reply({
                content: "Une erreur s'est produite lors de la publication sur SourceBin.",
                ephemeral: true
            });
        }
    }
};
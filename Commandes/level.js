const fs = require('fs');

module.exports = {
    name: "level",
    description: "Voir le niveau d'un membre ou le vôtre",
    permissions: "Aucune",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont vous souhaitez obtenir le level",
            required: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser('membre') || interaction.user;

       
        if (!fs.existsSync('./level-channel.json')) {
            return interaction.reply({ content: 'Le système de niveau n\'est pas encore configuré pour cette guilde.', ephemeral: true });
        }

        const channelConfig = JSON.parse(fs.readFileSync('./level-channel.json', 'utf-8'));

       
        if (!channelConfig[interaction.guild.id]) {
            return interaction.reply({ content: 'Le système de niveau n\'est pas encore configuré pour cette guilde.', ephemeral: true });
        }

        
        if (!fs.existsSync('./level.json')) {
            return interaction.reply({ content: 'Il y a eu une erreur en récupérant les données du niveau.', ephemeral: true });
        }

        const data = JSON.parse(fs.readFileSync('./level.json', 'utf-8'));

        if (!data[interaction.guild.id] || !data[interaction.guild.id][user.id]) {
            return interaction.reply({ content: `L'utilisateur <@${user.id}> n'a pas encore de données de niveau pour ce serveur.`, ephemeral: true });
        }

        interaction.reply({ content: `<@${user.id}> est au niveau ${data[interaction.guild.id][user.id].level} avec ${data[interaction.guild.id][user.id].messages} messages.`});
    }
};
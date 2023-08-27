const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "reset-level",
    description: "Reset le niveau d\'un membre",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont vous souhaitez reset",
            required: true
        }
    ],
    
    async run(client, interaction) {
        const member = interaction.options.getUser('membre');
        if (!member) return interaction.reply({ content: 'Membre non trouvé.', ephemeral: true });

        if (!fs.existsSync('./level.json')) return interaction.reply({ content: 'Erreur lors de la lecture du fichier de niveau.', ephemeral: true });

        let levels = JSON.parse(fs.readFileSync('./level.json', 'utf-8'));

        if (!levels[interaction.guild.id] || !levels[interaction.guild.id][member.id]) {
            return interaction.reply({ content: 'Ce membre n\'a pas de données de niveau enregistrées.', ephemeral: true });
        }
        
        levels[interaction.guild.id][member.id] = { level: 1, messages: 0 };

        
        fs.writeFileSync('./level.json', JSON.stringify(levels, null, 2));

        interaction.reply({ content: `Le niveau de <@${member.id}> a été réinitialisé.`, ephemeral: true });
    }
};
const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "add-xp",
    description: "Ajoute Un ou des message a un membre",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont vous voulez ajoutée le ou les message",
            required: true
        },{
            type: "integer",
            name: "nombre",
            description: "Le nombre de message a ajoutée",
            required: true
        }
    ],

    async run(client, interaction) {
        const member = interaction.options.getUser('membre');
        const amount = interaction.options.getInteger('nombre');

        if (!member) return interaction.reply({ content: 'Membre non trouvé.', ephemeral: true });

        if (!fs.existsSync('./level.json')) return interaction.reply({ content: 'Erreur lors de la lecture du fichier de niveau.', ephemeral: true });

        let levels = JSON.parse(fs.readFileSync('./level.json', 'utf-8'));

        if (!levels[interaction.guild.id]) {
            levels[interaction.guild.id] = {};
        }

        if (!levels[interaction.guild.id][member.id]) {
            levels[interaction.guild.id][member.id] = { level: 1, messages: 0 };
        }

        
        levels[interaction.guild.id][member.id].messages += amount;

        
        fs.writeFileSync('./level.json', JSON.stringify(levels, null, 2));

        interaction.reply({ content: `Vous avez ajouté ${amount} XP à <@${member.id}>.`, ephemeral: true });
    }
};
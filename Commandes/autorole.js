const Discord = require("discord.js")

module.exports = {
    name: "autorole",
    description: "Activer ou désactiver l’attribution automatique d’un rôle aux nouveaux membres.",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "action",
            description: "Choisissez si vous souhaitez activer ou désactiver l’attribution automatique.",
            required: true,
            choices: [
                {
                    name: 'on',
                    value: 'on'
                },
                {
                    name: 'off',
                    value: 'off'
                }
            ]
        },{
            type: "role",
            name: "role",
            description: "Le rôle à attribuer",
            required: false,
        }
    ],

    async run(client, interaction) {
        const action = interaction.options.getString('action');
        
        if (action === 'on') {
            const role = interaction.options.getRole('role');
            if (!role) {
                return interaction.reply({ content: 'Vous devez spécifier un rôle si vous choisissez "on".', ephemeral: true });
            }

            const config = require('../config.js');
            config.autorole = role.id;
            config.autoroleState = 'on';

            await interaction.reply({ content: `Le rôle automatique a été activé et défini sur ${role.name}.`, ephemeral: true});
        } else {
            const config = require('../config.js');
            config.autoroleState = 'off';

            await interaction.reply({ content: `L'attribution automatique de rôle a été désactivée.`, ephemeral: true});
        }
    }
}
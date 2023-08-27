const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "ban un membre",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a kick",
            required: true
        },{
            type: "string",
            name: "raison",
            description: "la raison du kick",
            required: false,
            autocomplete: false
        }
    ],
    
    async run(client, interaction) {
        const user = interaction.options.getUser('membre');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        try {
            await interaction.guild.members.ban(user, { reason });
            await interaction.reply({ content: `${user.tag} a été banni. Raison : ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Il y a eu une erreur en essayant de bannir ce membre.', ephemeral: true });
        }
    }
};
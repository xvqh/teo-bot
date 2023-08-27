const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "kick un membre",
    permissions: Discord.PermissionFlagsBits.KickMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a kick",
            required: true,
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

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: "Ce membre n'est pas sur ce serveur.", ephemeral: true });
        }

        try {
            await member.kick(reason);
            await interaction.reply({ content: `${user.tag} a été kick. Raison : ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Il y a eu une erreur en essayant de kick ce membre.', ephemeral: true });
        }
    }
};
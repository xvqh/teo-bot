const Discord = require('discord.js');

module.exports = {

        name: "create-invite",
        description: "Crée une invitation pour le salon actuel.",
        permissions: "Aucune",

    async run(client, interaction) {
        if (!interaction.guild) {
            return interaction.reply({
                content: "Cette commande ne peut être utilisée que dans un serveur Discord.",
                ephemeral: true
            });
        }

        const botMember = await interaction.guild.members.fetch(client.user.id);

        
        if (!interaction.channel.permissionsFor(botMember).has('CREATE_INSTANT_INVITE')) {
            return interaction.reply({
                content: "Je n'ai pas la permission de créer une invitation dans ce salon.",
                ephemeral: true
            });
        }

        try {
            
            const invite = await interaction.channel.createInvite({
                maxAge: 3600, 
                maxUses: 1,   
            });

            interaction.reply(`Voici votre invitation : ${invite.url}`);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "Une erreur s'est produite lors de la création de l'invitation.",
                ephemeral: true
            });
        }
    }
};
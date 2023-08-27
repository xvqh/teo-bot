const Discord = require("discord.js")
const { EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const config = require('../config.js')

module.exports = {
    name: "call",
    description: "Contactez le support si vous avez un problème.",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: true,
    options: [
        {
            type: "string",
            name: "problème",
            description: "Expliquez brièvement votre problème.",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction) {
        const problemDescription = interaction.options.getString('problème');


        const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 })
        if (!invite) {
            return interaction.reply({ content: "Désolé, je ne peux pas créer d'invitation pour ce serveur.", ephemeral: true });
        }


        const inviteButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(invite.url)
            .setLabel('Rejoignez le serveur');

        const row = new ActionRowBuilder()
            .addComponents(inviteButton);



        const embed = new EmbedBuilder()
            .setTitle('Appel au Support')
            .setDescription(problemDescription)
            .setColor(client.blanc)
            .setFooter({ 
                text: `Problème signalé par ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true })
            });


        const supportChannel = interaction.client.channels.cache.get(config.supportChannelId);
        if (supportChannel) {
            await supportChannel.send({ embeds: [embed], components: [row] });
            await interaction.reply({ content: 'Votre problème a été signalé au support. Merci de patienter, quelqu\'un vous contactera bientôt.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Erreur lors de la signalisation du problème au support.', ephemeral: true });
        }
    }
};
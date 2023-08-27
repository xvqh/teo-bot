const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Affiche le informations de ce serveur",
    permissions: "Aucune",
    async run(client, interaction) {
        const { guild } = interaction;
        await interaction.guild.fetch();

        const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Informations du serveur", iconURL: `${client.user.displayAvatarURL()}` })
            .addFields(
                {
                    name: "➔ Informations",
                    value: `
                    > **\`•\` Nom du serveur :** ${guild.name}
                    > **\`•\` ID du serveur :** ${guild.id}
                    > **\`•\` Propriétaire :** <@${(await guild.fetchOwner()).user.id}> \`${(await guild.fetchOwner()).user.tag}\`
                    > **\`•\` Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)
                    `,
                    inline: false
                },
                {
                    name: "➔ Statistiques",
                    value: `
                    > **\`•\` Membres :** ${guild.memberCount}
                    > **\`•\` Niveau de boost :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))
                    > **\`•\` Emojis :** ${guild.emojis.cache.size}
                    > **\`•\` Rôles :** (${guild.roles.cache.size}) : ${guild.roles.cache.map(role => role.toString()).join(', ')}
                    `,
                    inline: false
                },
            )
            .setFooter({
                text: `${guild.name}`,
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            .setColor(client.blanc)
            .setThumbnail(interaction.guild.iconURL())
            .setImage(interaction.guild.bannerURL())

        Replied.edit({ content: null, embeds: [embed] })
    }
}
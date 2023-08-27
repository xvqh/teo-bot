const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "snipe",
    description: "Récupère le dernier message supprimé du salon",
    permission: "Aucune",
    dm: true,

    async run(client, interaction) {

        const snipeMap = interaction.client.snipeMap;
        const msg = snipeMap.get(interaction.channelId);
        if (!msg) return interaction.reply({ content: "Il n'y a rien à snipe ici !", ephemeral: true });
      
        const user = interaction.client.users.cache.find(user => user.tag === msg.author);
      
        const embed = new EmbedBuilder()
          .setAuthor({ name: msg.author, iconURL: user ? user.displayAvatarURL({ dynamic: true }) : undefined }) // Utilisez l'URL de l'avatar de l'auteur
          .setDescription(msg.content)
          .setTimestamp()
          .setColor('#F7F9F7');
      
        if (msg.image) embed.setImage(msg.image);
      
        interaction.reply({ embeds: [embed] });
      },
    }
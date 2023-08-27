const Discord = require("discord.js");
module.exports = {
    name: "stats",
    description: "Affiche des informations sur le serveur",
    permissions: "Aucune",
    options: [],
    async run(client, message, interaction) {

      const total = message.guild.memberCount
      const online = message.guild.presences.cache.filter((presence) => presence.status !== "offline").size
      const vocal = message.guild.members.cache.filter(m => m.voice.channel).size
      const boost = message.guild.premiumSubscriptionCount || '0'

      const embed = new Discord.EmbedBuilder()
          .setTitle(`・__Stats de ${message.guild.name}__`)
          .setColor(client.blanc)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(`*Membres :* **${total}**\n*En ligne :* **${online}**\n*En vocal :* **${vocal}**\n*Boost :* **${boost}**`)
          .setTimestamp()
          .setFooter({ text: `Stats ${message.guild.name}` })
      message.channel.send({ embeds: [embed] })
  }
}
  
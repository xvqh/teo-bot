const { EmbedBuilder } = require("discord.js");

module.exports = {

    name: "uptime",
    description: "Savoir depuis combien de temps le bot est en ligne.",
    permission: "Aucune",
    dm: true,
    async run(client, message) {
        
        const uptimeTimestamp = Date.now() - (process.uptime() * 1000);

        const uptimebed = new EmbedBuilder()
          .setTitle("**Uptime**")
          .setDescription(`Le bot est en ligne depuis <t:${Math.round(uptimeTimestamp / 1000)}:R>`)
          .setFooter({ text: "© Dokay Heberg - 2023"})
          .setColor("#1E69EC")
          .setThumbnail("https://cdn.discordapp.com/attachments/999040172681351179/1116481147736702986/IMG_8311.png")

        await message.reply({ embeds: [uptimebed] })
        
    }
}
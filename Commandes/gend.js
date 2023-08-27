const fs = require("fs")
const path = require("path")
const Discord = require("discord.js")

module.exports = {
    name: "gend",
    description:  "Termine un giveaway",
    pemrissions: Discord.PermissionFlagsBits.Administrator,

    async run(client, interaction) {
        const giveaways = JSON.parse(fs.readFileSync(path.join(__dirname, 'giveaway.json'), 'utf-8'));

        if (!giveaways[interaction.guild.id] || !giveaways[interaction.guild.id][interaction.channel.id]) {
            return interaction.reply({ content: "Aucun giveaway n'a été trouvé dans ce canal.", ephemeral: true });
        }

        const giveawayMessageID = Object.keys(giveaways[interaction.guild.id][interaction.channel.id])[0];
        const giveawayMessage = await interaction.channel.messages.fetch(giveawayMessageID);

        const reaction = giveawayMessage.reactions.cache.get('🎉');
        const users = await reaction.users.fetch();
        users.delete(giveawayMessage.author.id);  

        if (!users.size) {
            interaction.reply("Aucun participant n'a été trouvé pour ce giveaway.");
            await giveawayMessage.edit({ embeds: [{ title: "🎉 Giveaway 🎉", description: `**${giveaways[interaction.guild.id][interaction.channel.id][giveawayMessageID].prize}**\n\nLe giveaway est terminé! Malheureusement, il n'y avait pas de participants.` }] });
            delete giveaways[interaction.guild.id][interaction.channel.id][giveawayMessageID];
            if (!Object.keys(giveaways[interaction.guild.id][interaction.channel.id]).length) delete giveaways[interaction.guild.id][interaction.channel.id];
            fs.writeFileSync(path.join(__dirname, 'giveaway.json'), JSON.stringify(giveaways, null, 2));
            return;
        }

        const winner = users.random();
        interaction.reply(`Le gagnant du giveaway est: ${winner.toString()}. Félicitations!`);
        await giveawayMessage.edit({ embeds: [{ title: "🎉 Giveaway 🎉", description: `**${giveaways[interaction.guild.id][interaction.channel.id][giveawayMessageID].prize}**\n\nLe giveaway est terminé! Le gagnant est ${winner.toString()}`, color: 'GREEN' }] });

        delete giveaways[interaction.guild.id][interaction.channel.id][giveawayMessageID];
        if (!Object.keys(giveaways[interaction.guild.id][interaction.channel.id]).length) delete giveaways[interaction.guild.id][interaction.channel.id];
        fs.writeFileSync(path.join(__dirname, 'giveaway.json'), JSON.stringify(giveaways, null, 2));
    }
};
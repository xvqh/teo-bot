const fs = require("fs")
const path = require("path")
const Discord = require("discord.js")

module.exports = {
    name: "gdelete",
    description: "Supprime un giveaway",
    permissions: Discord.PermissionFlagsBits.Administrator,

    async run(client, interaction) {
        const giveaways = JSON.parse(fs.readFileSync(path.join(__dirname, 'giveaway.json'), 'utf-8'));

        
        if (!giveaways[interaction.guild.id] || !giveaways[interaction.guild.id][interaction.channel.id]) {
            return interaction.reply({ content: "Aucun giveaway n'a été trouvé dans ce canal.", ephemeral: true });
        }

        const giveawayMessageID = Object.keys(giveaways[interaction.guild.id][interaction.channel.id])[0];
        const giveawayMessage = await interaction.channel.messages.fetch(giveawayMessageID);

       
        await giveawayMessage.delete();

        
        delete giveaways[interaction.guild.id][interaction.channel.id][giveawayMessageID];
        if (!Object.keys(giveaways[interaction.guild.id][interaction.channel.id]).length) delete giveaways[interaction.guild.id][interaction.channel.id];
        fs.writeFileSync(path.join(__dirname, 'giveaway.json'), JSON.stringify(giveaways, null, 2));

        interaction.reply({ content: 'Le giveaway a été supprimé avec succès.', ephemeral: true });
    }
};
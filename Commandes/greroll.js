const Discord = require("discord.js")

module.exports = {
    name: "greroll",
    description: "Reroll le giveaway",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "messageid",
            description: "L'id du message",
            required: true
        }
    ],

    async run(client, interaction) {
        const messageId = interaction.options.getString('messageid'); 

        const fetchedMsg = await interaction.channel.messages.fetch(messageId);
        if (!fetchedMsg) {
            return interaction.reply({ content: 'Impossible de trouver le message de ce giveaway.', ephemeral: true });
        }

        const reactions = fetchedMsg.reactions.cache;
        const giveawayReaction = reactions.get('🎉');
        if (!giveawayReaction) return interaction.reply({ content: "Il semble qu'il y ait eu un problème avec le giveaway.", ephemeral: true });

        const users = await giveawayReaction.users.fetch();
        const validEntries = users.filter(u => !u.bot);
        if (validEntries.size === 0) {
            return interaction.reply({ content: "Pas de gagnants, pas de participants valides pour reroll.", ephemeral: true });
        }

        const newWinner = validEntries.random();
        interaction.channel.send(`Le nouveau gagnant est <@${newWinner.id}>! Félicitations!`);
    }
};
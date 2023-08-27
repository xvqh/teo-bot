const fs = require("fs")
const Discord = require("discord.js")
const path = require("path")

module.exports = {
    name: "gcreate",
    description: "Crée un giveaway",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "cadeaux",
            description: "Le cadeau du giveaway",
            required: true
        },{
            type: "number",
            name: "temp",
            description: "La durée du giveaway",
            required: true
        }
    ],

    async run(client, interaction) {
        const kdo = interaction.options.getString('cadeaux'); 
        const durée = interaction.options.getNumber('temp'); 
        const user = interaction.user;

        const endTime = Date.now() + (durée * 60 * 1000);

        const giveawayEmbed = {
            title: `🎉 Giveaway 🎉`,
            description: `**Lancé par <@${user.id}>**\n\n**${kdo}**\n\nRéagissez avec 🎉 pour participer!\n\nTermine dans: ${durée} minutes`,
        };

        const msg = await interaction.channel.send({ embeds: [giveawayEmbed] });
        await msg.react('🎉');

        const updateInterval = setInterval(async () => {
            const remainingTime = endTime - Date.now();
            const remainingMinutes = Math.ceil(remainingTime / 60000);
            if (remainingMinutes <= 0) {
                clearInterval(updateInterval);
                giveawayEmbed.description = `**${kdo}**\n\nCe giveaway est terminé !`;
                msg.edit({ embeds: [giveawayEmbed] });
            } else {
                giveawayEmbed.description = `**Lancé par <@${user.id}>**\n\n**${kdo}**\n\nRéagissez avec 🎉 pour participer!\n\nTermine dans: ${remainingMinutes} minutes`;
                msg.edit({ embeds: [giveawayEmbed] });
            }
        }, 60000);  // Met à jour toutes les minutes

        setTimeout(async () => {
            clearInterval(updateInterval);  // Assurez-vous d'arrêter l'intervalle

            const fetchedMsg = await interaction.channel.messages.fetch(msg.id);
            const reactions = fetchedMsg.reactions.cache;
            const giveawayReaction = reactions.get('🎉');
            if (!giveawayReaction) return interaction.channel.send("Il semble qu'il y ait eu un problème avec le giveaway.");

            const users = await giveawayReaction.users.fetch();
            const validEntries = users.filter(u => !u.bot);
            if (validEntries.size === 0) {
                return interaction.channel.send("Pas de gagnants, pas de participants valides !");
            }

            const winner = validEntries.random();
            interaction.channel.send(`Félicitations <@${winner.id}>! Vous avez gagné **${kdo}**.`);

        }, durée * 60 * 1000);  

        let giveaways = {};

        if (fs.existsSync(path.join(__dirname, 'giveaway.json'))) {
            giveaways = JSON.parse(fs.readFileSync(path.join(__dirname, 'giveaway.json'), 'utf-8'));
        }

        if (!giveaways[interaction.guild.id]) {
            giveaways[interaction.guild.id] = {};
        }

        giveaways[interaction.guild.id][interaction.channel.id] = {
            [msg.id]: {
                endTime: endTime,
                prize: kdo
            }
        };

        fs.writeFileSync(path.join(__dirname, 'giveaway.json'), JSON.stringify(giveaways, null, 2));

        interaction.reply({ content: 'Giveaway créé!', ephemeral: true });
    }
};
const Discord = require("discord.js")
const fs = require('fs')

module.exports = {

    name: "bl",
    description: "Ajoute un utilisateur à la liste de bannissement.",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "user",
            description: "Utilisateur à bl",
            required: true,
        }
    ],

    async run(client, interaction) {

        const user = interaction.options.getUser('user');

        let banList;
        try {
            banList = JSON.parse(fs.readFileSync('banlist.json'));
        } catch {
            banList = [];
        }

        if (!banList.includes(user.id)) {
            banList.push(user.id);
            fs.writeFileSync('banlist.json', JSON.stringify(banList));
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (member) {
            try {
                await member.ban({ reason: 'Utilisateur sur la liste de bannissement.' });
                await interaction.reply({text: `${user.tag} a été ajouté à la liste de bannissement et a été banni de ce serveur.`, ephemeral: true});
            } catch (error) {
                await interaction.reply({text: `Impossible de bannir ${user.tag} de ce serveur.`, ephemeral: true});
            }
        } else {
            await interaction.reply(`${user.tag} a été ajouté à la liste de bannissement.`);
        }
    },
};
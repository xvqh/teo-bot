const { EmbedBuilder } = require('discord.js');
const warnModel = require('../../warns.json');
const moment = require('moment');
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "infractions",
    description: "Affiche les avertissement(s) d'un utilisateur",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Utilisateur",
            required: true
        }
    ],
    async run(client, interaction) {
        const target = interaction.options.getUser('user');

        const userWarnings = warnModel[interaction.guildId] && warnModel[interaction.guildId][target.id];

        if(!userWarnings || userWarnings.length === 0) return Error(interaction, `${target.tag} n'a aucun avertissement !`);

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(warn.moderatorId);

            return [
                `Modérateur : **${moderator ? moderator.user.tag : "Utilisateur non trouvé"}**`,
                `Date : **${moment(warn.timestamp).format("[Le] DD/MM/YYYY [à] HH:mm:ss")}**`,
                `Raison : **${warn.reason}**` 
            ].join("\n");
        })
        .join("\n\n");

        const embed = new EmbedBuilder()
            .setTitle(`Infractions de ${target.tag}`)
            .setDescription(embedDescription)
            .setTimestamp()
            .setColor(client.blanc)

        interaction.reply({ embeds: [embed] });
    }
}
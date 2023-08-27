const { EmbedBuilder } = require('discord.js');
const warnModel = require('../warns.json');
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "warn",
    description: "Avertit un utilisateur",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Utilisateur",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "reason",
            description: "Raison",
            required: false,
            autocomplete: false
        }
    ],
    async run(client, interaction) {
        const target = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason") || "Aucune raison"

        if(target.user.bot) return Error(interaction, "Je ne peux pas mute un bot")

        if(target.id === client.user.id) return Error(interaction, "Impossible de me warn !")

        const warnInfo = {
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        };
    
        if (warnModel[target.id]) {
            warnModel[target.id].push(warnInfo);
        } else {
            warnModel[target.id] = [warnInfo];
        }
    
        fs.writeFileSync('./warns.json', JSON.stringify(warnModel, null, 4), 'utf-8');
    
        Success(interaction, `Ce membre a bien été averti !`)

        const embed = new EmbedBuilder()
            .setTitle("Membre warn")
            .setDescription(`Un membre a été warn du serveur **${interaction.guild.name}**`)
            .addFields(
            { name: "Membre", value: `${target.user.tag}`, inline: false },
            { name: "Raison", value: `${reason}`, inline: false },
            )
            .setColor(client.blanc)
            .setTimestamp()
            
        const embedpv = new EmbedBuilder()
            .setTitle("Sanction")
            .setDescription(`Vous venez d'être **avertit** du serveur **${interaction.guild.name}**\n**Raison : ${reason}**`)
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL({dynamic: true})
            })
            .setColor(client.blanc)

        interaction.channel.send({ embeds: [embed] })
        try {target.send({ embeds: [embedpv] })} catch(err){}
    }
}
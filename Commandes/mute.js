const ms = require('ms');
const { EmbedBuilder } = require('discord.js');
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")

module.exports = {
    name: "mute",
    permissions: Discord.PermissionFlagsBits.MuteMembers,
    description: "Mute/timeout un utilisateur avec une raison facultatif",
    options: [
      {
        type: "user",
        name: "user",
        description: "Utilisateur",
        required: true,
      },
      {
        type: "string",
        name: "time",
        description: "durée",
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
      const duration = interaction.options.getString("time")
      const reason = interaction.options.getString("reason") || "Aucune raison";
      const convertedTime = ms(duration);

      if(target.user.bot) return Error(interaction, "Je ne peux pas mute un bot")

      if(target.id === client.user.id) return Error(interaction, "Je ne suis pas fou, mais j'ai du mal à accepter ta demande. 👀")

      if(!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) return Error(interaction, "La durée du mute n'est pas le bon format !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`")
      if(target.isCommunicationDisabled()) return Error(interaction, "Ce memrbe est déjà mute !")
      if(ms(duration) > 2246400000) return Error(interaction, "Les mutes ne peuvent pas durer plus de 27 jours !")
      if(interaction.member.roles.highest.comparePositionTo(target.roles.highest) <= 0) return interaction.reply("\`❌ Erreur :\` Vous ne pouvez pas mute ce membre !")
      if(!target.moderatable) return interaction.reply(" \`❌ Erreur :\` Je ne peux pas mute ce membre !")
      if(target.user.id === interaction.user.id) return Error(interaction, "C'est bête ça non ?")
      if((await interaction.guild.fetchOwner()).id === target.user.id) return Error(interaction, "Bannir l'owner, c'est impossible !")

      const embedpv = new EmbedBuilder()
      .setTitle("Sanction")
      .setDescription(`Vous venez d'être **exclu temporairement** du serveur **${interaction.guild.name}**\n**Raison :** ${reason}\n**Fin de la sanction :** ${duration}`.replace("m", " minutes").replace("s", " secondes").replace("h", " heures").replace("d", " jours"))
      .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL({dynamic: true})
      })
      .setColor(client.blanc)  

      target.send({ embeds: [embedpv] }).catch(() => target.timeout(convertedTime, reason))
      target.timeout(convertedTime, reason).catch(() => target.timeout(convertedTime, reason))
      Success(interaction, `C'est fait ! J'ai bien timeout le membre ${target} !`)

      const embed = new  EmbedBuilder()
        .setTitle("Membre timeout")
        .setDescription(`Un membre a été timeout du serveur **${interaction.guild.name}**`)
        .addFields(
          { name: "Membre", value: `${target.user.tag}`, inline: false },
          { name: "Durée", value: `${ms(ms(duration), {long: true})}`.replace("days", "jours").replace("day", "jour").replace("hours", "heures").replace("hour", "heure").replace("second", "seconde").replace("seconds", "secondes") },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor(client.blanc)
        .setTimestamp()  

      interaction.channel.send({ embeds: [embed] })
    }

  }